import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdMore, IoMdClose, IoMdAdd } from "react-icons/io";
import { getNetwork, networks, persistSelectedNetwork } from "../utils/utils";
import EthIcon from "../../src/assets/ETH stroke icon.png";
import { useNavigate } from "react-router-dom";

interface PropsSelectNetwork {
  isOpen: boolean;
  setIsOpenNetworkTab: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
}

const SelectNetwork: React.FC<PropsSelectNetwork> = ({
  isOpen,
  setIsOpenNetworkTab,
  address,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseNetworkBar = () => {
    setIsOpenNetworkTab(!isOpen);
  };

  // Filter networks based on searchQuery
  const filteredNetworks = Object.keys(networks).filter((network) => {
    const displayNetwork = getNetwork(network);
    return displayNetwork?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <div className=" absolute top-0  w-[375px] h-screen md:w-full">
      <div className="w-[375px] md:w-full flex flex-col items-center bg-[#242424] h-full text-white">
        {/* select network  */}
        <div className="flex flex-row items-center w-full justify-between px-4">
          <div className="flex justify-center flex-row items-center w-full">
            <h2 className="font-karla font-bold text-[22px] mt-2 mb-2">
              Select a network
            </h2>
          </div>
          <IoMdClose
            className="text-white text-2xl"
            onClick={handleCloseNetworkBar}
          />
        </div>

        {/* Search bar */}
        <div className="flex flex-row items-center border h-9 rounded w-[345px] mt-2 bg-white px-2">
          <CiSearch className="text-black" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full h-full outline-none pl-2 text-black"
          />
        </div>

        {/* -------------------Networks ----------------------*/}
        <div className="mt-2 h-[60%] overflow-auto px-6 "
          style={{
            scrollbarWidth: "none", /* Firefox */
            msOverflowStyle: "none", /* IE and Edge */
          }}
        >
          {/* Enabled Network */}
          <div className="w-[345px] mt-2">
            <h2 className="my-4 font-bold font-karla text-lg">
              Enabled Network
            </h2>
            {filteredNetworks.map((network) => {
              const displayNetwork = getNetwork(network);
              return (
                <button
                  key={network}
                  className="flex flex-row items-center justify-between hover:border h-10 hover:bg-gray-400 px-2 w-full"
                  onClick={() => {
                    persistSelectedNetwork(network);
                    setIsOpenNetworkTab(false);
                    navigate("/view-balance?address=" + address);
                  }}
                >
                  <div className="flex flex-row items-center">
                    {displayNetwork?.symbol}
                    <h2 className="font-karla ml-4 font-bold">
                      {displayNetwork?.name}
                    </h2>
                  </div>
                  <IoMdMore className="font-bold text-lg" />
                </button>
              );
            })}
          </div>

          {/* -----------------Additional Network -------------------*/}
          <div className="w-[345px] mt-2">
            <h2 className="my-4 font-bold font-karla text-lg">
              Additional Network
            </h2>
            {/* networks */}
            <div>
              <div className="flex flex-row items-center justify-between h-10 px-2">
                <div className="flex flex-row items-center">
                  <img src={EthIcon} alt="networkicon" className="w-5 h-4" />
                  <h2 className="font-karla ml-4 font-bold">OP Mainnet</h2>
                </div>
                <button className="text-blue-600 font-bold text-sm hover:border-b-2 hover:border-blue-600">
                  Add
                </button>
              </div>
              <div className="flex flex-row items-center justify-between h-10 px-2">
                <div className="flex flex-row items-center">
                  <img src={EthIcon} alt="networkicon" className="w-5 h-4" />
                  <h2 className="font-karla ml-4 font-bold">Polygon Mainnet</h2>
                </div>
                <button className="text-blue-600 font-bold text-sm hover:border-b-2 hover:border-blue-600">
                  Add
                </button>
              </div>
              <div className="flex flex-row items-center justify-between h-10 px-2">
                <div className="flex flex-row items-center">
                  <img src={EthIcon} alt="networkicon" className="w-5 h-4" />
                  <h2 className="font-karla ml-4 font-bold">Polygon Mainnet</h2>
                </div>
                <button className="text-blue-600 font-bold text-sm hover:border-b-2 hover:border-blue-600">
                  Add
                </button>
              </div>
              <div className="flex flex-row items-center justify-between h-10 px-2">
                <div className="flex flex-row items-center">
                  <img src={EthIcon} alt="networkicon" className="w-5 h-4" />
                  <h2 className="font-karla ml-4 font-bold">Polygon Mainnet</h2>
                </div>
                <button className="text-blue-600 font-bold text-sm hover:border-b-2 hover:border-blue-600">
                  Add
                </button>
              </div>
              <div className="flex flex-row items-center justify-between h-10 px-2">
                <div className="flex flex-row items-center">
                  <img src={EthIcon} alt="networkicon" className="w-5 h-4" />
                  <h2 className="font-karla ml-4 font-bold">Polygon Mainnet</h2>
                </div>
                <button className="text-blue-600 font-bold text-sm hover:border-b-2 hover:border-blue-600">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* custom network  */}

        <button className="absolute bottom-[20%] w-[80%] h-8 bg-white text-black rounded-full mt-3 flex flex-row items-center justify-center font-poppins ">
          <IoMdAdd className="text-2xl font-bold mr-3" />
          Add custom Network
        </button>
      </div>

    </div>
  );
};

export default SelectNetwork;
