import React, { useState, useEffect } from "react";
import { IoMdMore, IoMdClose, IoMdAdd } from "react-icons/io";
import AccountIcon from "../assets/Account icon.png";
import { CiSearch } from "react-icons/ci";
import {
  getSelectedNetwork,
  networks,
  createAccountFromHDNode,
  getMnemonic,
  getBalance,
} from "../utils/utils";
import { useNavigate } from "react-router-dom";

interface PropsSelectNetwork {
  isOpen: boolean;
  address: string;
  setIsAccountModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountModal: React.FC<PropsSelectNetwork> = ({
  isOpen,
  address,
  setIsAccountModalOpen,
}) => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [accountBalances, setAccountBalances] = useState<{
    [key: number]: string;
  }>({});
  const [accountsIndex, setAccountsIndex] = useState<number>(() => {
    return parseInt(localStorage.getItem("selectedAccountIndex") ?? "0");
  });

  useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts") ?? "[]");
    if (storedAccounts.length === 0) {
      storedAccounts.push(address);
    }
    setAccounts(storedAccounts);

    const fetchBalances = async () => {
      const newBalances: { [key: number]: string } = {};
      for (let i = 0; i < storedAccounts.length; i++) {
        const account = storedAccounts[i];
        const balance = await getBalance(
          account,
          networks[getSelectedNetwork() as keyof typeof networks].chainId,
          networks[getSelectedNetwork() as keyof typeof networks].rpcUrl
        );
        newBalances[i] = balance;
      }
      setAccountBalances(newBalances);
    };

    fetchBalances();
  }, [address]);

  const handleCloseNetworkBar = () => {
    setIsAccountModalOpen(!isOpen);
  };

  const handleAccountSelect = (index: number, account: string) => {
    setAccountsIndex(index);
    localStorage.setItem("selectedAccountIndex", index.toString());
    navigate(`/view-balance?address=${account}`);
  };

  const handleAddAccount = () => {
    const newAccount = createAccountFromHDNode(getMnemonic(), accounts.length);
    const updatedAccounts = [...accounts, newAccount.address];
    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    localStorage.setItem(
      "selectedAccountIndex",
      (updatedAccounts.length - 1).toString()
    );

    const fetchBalance = async () => {
      const newBalance = await getBalance(
        newAccount.address,
        networks[getSelectedNetwork() as keyof typeof networks].chainId,
        networks[getSelectedNetwork() as keyof typeof networks].rpcUrl
      );
      setAccountBalances((prev) => ({
        ...prev,
        [updatedAccounts.length - 1]: newBalance,
      }));
    };
    fetchBalance();
  };

  return (
    <div className="absolute top-0 w-[375px] h-screen md:w-full">
      <div className="w-[375px] md:w-full flex flex-col items-center bg-[#242424] h-full text-white">
        {/* Select network */}
        <div className="flex flex-row items-center w-full justify-between px-4">
          <div className="flex justify-center flex-row items-center w-full">
            <h2 className="font-poppins font-bold text-[22px] mt-2 mb-2">
              Select a network
            </h2>
          </div>
          <IoMdClose
            className="text-white text-2xl"
            onClick={handleCloseNetworkBar}
          />
        </div>

        {/* Search bar */}
        <div className="flex flex-row items-center border h-9 rounded shadow-md w-[345px] mt-2 px-2">
          <CiSearch className="text-white " />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full outline-none pl-2 text-white bg-transparent"
          />
        </div>

        {/* Networks */}
        <div
          className="mt-2 h-[60%] overflow-auto px-6 w-full"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          {/* Accounts */}
          {accounts.map((account, index) => (
            <button
              key={index + account}
              className={`flex flex-row w-full text-sm items-center h-15 mt-3 px-2 py-2 rounded-sm justify-between ${
                index === accountsIndex ? "bg-gray-700" : ""
              }`}
              onClick={() => handleAccountSelect(index, account)}
            >
              <div className="flex flex-row items-center">
                {/* Account image */}
                <div className="h-full w-6 rounded-full">
                  <img
                    src={AccountIcon}
                    alt="account-Image"
                    className="w-full h-full"
                  />
                </div>

                {/* Account name and address */}
                <div className="ml-3 flex flex-col items-start">
                  <h2 className="font-poppins font-bold text-sm">
                    {`Account ${index + 1}`}
                  </h2>
                  <span className="font-poppins text-sm font-normal">
                    {account.slice(0, 10)}...
                  </span>
                </div>
              </div>

              {/* Account balance and assets */}
              <div className="flex ">
                <div className="flex flex-col items-end mr-2">
                  <p className="font-poppins text-base">{`$ ${parseFloat(
                   "0"
                  ).toFixed(2)} USD`}</p>
                  <div className="flex flex-row items-center justify-between">
                    <img
                      src={AccountIcon}
                      alt="asset icon"
                      className="w-3 mr-2"
                    />
                    <h2 className="font-poppins text-green-300 ">
                      {accountBalances[index] || "0.00"}{" "}
                      <span className="text-sm">
                        {
                          networks[
                            getSelectedNetwork() as keyof typeof networks
                          ].ticker
                        }
                      </span>
                    </h2>
                  </div>
                </div>
                <IoMdMore className="font-bold text-xl" />
              </div>
            </button>
          ))}
        </div>

        {/* Add account button */}
        <button
          className="absolute bottom-[20%] w-full h-8 bg-white text-black rounded-full mt-3 flex flex-row items-center justify-center font-poppins"
          onClick={handleAddAccount}
        >
          <IoMdAdd className="text-2xl font-bold mr-3" />
          Add Account
        </button>
      </div>
    </div>
  );
};

export default AccountModal;
