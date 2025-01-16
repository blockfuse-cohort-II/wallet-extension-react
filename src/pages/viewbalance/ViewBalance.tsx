import Header from "../../components/Header";
import { IoIosSend } from "react-icons/io";
import EthIcon from "../../assets/ETH stroke icon.png";
import { PiHandDepositFill } from "react-icons/pi";
import SelectNetwork from "../../components/SelectNetwork";
import { useState } from "react";

const ViewBalance = () => {
 const [isOpenNetworkTap,setIsOpenNetworkTap]=useState(false)
  return (
    <div className="bg-white relative w-[375px]" >
      <Header isOpen={isOpenNetworkTap} setIsOpenNetworkTab={setIsOpenNetworkTap}/>
      {/* view account section */}

      <div className="mt-3">
        {/* balance section */}
        <div className="flex flex-col items-center w-[375px] md:w-full p-2">
          {/* balance */}
          <div className="w-[355px] bg-gradient-to-r from-[#ADFDC666] via-[#eee3ae66] to-[#E1ACAC66] h-40 md:w-full flex flex-col items-center justify-center align-middle">
            <p className="font-karla font-semibold text-lg leading-6">
              Your balance
            </p>
            <h2 className="font-karla font-extrabold text-gray-600 text-4xl my-2">
              $404.18
            </h2>
            <h3 className="font-karla font-bold text-lg leading-5">+12.44%</h3>
          </div>

          {/* send and deposit */}
          <div className="flex flex-row items-center justify-between w-[200px] mt-4">
            {/* send */}
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

        {/* assets */}
        <div className="flex flex-col w-full px-2">
          <h2 className="font-karla font-semibold">Assets</h2>

          {/* assets */}
          <div className="mt-4">
            <div className="flex flex-row justify-between items-center w-full  h-[77px] border-b-2 shadow-md px-2 mb-3">
              <div className="flex flex-row items-center">
                {/* asset icon */}
                <div className="w-10 h-10">
                  <img
                    src={EthIcon}
                    alt="assetIcon"
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* asset name and quantity */}
                <div className="flex flex-col items-start ml-4">
                  <h2 className="font-karla font-bold leading-6">Ethereum</h2>
                  <p className="font-karla font-medium ">1.02 ETH</p>
                </div>
                {/* asset price */}
              </div>
              <div className="flex flex-col items-end">
                <h2 className="font-karla text-base font-bold leading-6">
                  $404.18{" "}
                </h2>
                <p className="font-medium font-karla text-gray-500">+$24.50</p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full  h-[77px] border-b-2 shadow-md px-2 mb-3">
              <div className="flex flex-row items-center">
                {/* asset icon */}
                <div className="w-10 h-10">
                  <img
                    src={EthIcon}
                    alt="assetIcon"
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* asset name and quantity */}
                <div className="flex flex-col items-start ml-4">
                  <h2 className="font-karla font-bold leading-6">Ethereum</h2>
                  <p className="font-karla font-medium ">1.02 ETH</p>
                </div>
                {/* asset price */}
              </div>
              <div className="flex flex-col items-end">
                <h2 className="font-karla text-base font-bold leading-6">
                  $404.18{" "}
                </h2>
                <p className="font-medium font-karla text-gray-500">+$24.50</p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full  h-[77px] border-b-2 shadow-md px-2 mb-3">
              <div className="flex flex-row items-center">
                {/* asset icon */}
                <div className="w-10 h-10">
                  <img
                    src={EthIcon}
                    alt="assetIcon"
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* asset name and quantity */}
                <div className="flex flex-col items-start ml-4">
                  <h2 className="font-karla font-bold leading-6">Ethereum</h2>
                  <p className="font-karla font-medium ">1.02 ETH</p>
                </div>
                {/* asset price */}
              </div>
              <div className="flex flex-col items-end">
                <h2 className="font-karla text-base font-bold leading-6">
                  $404.18{" "}
                </h2>
                <p className="font-medium font-karla text-gray-500">+$24.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenNetworkTap && (
          <SelectNetwork isOpen={isOpenNetworkTap} setIsOpenNetworkTab={setIsOpenNetworkTap}/>
      )}
    </div>
  );
};

export default ViewBalance;
