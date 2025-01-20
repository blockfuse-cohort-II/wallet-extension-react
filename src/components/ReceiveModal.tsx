import React, { useState } from "react";
import { getPrivateKey, sendEther } from "../utils/utils";
import { RiCloseLine } from "react-icons/ri";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const ReceiveModal: React.FC<SendModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
}) => {
  console.log(walletAddress, "walletAddress"); //for now we are just testing with one walletAddress, we have to use this to store privatekeys
  const [recipient, setRecipient] = useState(""); // haven't been used
  const [amount, setAmount] = useState(""); // haven't been used
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
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

      setMessage("Failed to send transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" w-[90%] md:w-[400px] p-6 rounded shadow-md">
        <div className="flex items-center mb-4">
          <RiCloseLine
            className="cursor-pointer text-xl  bg-[#D9D9D9] rounded-full mr-3"
            onClick={onClose}
          />
          <h2 className="text-xl  text-white font-bold">Receive</h2>
        </div>
        <div className="">
          <img src="" alt="" />
        </div>
        <div>
          <h2>Account1</h2>
          <p>0xffee455434ererj3438434</p>
        </div>
        <div>
          <svg
            width="17"
            height="15"
            viewBox="0 0 17 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25 15.5V0.5H16.25V15.5H4.25ZM5.75 14H14.75V2H5.75V14ZM0.75 19V4.30775H2.25V17.5H12.4423V19H0.75Z"
              fill="white"
              fill-opacity="0.5"
            />
          </svg>
          Copy Address
        </div>

        {message && <p className="text-red-500 text-sm">{message}</p>}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveModal;
