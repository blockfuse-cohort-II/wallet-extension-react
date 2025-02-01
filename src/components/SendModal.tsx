import React, { useState } from "react";
import {
  getSelectedAccountPrivateKey,
  networks,
  sendEther,
} from "../utils/utils";
import { RiCloseLine } from "react-icons/ri";
import AccountIcon from "../assets/Account icon.png";

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
  const [token, setToken] = useState("ETH"); // Default token
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      const network = networks[selectedNetwork as keyof typeof networks];
      if (!network) throw new Error("Network configuration missing!");

      const providerUrl = network.rpcUrl;
      const chainId = network.chainId;
      console.log(providerUrl, chainId, "providerUrl, chainId");

      const privateKey = await getSelectedAccountPrivateKey();

      const transaction = await sendEther(
        privateKey,
        recipient,
        amount,
        chainId,
        providerUrl
        // token // Pass the token type
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
    <div className="text-sm fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="w-[90%] md:w-[400px] p-6 rounded">
        <div className="flex items-center mb-6">
          <RiCloseLine
            className="cursor-pointer text-xl bg-[#D9D9D9] rounded-full mr-3"
            onClick={onClose}
          />
          <h2 className="text-lg text-white font-bold">Send</h2>
        </div>
        <div className="text-white">
          <h2 className="mb-2">From</h2>
          <div className="flex rounded-lg gap-2 bg-[#363636] p-2">
            <img
              src={AccountIcon}
              alt="homeicon"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-white mr-24">
              <p>Account</p>
              <p>{`${walletAddress.slice(0, 6)}....${walletAddress.slice(
                -4
              )}`}</p>
            </div>
          </div>
        </div>

        <div className="text-white mt-8">
          <h2 className="mb-2">To</h2>
          <input
            type="text"
            placeholder="Enter recipient address (0x...)"
            className="bg-transparent border p-2 rounded-md border-border w-full placeholder:text-sm"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div className="text-white mt-4">
          <h2 className="mb-2">Token</h2>
          <select
            className="bg-transparent border p-2 rounded-md border-border w-full text-white"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          >
            <option value="ETH">ETH</option>
            {/* Add more tokens if supported */}
          </select>
        </div>

        <div className="text-white mt-4">
          <h2 className="mb-2">Amount</h2>
          <input
            type="number"
            placeholder="Enter amount"
            className="bg-transparent border p-2 rounded-md border-border w-full placeholder:text-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mt-6 text-center text-green-500">{message}</div>

        <div className="mt-10 flex justify-around">
          <button
            className="text-violet-500 border border-border rounded-full p-3 px-11 hover:bg-[#363636]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`text-violet-500 border border-border rounded-full p-3 px-11 ${
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



