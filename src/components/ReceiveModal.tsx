import React from "react";
import { RiCloseLine } from "react-icons/ri";
import logo from "../assets/logo2.png";
import { IoCopy } from "react-icons/io5";
import { toast } from "sonner";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  index: number;
}

const ReceiveModal: React.FC<SendModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
  index,
}) => {

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
          <h2 className="text-lg">Account {index}</h2>
          <p className="base">{walletAddress.slice(0, 7)+"***"+ walletAddress.slice(-4)}</p>
        </div>
        <div className="text-violet-500 flex items-center gap-2 mb-3 cursor-pointer"
          onClick={()=> navigator.clipboard.writeText(walletAddress).then(()=>toast.info('Successfully Copied To Clipboard'))}
        >
          <IoCopy />
          <div>Copy Address</div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveModal;
