import Header from "../../components/Header";
import { IoIosSend } from "react-icons/io";
import EthIcon from "../../assets/ETH stroke icon.png";
import { PiHandDepositFill } from "react-icons/pi";
import SelectNetwork from "../../components/SelectNetwork";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AccountModal from "../../components/AccoutModal";
import {
  getBalance,
  getSelectedNetwork,
  networks,
} from "../../utils/utils";
import { RiLoader2Line } from "react-icons/ri";
import SendModal from "../../components/SendModal";
import ReceiveModal from "../../components/ReceiveModal";
import Transactions from "../../components/Transactions";
import NFT from "../../components/NFT";
import { Assets } from "../../interfaces/interfaces";

const ViewBalance = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address") ?? "";
  const [isOpenNetworkTap, setIsOpenNetworkTap] = useState(false);
  const [priceChange] = useState("0.00");
  const [balance, setBalance] = useState("0.00");
  const [loading] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [assets] = useState<Assets[]>([]);

  const [activeTab, setActiveTab] = useState("Tokens");

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const currentNetwork = getSelectedNetwork() as keyof typeof networks;
  const [usdBalance] = useState("0.00");

  // useEffect(() => {
  //   const fetchBalanceAndConvert = async () => {
  //     setLoading(true);
  //     try {
  //       const tokens = await getTokens();
  //       setAssets(tokens);
  //       const storedAccounts = retrieveData("accounts");
  //       console.log("storedAccounts", storedAccounts);
  //       const ethBalance = await getBalance(
  //         address,
  //         networks[currentNetwork].chainId,
  //         networks[currentNetwork].rpcUrl
  //       );
  //       console.log("ethBalance", ethBalance);
  //       setBalance(parseFloat(ethBalance).toFixed(4));

  //       const response = await fetch(
  //         "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  //       );
  //       const data = await response.json();
  //       console.log(data, "data");
  //       const rate = data.ethereum.usd;
  //       const change = data.ethereum.usd_24h_change.toFixed(2);
  //       setUsdBalance((parseFloat(ethBalance) * rate).toFixed(2));
  //       setPriceChange(change);
  //       console.log("usdBalance", usdBalance);
  //     } catch (error) {
  //       console.error("Error fetching balance:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchBalanceAndConvert();
  // }, [address, currentNetwork, selectedAccountIndex]); // Removed balance and usdBalance

  useEffect(() => {
    const fetchData = async () => {
      const ethBalance = await getBalance(
        address,
        networks[currentNetwork].chainId,
        networks[currentNetwork].rpcUrl
      );
      setBalance(parseFloat(ethBalance).toFixed(4));
    };
    fetchData();
  }, [address, currentNetwork]);

  const handleOpenSendModal = () => {
    setIsSendModalOpen(true);
  };

  const handleCloseSendModal = () => {
    setIsSendModalOpen(false);
  };

  const handleOpenReceiveModal = () => {
    setIsReceiveModalOpen(true);
  };

  const handleCloseReceiveModal = () => {
    setIsReceiveModalOpen(false);
  };
  const displayBalance =
    networks[currentNetwork].ticker === "USD" ? usdBalance : balance;
  console.log(balance, "balance");
  return (
    <div className="bg-[#252525] relative w-[375px] h-full">
      <Header
        isOpen={isOpenNetworkTap}
        setIsOpenNetworkTab={setIsOpenNetworkTap}
        isAccountModalOpen={isAccountModalOpen}
        setIsAccountModalOpen={setIsAccountModalOpen}
      />
      {/* View account section */}
      <div className="mt-5 h-full">
        {/* Balance section */}
        <div className="flex flex-col items-center w-[350px] md:w-full p-2 mx-2 bg-[242424]">
          <div className="w-[345px]  h-40 md:w-full flex flex-col text-white  border border-[#4D4D4D] align-middle justify-center px-3 rounded-lg">
            <p className="font-karla font-semibold text-lg leading-6">
              Total Asset Value
            </p>
            <div className="font-karla font-bold text-2xl my-2">
              {loading ? (
                <RiLoader2Line className="animate-spin" />
              ) : (
                `${displayBalance} ${networks[currentNetwork].ticker}`
              )}
            </div>

            <h3
              className={`font-karla font-bold text-lg leading-5 ${priceChange.startsWith("-") ? "text-red-500" : "text-[#5CE677]"
                }`}
            >
              {priceChange}% (24h)
            </h3>
          </div>

          {/* Send and Deposit */}
          <div className="flex flex-row items-center justify-between w-[200px] mt-4 h-full">
            <div className="flex flex-row items-center justify-between w-[200px] mt-6 text-white">
              <div className="flex flex-row items-center justify-between mt-4 cursor-pointer">
                <div className="flex flex-row items-center justify-center gap-8 mt-4 text-white">
                  <div className="flex flex-col items-center gap-1 text-base font-karla" onClick={handleOpenSendModal}>
                    <div className="h-10 w-10 bg-violet-500 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                    Send
                  </div>

                  <div className="flex flex-col  items-center gap-1 text-base font-karla" onClick={handleOpenSendModal}>
                    <div className="h-10 w-10 bg-violet-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                      </svg>

                    </div>
                    Recieve
                  </div>
                  {/* 
              <button
                className="flex flex-row items-center border border-gray-400 px-4 py-2 rounded-lg hover:bg-violet-500 mr-4"
                onClick={handleOpenSendModal}
              >
                <IoIosSend />
                <h2 className="font-karla text-base font-bold ml-1">Send</h2>
              </button> 
              {/* <button
                className="flex flex-row items-center border border-gray-400 px-4 py-2 rounded-lg hover:bg-violet-500 "
                onClick={handleOpenReceiveModal}
              >
                <PiHandDepositFill />
                <h2 className="font-karla text-base font-bold ml-1">Receive</h2>
              </button> */}
                </div>
              </div>

              <div></div>
              {/* Assets Section */}
              <div className="flex flex-col w-full px-4 mt-6 h-full">
                <div className="w-full flex justify-between items-center text-[15px] cursor-pointer">
                  {["Tokens", "NFTs", "History"].map((tab, index) => (
                    <h2
                      className={`${tab === activeTab
                          ? "border-b-2 border-violet-500 text-violet-500"
                          : "text-gray-200"
                        } font-poppins pb-1 px-2`}
                      key={index}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </h2>
                  ))}
                </div>

                {activeTab === "Tokens" && (
                  <div className="mt-4">
                    {assets.length > 0 ? (
                      assets.map(
                        (
                          asset: {
                            name: string;
                            quantity: number;
                            price: string;
                            change: number;
                          },
                          index: number
                        ) => (
                          <div
                            key={asset?.name + index}
                            className="flex flex-row justify-between items-center w-full h-[77px] bg-[#1d1c1c]  rounded px-2 mb-3"
                          >
                            <div className="flex flex-row items-center">
                              {/* Asset Icon */}
                              <div className="w-10 h-10">
                                <img
                                  src={EthIcon}
                                  alt="assetIcon"
                                  className="object-contain w-full h-full bg-white rounded-full"
                                />
                              </div>
                              {/* Asset Name and Quantity */}
                              <div className="flex flex-col items-start ml-4 text-white">
                                <h2 className="font-karla font-bold leading-6">
                                  {asset.name}
                                </h2>
                                <p className="font-karla font-medium text-green-400">
                                  +98.02%
                                </p>
                              </div>
                            </div>
                            {/* Asset Price */}
                            <div className="flex flex-col items-end text-white">
                              <h2 className="font-karla text-base font-bold leading-6">
                                $0.13
                              </h2>
                              <p className="font-medium font-karla text-white">
                                0.0004 Eth
                              </p>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p className="font-poppins h-screen text-center mt-4 text-gray-500">
                        No assets available.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "NFTs" && <NFT />}

                {activeTab === "History" && <Transactions />}
              </div>
            </div>

            {/* Select Network */}
            {isOpenNetworkTap && (
              <SelectNetwork
                isOpen={isOpenNetworkTap}
                setIsOpenNetworkTab={setIsOpenNetworkTap}
                address={address}
              />
            )}
            {isSendModalOpen && (
              <SendModal
                isOpen={isSendModalOpen}
                onClose={handleCloseSendModal}
                walletAddress={address}
              />
            )}

            {isReceiveModalOpen && (
              <ReceiveModal
                isOpen={isReceiveModalOpen}
                onClose={handleCloseReceiveModal}
                walletAddress={address}
                index={
                  parseInt(localStorage.getItem("selectedAccountIndex") ?? "0") + 1
                }
              />
            )}

            {isAccountModalOpen && (
              <AccountModal
                isOpen={isAccountModalOpen}
                setIsAccountModalOpen={setIsAccountModalOpen}
                address={address}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBalance;
