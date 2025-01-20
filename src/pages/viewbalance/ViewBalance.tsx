import Header from "../../components/Header";
import { IoIosSend } from "react-icons/io";
import EthIcon from "../../assets/ETH stroke icon.png";
import { PiHandDepositFill } from "react-icons/pi";
import SelectNetwork from "../../components/SelectNetwork";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AccoutModal from "../../components/AccoutModal";
import {
  getBalance,
  getDecryptedWalletAddress,
  getSelectedNetwork,
  networks,
} from "../../utils/utils";
import { RiLoader2Line } from "react-icons/ri";
import SendModal from "../../components/SendModal";
import ReceiveModal from "../../components/ReceiveModal";


const ViewBalance = () => {
  const [searchParams] = useSearchParams();
  const address =
    searchParams.get("address") ?? getDecryptedWalletAddress() ?? "";
  const [isOpenNetworkTap, setIsOpenNetworkTap] = useState(false);
  const [balance, setBalance] = useState("0.00");
  const [loading, setLoading] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
  const currentNetwork = getSelectedNetwork() as keyof typeof networks;

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

  useEffect(() => {
    setLoading(true);
    getBalance(
      address,
      networks[currentNetwork].chainId,
      networks[currentNetwork].rpcUrl
    )
      .then((balance) => {
        setBalance(parseFloat(balance).toFixed(4));
        setAssets([]);
      })
      .finally(() => setLoading(false));
  }, [address, currentNetwork]);


  return (
    <div className="bg-[#252525] relative w-[375px]">
      <Header
        isOpen={isOpenNetworkTap}
        setIsOpenNetworkTab={setIsOpenNetworkTap}
        isAccountModalOpen={isAccountModalOpen}
        setIsAccountModalOpen={setIsAccountModalOpen}
        address={address}

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
                `${balance} ETH`
              )}
            </div>
            <h3 className="font-karla font-bold text-[#5CE677] text-lg leading-5">+98.02% (24h)</h3>
          </div>

          {/* Send and Deposit */}
          <div className="flex flex-row items-center justify-between w-[200px] mt-4">
            <div className="flex flex-row items-center justify-between w-[200px] mt-6 text-white">
              <button className="flex flex-row items-center border border-gray-400 px-4 py-2 rounded-lg hover:bg-violet-500 mr-4" onClick={handleOpenSendModal}>
                <IoIosSend />
                <h2 className="font-karla text-base font-bold ml-1">Send</h2>
              </button>
              <button className="flex flex-row items-center border border-gray-400 px-4 py-2 rounded-lg hover:bg-violet-500 "  onClick={handleOpenReceiveModal}>
                <PiHandDepositFill />
                <h2 className="font-karla text-base font-bold ml-1">Receive</h2>
              </button>

            </div>
          </div>

          {/* Assets Section */}
          <div className="flex flex-col w-full px-4 mt-6">
            <h2 className="font-karla  text-white text-lg font-semibold">Assets</h2>

            <div className="mt-4">
              {assets.length > 0 ? (
                assets.map(
                  (
                    asset: {
                      name: string;
                      quantity: number;
                      price: string;
                      change: string;
                    },
                    index: number
                  ) => (
                    <div
                      key={asset?.name + index}
                      className="flex flex-row justify-between items-center w-full h-[77px] border-b-2 shadow-md px-2 mb-3"
                    >
                      <div className="flex flex-row items-center">
                        {/* Asset Icon */}
                        <div className="w-10 h-10">
                          <img
                            src={EthIcon}
                            alt="assetIcon"
                            className="object-contain w-full h-full"
                          />
                        </div>
                        {/* Asset Name and Quantity */}
                        <div className="flex flex-col items-start ml-4">
                          <h2 className="font-karla font-bold leading-6">
                            {asset.name}
                          </h2>
                          <p className="font-karla font-medium">
                            {asset.quantity}
                          </p>
                        </div>
                      </div>
                      {/* Asset Price */}
                      <div className="flex flex-col items-end">
                        <h2 className="font-karla text-base font-bold leading-6">
                          {asset.price}
                        </h2>
                        <p className="font-medium font-karla text-gray-500">
                          {asset.change}
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
      )
      }

      {isAccountModalOpen && (
        <AccoutModal isOpen={isAccountModalOpen} setIsAccountModalOpen={setIsAccountModalOpen}/>
      )}
    </div>
    </div>
  );
}

export default ViewBalance;
