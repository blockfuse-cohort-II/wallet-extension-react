import EthIcon from "../assets/ETH stroke icon.png";
import AccountIcon from "../assets/Account icon.png";
import { IoIosArrowDown, IoMdMore } from "react-icons/io";
import { BiCopy } from "react-icons/bi";
import { LuCopyCheck } from "react-icons/lu";
import { useState } from "react";

interface PropsSelectNetwork {
    isOpen: boolean;
    setIsOpenNetworkTab: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const Header: React.FC<PropsSelectNetwork> = ({
    isOpen,
    setIsOpenNetworkTab,
  }) => {
    
  
    const [isCopied, setIsCopied] = useState(false);
    const address = "0xd65944287EB2685c345057F6a4A48d619bA6f7cf";
     // open and closing navigation;
    const HandleSelectNetwork = () => {
      setIsOpenNetworkTab(!isOpen);
    };
    
    const HandleCopy=()=>{
      navigator.clipboard.writeText(address).then(() => {
        setIsCopied(true);
        // Reset icon back to the copy icon after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  
    return (
      <div className="bg-[#FFFFFF] w-[375px] flex flex-row  items-center justify-between px-4 py-2 shadow-2xl h-16 md:w-full">
        {/* network sections */}
        <div
          className="w-20 bg-gray-600 rounded-full px-4 py-1 flex flex-row items-center justify-between"
          onClick={HandleSelectNetwork}
        >
          <img
            src={EthIcon}
            alt="icon"
            className=" w-4 h-4"
          />
          <IoIosArrowDown className="font-bold text-xl text-white ml-2" />
        </div>
  
        {/* account section */}
        <div className="">
          {/* account */}
          <div className="flex flex-row items-center ">
            <img
              src={AccountIcon}

              alt="homeicon"
              className="w-5 h-5 "
            />
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
  