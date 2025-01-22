import { RiCloseLine } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import logo from "../assets/logo2.png";
import AccountIcon from "../assets/Account icon.png";
import { useState } from "react";
import { getSelectedAccountPrivateKey } from "../utils/utils";

interface AccountDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  index: number;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  isOpen,
  onClose,
  walletAddress,
  index,
}: AccountDetailsProps) => {
  const privateKey = getSelectedAccountPrivateKey();
  const [showKey, setShowKey] = useState(false);
  if (!isOpen) return null;
  return (
    <div className="fixed text-sm inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className=" w-[90%] md:w-[400px] p-6 rounded flex flex-col items-center gap-9">
        <RiCloseLine
          className="cursor-pointer text-xl  bg-[#D9D9D9] rounded-full mr-[auto]"
          onClick={onClose}
        />
        <div className="flex gap-3 items-center rounded-lg justify-between bg-[#363636] p-2 font-poppins">
          <img
            src={AccountIcon}
            alt="homeicon"
            className="w-8 h-8 rounded-full "
          />

          <div className="text-white mr-24">
            <p>Account {index}</p>
            <p className="text-[13px]">
              {walletAddress.slice(0, 7) + "***" + walletAddress.slice(-4)}
            </p>
          </div>
        </div>
        <div className="">
          <img src={logo} alt="" className="h-[150px] w-[150px]" />
        </div>

        <div className="relative">
          {showKey ? (
            <textarea
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            >
              {privateKey}
            </textarea>
          ) : (
            <div className="w-full p-4 border border-gray-300 rounded-md bg-gray-200 text-center text-gray-500">
              Private key hidden
            </div>
          )}
          <IoCopy
            className="absolute top-1 left-[190px] text-xl cursor-pointer text-violet-500"
            onClick={() => navigator.clipboard.writeText(privateKey)}
          />
        </div>
        <button
          className="text-violet-500 border border-border rounded-full p-3 px-11 hover:bg-[#363636]"
          onClick={() => setShowKey(!showKey)}
        >
          {showKey ? "Hide" : "Show"} private key
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
