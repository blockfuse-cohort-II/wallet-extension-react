import React, { useState, useEffect } from "react";
import { IoMdClose, IoMdAdd, IoMdKey } from "react-icons/io";
import AccountIcon from "../assets/Account icon.png";
import { CiSearch } from "react-icons/ci";
import {
  getSelectedNetwork,
  networks,
  createAccountFromHDNode,
  getMnemonic,
  getBalance,
  retrieveData,
  persistData,
  generateSeedPhrase,
  createHDWallet,
  saveMnemonic,
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
  const [accounts, setAccounts] = useState<
    { address: string; privateKey: string; isKeyImported?: boolean }[]
  >([]);
  const [accountBalances, setAccountBalances] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const storedAccounts = retrieveData("accounts");
    if (storedAccounts.length === 0) {
      console.log(storedAccounts);
    }
    setAccounts(storedAccounts);

    const fetchBalances = async () => {
      const newBalances: { [key: number]: string } = {};
      for (let i = 0; i < storedAccounts.length; i++) {
        const account = storedAccounts[i].address;
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
    localStorage.setItem("selectedAccountIndex", index.toString());
    setIsAccountModalOpen(!isOpen);
    navigate(`/view-balance?address=${account}`);
  };

  const handleAddAccount = () => {
    const mnemonic = getMnemonic();
    let newAccount;

    if (mnemonic && mnemonic.trim() !== "") {
      newAccount = createAccountFromHDNode(
        mnemonic,
        accounts.filter((item) => item.isKeyImported !== true).length
      );
    } else {
      const data = generateSeedPhrase();
      saveMnemonic(data.phrase);
      newAccount = createHDWallet(data.phrase);
    }

    const updatedAccounts = [
      ...accounts,
      { address: newAccount.address, privateKey: newAccount.privateKey },
    ];
    setAccounts(updatedAccounts);
    persistData("accounts", updatedAccounts);
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
      <div className="relative w-[375px] md:w-full flex flex-col items-center bg-[#242424] h-full text-white">
        {/* Select network */}
        <div className="flex flex-row items-center w-full justify-between px-4">
          <div className="flex justify-center flex-row items-center w-full">
            <h2 className="font-poppins font-bold text-[22px] mt-2 mb-2">
              Select a Account
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
            className="w-full h-full outline-none pl-1 text-white bg-transparent"
          />
        </div>

        {/* Networks */}
        <div
          className="mt-2 h-[60%] overflow-auto px-3 w-full"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          {/* Accounts */}
          {accounts.map((account, index) => (
            <button
              key={index + account.address}
              className={`flex flex-row w-full text-sm items-center h-15 mt-3 px-2 py-2 rounded-sm justify-between ${
                index ===
                parseInt(localStorage.getItem("selectedAccountIndex") ?? "0")
                  ? "bg-gray-700"
                  : ""
              }`}
              onClick={() => handleAccountSelect(index, account.address)}
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
                    {account.address.slice(0, 7)}***{account.address.slice(-4)}
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
              </div>
            </button>
          ))}
        </div>

        <button
          className={`bottom-[1%] w-[85%] h-10 ${
            accounts.length === 5 ? "bg-gray-400" : "bg-violet-500"
          } text-white rounded-full mt-3 flex py-3 flex-row items-center justify-center font-poppins gap-2`}
          disabled={accounts.length === 5}
          onClick={handleAddAccount}
        >
          <IoMdAdd size={20} />
          Add Account
        </button>

        <button
          className={`w-[85%] h-10 ${
            accounts.length === 5 ? "bg-gray-400" : "bg-violet-500"
          } text-white rounded-full mt-3 flex py-3 flex-row items-center justify-center font-poppins gap-2`}
          disabled={accounts.length === 5}
          onClick={()=>navigate("/private-key?isSigned=true")}
        >
          <IoMdKey size={20} />
          Add Private Key
        </button>
      </div>
    </div>
  );
};

export default AccountModal;
