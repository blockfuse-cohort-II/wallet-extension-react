import Header from "../../components/Header";
import { IoIosSend } from "react-icons/io";
import EthIcon from "../../assets/ETH stroke icon.png";
import { PiHandDepositFill } from "react-icons/pi";
import SelectNetwork from "../../components/SelectNetwork";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getBalance, getSelectedNetwork, networks } from "../../utils/utils";

const ViewBalance = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address") ?? "";
  const [isOpenNetworkTap, setIsOpenNetworkTap] = useState(false);
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const currentNetwork = getSelectedNetwork() as keyof typeof networks;

  useEffect(() => {
    setLoading(true);
    getBalance(
      address,
      networks[currentNetwork].chainId,
      networks[currentNetwork].rpcUrl
    )
      .then((balance) => {
        setBalance(balance);
        setAssets([]);
      })
      .finally(() => setLoading(false));
  }, [address, currentNetwork]);

  return (
    <div className="bg-white relative w-[375px]">
      <Header
        isOpen={isOpenNetworkTap}
        setIsOpenNetworkTab={setIsOpenNetworkTap}
        address={address}
      />
      {/* View account section */}
      <div className="mt-3">
        {/* Balance section */}
        <div className="flex flex-col items-center w-[375px] md:w-full p-2">
          <div className="w-[355px] bg-gradient-to-r from-[#ADFDC666] via-[#eee3ae66] to-[#E1ACAC66] h-40 md:w-full flex flex-col items-center justify-center align-middle">
            <p className="font-karla font-semibold text-lg leading-6">
              Your balance
            </p>
            <h2 className="font-karla font-extrabold text-gray-600 text-4xl my-2">
              {loading ? "Loading..." : `${balance} ETH`}
            </h2>
            <h3 className="font-karla font-bold text-lg leading-5">+12.44%</h3>
          </div>

          {/* Send and Deposit */}
          <div className="flex flex-row items-center justify-between w-[200px] mt-4">
            <div className="flex flex-row items-center">
              <IoIosSend />
              <h2 className="font-karla text-xl font-bold ml-1">Send</h2>
            </div>
            <div className="flex flex-row items-center">
              <PiHandDepositFill />
              <h2 className="font-karla text-xl font-bold ml-1">Deposit</h2>
            </div>
          </div>
        </div>

        {/* Assets Section */}
        <div className="flex flex-col w-full px-2">
          <h2 className="font-karla font-semibold">Assets</h2>
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
    </div>
  );
};

export default ViewBalance;
