import React, { useEffect, useState } from "react";
import { getContacts, getPrivateKey, sendEther } from "../utils/utils";
import { RiCloseLine } from "react-icons/ri";
import AccountIcon from "../assets/Account icon.png";
import ethIcon from "../assets/ETH stroke icon.png";
import { IoIosWarning } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const SendModal: React.FC<SendModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
}) => {
  console.log(walletAddress, "walletAddress"); //for now we are just testing with one walletAddress, we have to use this to store privatekeys
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // not used!
  const [message, setMessage] = useState(""); // not used!
  const [activeTab, setActiveTa] = useState("account");
  const [contacts, setContacts] = useState<{ name: string; address: string }[]>(
    []
  );
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [newContact, setNewContact] = useState<{
    name: string;
    address: string;
  }>({
    name: "",
    address: "",
  });

  useEffect(() => {
    const contactsList = getContacts();
    setContacts(contactsList);
  }, []);

  const handleSend = async () => {
    console.log(recipient, amount, "recipient, amount");
    if (!recipient || !amount) {
      setMessage("Recipient address and amount are required.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const selectedNetwork =
        localStorage.getItem("selectedNetwork") ?? "mainnet";
      console.log(selectedNetwork, "selectednet");
      const networks: { [key: string]: { rpcUrl: string; chainId: number } } = {
        // mainnet: {
        //   rpcUrl: "https://mainnet.infura.io/v3/1cef973dff844ba09dea342050cd5967",
        //   chainId: 1,
        // },
        sepolia: {
          rpcUrl:
            "https://sepolia.infura.io/v3/1cef973dff844ba09dea342050cd5967",
          chainId: 11155111,
        },
        // Add other networks here...
      };
      const network = networks[selectedNetwork as keyof typeof networks];
      console.log(network, "network");
      if (!network) throw new Error("Network configuration missing!");

      const providerUrl = network.rpcUrl;
      const chainId = network.chainId;

      // Retrieve the encrypted private key from storage and decrypt it
      const privateKey = await getPrivateKey();

      const transaction = await sendEther(
        privateKey, // Replace with private key in backend for security
        recipient,
        amount,
        chainId,
        providerUrl
      );
      setMessage(`Transaction successful! Hash: ${transaction.hash}`);
    } catch (error) {
      console.error(error);
      setMessage("Failed to send transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.address) {
      alert("Please fill in both name and address fields.");
      return;
    }
    if (
      !newContact.address.startsWith("0x") ||
      newContact.address.length !== 42
    ) {
      alert("Please enter a valid public address.");
      return;
    }

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts)); // Save to localStorage
    setNewContact({ name: "", address: "" }); // Reset input fields
    setIsAddContactModalOpen(false); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="text-sm fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
      <div className=" w-[90%] md:w-[400px] p-6 rounded">
        <div className="flex items-center mb-6">
          <RiCloseLine
            className="cursor-pointer text-xl  bg-[#D9D9D9] rounded-full mr-3"
            onClick={onClose}
          />
          <h2 className="text-lg text-white font-bold">Review</h2>
        </div>
        <div>
          <div className="text-white">
            <h2 className="mb-2">From</h2>
            <div className="flex rounded-lg justify-between bg-[#363636] p-2">
              <img
                src={AccountIcon}
                alt="homeicon"
                className="w-10 h-10 rounded-full "
              />

              <div className="text-white mr-24">
                <p>Account 1</p>
              </div>
            </div>
          </div>
          <div className="text-white mt-8 ">
            <h2 className="mb-2">To</h2>
            <div>
              <img
                src={AccountIcon}
                alt="homeicon"
                className="w-10 h-10 rounded-full "
              />
              <div className="text-white mr-24">
                <p>Account 2</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>Network</div>
          <div>
            <img src={ethIcon} alt="" className="h-5 w-5" />
            Sepolia
          </div>
        </div>
        <div>
          <div>
            <p>Network fee</p>
            <IoIosWarning />
            <p>Alert</p>
            <MdKeyboardArrowRight />
          </div>
          <div>
            <BsPencilSquare />
            <p>0.00001</p>
            <p>SepoliaETH</p>
            <p>$0.20</p>
          </div>
        </div>

        <div className="mt-10 flex justify-around">
          <button className="text-violet-500 border border-border rounded-full p-3 px-11 hover:bg-[#363636]">
            Cancel
          </button>
          <button
            className={`text-violet-500 border border-border rounded-full p-3 px-11 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#363636] hover:bg-gray-700"
            }`}
            onClick={handleSend}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendModal;
