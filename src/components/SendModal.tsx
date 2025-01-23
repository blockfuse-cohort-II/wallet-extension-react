import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import AccountIcon from "../assets/Account icon.png";
import { getPrivateKey, sendEther } from "../utils/utils";

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
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("ETH");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("contact");
  const [contacts, setContacts] = useState([
    { name: "Contact 1", address: "0x123...abc" },
  ]);

  const handleAddContact = () => {
    const name = prompt("Enter contact name:", "New Contact");
    const address = prompt("Enter contact address:", "0x456...def");

    if (!name || !address) {
      alert("Name and address are required.");
      return;
    }

    // Check if the Ethereum address is valid
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      alert("Invalid Ethereum address.");
      return;
    }

    const newContact = { name, address };

    setContacts((prevContacts) => {
      // Replace placeholder if it exists
      if (prevContacts[0]?.name === "Contact 1") {
        return [newContact, ...prevContacts.slice(1)];
      }
      return [...prevContacts, newContact];
    });
  };

  const handleSend = async () => {
    if (!recipient || !amount) {
      setMessage("Please enter recipient address and amount.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const selectedNetwork =
        localStorage.getItem("selectedNetwork") ?? "sepolia";
      const networks: { [key: string]: { rpcUrl: string; chainId: number } } = {
        sepolia: {
          rpcUrl:
            "https://sepolia.infura.io/v3/1cef973dff844ba09dea342050cd5967",
          chainId: 11155111,
        },
      };
      const network = networks[selectedNetwork as keyof typeof networks];
      if (!network) throw new Error("Network configuration missing!");

      const privateKey = await getPrivateKey();
      const transaction = await sendEther(
        privateKey,
        recipient,
        amount,
        network.chainId,
        network.rpcUrl
      );
      setMessage(`Transaction successful! Hash: ${transaction.hash}`);
    } catch (error) {
      console.error(error);
      setMessage("Failed to send transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg">
      <div className="w-[90%] md:w-[400px] p-6 rounded">
        <div className="flex items-center mb-6">
          <RiCloseLine
            className="cursor-pointer text-xl bg-[#D9D9D9] rounded-full mr-3"
            onClick={onClose}
          />
          <h2 className="text-lg text-white font-bold">Send</h2>
        </div>

        <div className="mt-4">
          <header className="flex gap-6 cursor-pointer mb-3">
            <p
              className={`${
                activeTab === "account"
                  ? "text-violet-500 border-b-2 border-violet-500"
                  : "text-white"
              } px-3 pb-1.5`}
              onClick={() => setActiveTab("account")}
            >
              Your Account
            </p>
            <p
              className={`${
                activeTab === "contact"
                  ? "text-violet-500 border-b-2 border-violet-500"
                  : "text-white"
              } px-3 pb-1.5`}
              onClick={() => setActiveTab("contact")}
            >
              Contacts
            </p>
          </header>

          {activeTab === "account" && (
            <div className="text-white">
              <h2 className="mb-2">From</h2>
              <div className="flex rounded-lg bg-[#363636] p-2">
                <img
                  src={AccountIcon}
                  alt="homeicon"
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-white flex flex-col items-start px-4">
                  <p>Account</p>
                  <p>{`${walletAddress.slice(0, 6)}....${walletAddress.slice(
                    -4
                  )}`}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div
                    key={contact.address}
                    className="flex justify-between items-center p-2 border rounded hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setRecipient(contact.address);
                      setActiveTab("account");
                    }}
                  >
                    <div>
                      <p className="text-white font-semibold">{contact.name}</p>
                      <p className="text-gray-400 text-sm">{contact.address}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No contacts available.</p>
              )}
              <button
                className="bg-violet-500 text-white px-3 py-1 rounded mt-4"
                onClick={handleAddContact}
              >
                Add Contact
              </button>
            </div>
          )}
        </div>

        <div className="text-white mt-8">
          <h2 className="mb-2">To</h2>
          <input
            type="text"
            placeholder="Enter recipient address (0x...)"
            className="bg-transparent border p-2 rounded-md w-full placeholder:text-sm"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div className="text-white mt-4">
          <h2 className="mb-2">Amount</h2>
          <input
            type="number"
            placeholder="Enter amount"
            className="bg-transparent border p-2 rounded-md w-full placeholder:text-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mt-6 text-center text-red-500">{message}</div>

        <div className="mt-10 flex justify-around">
          <button
            className="text-violet-500 border rounded-full p-3 px-11 hover:bg-[#363636]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`text-violet-500 border rounded-full p-3 px-11 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#363636] hover:bg-gray-700"
            }`}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendModal;
