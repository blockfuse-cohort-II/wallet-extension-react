import AccountIcon from "../assets/Account icon.png";
import { IoIosArrowDown, IoMdMore } from "react-icons/io";
import { BiCopy } from "react-icons/bi";
import { LuCopyCheck } from "react-icons/lu";
import { useState } from "react";
import {
  getNetwork,
  getSelectedNetwork,
} from "../utils/utils";

interface PropsSelectNetwork {
  isOpen: boolean;
  setIsOpenNetworkTab: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
}

const Header: React.FC<PropsSelectNetwork> = ({
  isOpen,
  setIsOpenNetworkTab,
  address,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  // open and closing navigation;
  const HandleSelectNetwork = () => {
    setIsOpenNetworkTab(!isOpen);
  };

  const HandleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      setIsCopied(true);
      // Reset icon back to the copy icon after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  const selectedNetwork = getSelectedNetwork();
  const formatNetworkString = (selectedNetwork: string) => {
    if (!selectedNetwork) return "";
  
    const network = getNetwork(selectedNetwork);
    if (!network) return "";
  
    const symbol = network.symbol ?? "";
    const name = network.name ?? "";
  
    const splitName = name.split(" ");
    if (splitName.length >= 3) {
      return `${symbol} ${splitName.slice(0, 3).join("")}`;
    }
  
    return `${symbol} ${name.slice(0, 3).toUpperCase()}`;
  };
  return (
    <div className="bg-[#FFFFFF] w-[375px] flex flex-row  items-center justify-between px-4 py-2 shadow-2xl h-16 md:w-full">
      {/* network sections */}
      <button
        className="w-24 bg-gray-600 rounded-full px-4 py-1 flex flex-row items-center justify-between text-white"
        onClick={HandleSelectNetwork}
      >
        {selectedNetwork && formatNetworkString(selectedNetwork)}

        <IoIosArrowDown className="font-bold text-xl text-white ml-2" />
      </button>

      {/* account section */}
      <div className="">
        {/* account */}
        <div className="flex flex-row items-center ">
          <img src={AccountIcon} alt="homeicon" className="w-5 h-5 " />
          <h2 className="font-bold mx-2 text-gray-700">Account 1 </h2>

          <IoIosArrowDown className="font-bold text-xl text-gray-700" />
        </div>

        {/* address */}
        <div className="flex flex-row items-center ">
          <h2 className="w-24 overflow-hidden text-gray-700">{address}</h2>
          <button onClick={HandleCopy} className="ml-4 text-gray-700">
            {isCopied ? <LuCopyCheck /> : <BiCopy />}
          </button>
        </div>
      </div>

      {/* more section */}
      <div>
        <IoMdMore className="text-3xl font-bold text-gray-700" />
      </div>
    </div>
  );
};

export default Header;
