import React, { useState, useEffect } from "react";
import AccountIcon from "../assets/Account icon.png";
import { IoIosArrowDown, IoMdMore } from "react-icons/io";
import { BiCopy } from "react-icons/bi";
import { LuCopyCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import {  getNetwork, getSelectedNetwork, retrieveData } from "../utils/utils";
import useOutsideClick from "../hooks/use-outside-click";
import AccountDetails from "./AccountDetails";

interface PropsSelectNetwork {
  isOpen: boolean;
  setIsOpenNetworkTab: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAccountModalOpen: boolean;
}

const Header: React.FC<PropsSelectNetwork> = ({
  isOpen,
  setIsOpenNetworkTab,
  setIsAccountModalOpen,
  isAccountModalOpen,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [accountDetailsModalOpen, setAccountDetailsModalOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const navigate = useNavigate();
  const dropdownRef = useOutsideClick(() => setShowMenu(false));

  useEffect(() => {
    const storedAccounts = retrieveData('accounts');
    const selectedIndex = parseInt(
      localStorage.getItem("selectedAccountIndex") ?? "0"
    );
    if (storedAccounts.length > 0) {
      setCurrentAccount(storedAccounts[selectedIndex].address);
    }
  }, [isAccountModalOpen]);

  const handleSelectNetwork = () => {
    setIsOpenNetworkTab(!isOpen);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAccount).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleLogout = () => {
    // const password = localStorage.getItem("password");
    // clearStore();
    // localStorage.setItem("password", password ?? "");
    navigate("/login");
  };

  const handleOpenAccountModal = () => {
    setIsAccountModalOpen(!isAccountModalOpen);
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
    <div className="bg-background w-[375px] flex flex-row items-center justify-between px-4 py-2 shadow-xl h-16 md:w-full">
      {/* network sections */}
      <button
        className="w-[100px] bg-gray-500 rounded-full px-4 py-1 flex items-center justify-between text-white"
        onClick={handleSelectNetwork}
      >
        <div className="truncate">
          {selectedNetwork && formatNetworkString(selectedNetwork)}
        </div>
        <IoIosArrowDown className="font-bold text-base text-white ml-2" />
      </button>

      {/* Account Section */}
      <div className="mr-4">
        {/* Account Info */}
        <div className="flex flex-row items-center">
          <img src={AccountIcon} alt="account-icon" className="w-5 h-5" />
          <h2 className="font-bold mx-2 text-white text-sm">
            Account{" "}
            {parseInt(localStorage.getItem("selectedAccountIndex") ?? "0") + 1}
          </h2>
          <IoIosArrowDown
            className="font-bold text-xl text-white"
            onClick={handleOpenAccountModal}
          />
        </div>

        {/* Address and Copy */}
        <div className="flex flex-row items-center">
          <h2 className="w-24 overflow-hidden text-white text-sm">
            {currentAccount}
          </h2>
          <button onClick={handleCopy} className="ml-4 text-gray-700">
            {isCopied ? (
              <LuCopyCheck className="text-white" />
            ) : (
              <BiCopy className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* More Options */}
      <div className="cursor-pointer relative">
        <IoMdMore
          className="text-3xl font-bold text-white"
          onClick={() => setShowMenu((show) => !show)}
        />
        <div
          className={`${
            !showMenu ? "hidden" : "absolute"
          } absolute top-[100%] right-0 w-[120px] py-4 border bg-background  shadow-lg border-gray-600 rounded-md flex flex-col text-white px-3 cursor-pointer  `}
          ref={dropdownRef as React.RefObject<HTMLDivElement>}
        >
          <span onClick={() => setAccountDetailsModalOpen(true)} className="font-poppins hover:text-violet-500 transition-all duration-200 ease-linear">
            Account Details
          </span>

          <span onClick={handleLogout} className="mt-2 font-poppins hover:text-violet-500 transition-all duration-200 ease-linear">
            Logout
          </span>
        </div>
      </div>

      <AccountDetails
        isOpen={accountDetailsModalOpen}
        onClose={() => setAccountDetailsModalOpen(false)}
        index={parseInt(localStorage.getItem("selectedAccountIndex") ?? "0") + 1}
        walletAddress={currentAccount}
      />
    </div>
  );
};

export default Header;
