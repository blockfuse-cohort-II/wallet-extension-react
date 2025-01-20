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
  getDecryptedWalletAddress,
  getSelectedNetwork,
  networks,
  getTokens
} from "../../utils/utils";
import { RiLoader2Line } from "react-icons/ri";
import SendModal from "../../components/SendModal";
import ReceiveModal from "../../components/ReceiveModal";
import SendModalTwo from "../../components/SendModalTwo";

const ViewBalance = () => {
  const [searchParams] = useSearchParams();
  const address =
    searchParams.get("address") ?? getDecryptedWalletAddress() ?? "";
  const [isOpenNetworkTap, setIsOpenNetworkTap] = useState(false);
  const [balance, setBalance] = useState("0.00");
  const [loading, setLoading] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isSendModal2Open, setIsSendModal2Open] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  interface Asset {
    name: string;
    quantity: number;
    price: string;
    change: number;
  }

  const [assets, setAssets] = useState<Asset[]>([]);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [selectedAccountIndex] = useState<number>(
    parseInt(localStorage.getItem("selectedAccountIndex") ?? "0")
  );
  const currentNetwork = getSelectedNetwork() as keyof typeof networks;
  const [usdBalance, setUsdBalance] = useState("0.00");

  useEffect(() => {
    const fetchBalanceAndConvert = async () => {
      setLoading(true);
      try {
        const tokens = await getTokens();
        setAssets(tokens);
        const storedAccounts = JSON.parse(
          localStorage.getItem("accounts") ?? "[]"
        );
        console.log("storedAccounts", storedAccounts);
        // const selectedAddress = storedAccounts[selectedAccountIndex];
        // console.log("selectedAddress", selectedAddress);
        const ethBalance = await getBalance(
          address,
          networks[currentNetwork].chainId,
          networks[currentNetwork].rpcUrl
        );
        console.log("ethBalance", ethBalance);
        console.log("balance1", balance);
        setBalance(parseFloat(ethBalance).toFixed(4));
        console.log("balance2", balance);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        console.log("data", data);
        const rate = data.ethereum.usd;
        console.log("rate", rate);
        setUsdBalance((parseFloat(ethBalance) * rate).toFixed(2));
        console.log("usdBalance", usdBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBalanceAndConvert();
  }, [address, currentNetwork, selectedAccountIndex, balance, usdBalance]);

  const handleOpenSendModal = () => {
    setIsSendModalOpen(true);
  };

  const handleCloseSendModal = () => {
    setIsSendModalOpen(false);
    setIsSendModal2Open(true)
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
    <div className="bg-[#252525] relative w-[375px]">
      <Header
        isOpen={isOpenNetworkTap}
        setIsOpenNetworkTab={setIsOpenNetworkTap}
        isAccountModalOpen={isAccountModalOpen}
        setIsAccountModalOpen={setIsAccountModalOpen}
      />
      {/* View account section */}
      <div className="mt-5">
        {/* Balance section */}
        <div className="flex flex-col items-center w-[350px] md:w-full p-2 mx-2 bg-[242424]">
          <div className="w-[345px]  h-40 md:w-full flex flex-col text-white  border border-[#4D4D4D] align-middle justify-center px-3 rounded-lg">
            <p className="font-karla font-semibold text-lg leading-6">
              Total Asset Value
            </p>
            <div className="font-karla font-bold  text-4xl my-2">
              {loading ? (
                <RiLoader2Line className="animate-spin" />
              ) : (
                (() => {
                  return `${displayBalance} ${networks[currentNetwork].ticker}`;
                })()
              )}
            </div>
            <h3 className="font-karla font-bold text-[#5CE677] text-lg leading-5">
              +98.02% (24h)
            </h3>
          </div>

          {/* Send and Deposit */}
          <div className="flex flex-row items-center justify-between w-[200px] mt-4">
            <div className="flex flex-row items-center justify-between w-[200px] mt-6 text-white">
              <button
                className="flex flex-row items-center border border-gray-400 px-4 py-2 rounded-lg hover:bg-violet-500 mr-4"
                onClick={handleOpenSendModal}
              >
                <IoIosSend />
                <h2 className="font-karla text-base font-bold ml-1">Send</h2>
              </button>
              <button
                className="flex flex-row items-center border border-gray-400 px-4 py-2 rounded-lg hover:bg-violet-500 "
                onClick={handleOpenReceiveModal}
              >
                <PiHandDepositFill />
                <h2 className="font-karla text-base font-bold ml-1">Receive</h2>
              </button>
            </div>
          </div>

          {/* Assets Section */}
          <div className="flex flex-col w-full px-4 mt-6">
            <h2 className="font-karla  text-white text-lg font-semibold">
              Assets
            </h2>

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
          />
        )}

        {isAccountModalOpen && (
          <AccountModal
            isOpen={isAccountModalOpen}
            setIsAccountModalOpen={setIsAccountModalOpen}
            address={address}
          />
        )}

        <SendModalTwo isOpen={isSendModal2Open} onClose={() => setIsSendModal2Open(false)} walletAddress={address} />
      </div>
    </div>
  );
};

export default ViewBalance;
