import React, { useState } from "react";
import { getPrivateKey, sendEther } from "../utils/utils";
import { RiCloseLine } from "react-icons/ri";
import logo from "../assets/logo2.png";
import { IoCopy } from "react-icons/io5";

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
    <div className="fixed text-sm inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className=" w-[90%] md:w-[400px] p-6 rounded flex flex-col items-center gap-9">
        <div className="flex items-center mr-[auto]">
          <RiCloseLine
            className="cursor-pointer text-xl  bg-[#D9D9D9] rounded-full mr-3"
            onClick={onClose}
          />
          <h2 className="text-xl  text-white font-bold">Receive</h2>
        </div>
        <div className="">
          <img src={logo} alt="" className="h-[150px] w-[150px]" />
        </div>
        <div className="text-white flex flex-col items-center gap-2">
          <h2 className="text-lg">Account1</h2>
          <p className="base">0xffee455434ererj34djsdj4934843938434</p>
        </div>
        <div className="text-violet-500 flex items-center gap-2 mb-3 cursor-pointer">
          <IoCopy />
          <div>Copy Address</div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveModal;
