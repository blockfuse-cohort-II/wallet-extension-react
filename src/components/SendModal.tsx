import React, { useState } from "react";
import { getPrivateKey, sendEther } from "../utils/utils";
import { RiCloseLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import AccountIcon from "../assets/Account icon.png";
import ethIcon from "../assets/ETH stroke icon.png";

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

  const handleSend = async () =>  {
    // not used!
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
      console.error(setRecipient);
      console.error(setAmount);
      console.error(loading);
      console.error(message);
      setMessage("Failed to send transaction. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-lg text-white font-bold">Send</h2>
        </div>
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
              <p className="text-[13px]">0xfdk2....dds323</p>
            </div>
            <IoIosArrowDown className="font-bold cursor-pointer text-base text-white ml-2" />
          </div>
        </div>
        <div className="text-white mt-8 ">
          <h2 className="mb-2">To</h2>
          <div>
            <input
              type="text"
              placeholder="Enter public address (0x) or domain name"
              className="bg-transparent border p-2 rounded-md border-border w-full placeholder:text-sm"
            />
          </div>
        </div>

        <div className="mt-4">
          <header className="flex gap-6 cursor-pointer mb-3">
            <p
              className={`${
                activeTab === "account"
                  ? "text-violet-500 border-b-2 border-violet-500"
                  : "text-white"
              } px-3 pb-1.5`}
              onClick={() => setActiveTa("account")}
            >
              Your account
            </p>
            <p
              className={`${
                activeTab === "contact"
                  ? "text-violet-500 border-b-2 border-violet-500 "
                  : "text-white"
              } px-3 pb-1.5`}
              onClick={() => setActiveTa("contact")}
            >
              {" "}
              Contacts
            </p>
          </header>
          {activeTab === "account" && (
            <div className="flex flex-col gap-2">
              <div className="flex rounded-lg justify-around p-2 hover:border hover:bg-gray-800">
                <div className="flex gap-3">
                  <img
                    src={AccountIcon}
                    alt="homeicon"
                    className="w-10 h-10 rounded-full "
                  />

                  <div className="text-white mr-24">
                    <p>Account 1</p>
                    <p className="text-[13px]">0xfdk2....dds323</p>
                  </div>
                </div>

                <div className="text-white flex flex-col gap-1">
                  <div className="flex gap-1">
                    <div className="">$0.00</div>{" "}
                    <div className="text-[10px] mt-[3px]">USD</div>
                  </div>
                  <div className="flex gap-1">
                    <img src={ethIcon} alt="" className="h-[20px] w-[10px]" />{" "}
                    <div className="text-sm">0 ETH</div>
                  </div>
                </div>
              </div>
              <div className="flex rounded-lg justify-around p-2 hover:border hover:bg-gray-800">
                <div className="flex gap-3">
                  <img
                    src={AccountIcon}
                    alt="homeicon"
                    className="w-10 h-10 rounded-full "
                  />

                  <div className="text-white mr-24">
                    <p>Account 1</p>
                    <p className="text-[13px]">0xfdk2....dds323</p>
                  </div>
                </div>

                <div className="text-white flex flex-col gap-1">
                  <div className="flex gap-1">
                    <div className="">$0.00</div>{" "}
                    <div className="text-[10px] mt-[3px]">USD</div>
                  </div>
                  <div className="flex gap-1">
                    <img src={ethIcon} alt="" className="h-[20px] w-[10px]" />{" "}
                    <div className="text-sm">0 ETH</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "contact" && <div>Contacts here</div>}
        </div>

        <div className="mt-10 flex justify-around">
          <button className="text-violet-500 border border-border rounded-full p-3 px-11 hover:bg-[#363636]">
            Cancel
          </button>
          <button className="text-violet-500 border border-border rounded-full p-3 px-11 bg-[#363636]">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendModal;
