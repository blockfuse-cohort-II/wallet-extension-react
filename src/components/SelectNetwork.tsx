import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdMore, IoMdClose } from "react-icons/io";
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
    <div className="  bg-gray-600 absolute top-0  w-[375px] h-screen md:w-full">
      <div className="w-full flex justify-end pt-3 pr-3">
        <IoMdClose
          className="text-white text-2xl"
          onClick={handleCloseNetworkBar}
        />
      </div>
      <div className="w-[375px] md:w-full flex flex-col items-center bg-gray-600 h-full text-white">
        <h2 className="font-karla font-bold text-[22px] mt-2 mb-2">
          Select a network
        </h2>
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

        {/* Enabled Network */}
        <div className="w-[345px] mt-2">
          <h2 className="my-4 font-bold font-karla text-lg">Enabled Network</h2>
          {filteredNetworks.map((network) => {
            const displayNetwork = getNetwork(network);
            return (
              <button
                key={network}
                className="flex flex-row items-center justify-between hover:border h-16 hover:bg-gray-400 px-2 w-full"
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

        {/* Additional Network */}
        <div className="w-[345px] mt-2">
          <h2 className="my-4 font-bold font-karla text-lg">
            Additional Network
          </h2>
          <div className="flex flex-row items-center justify-between h-16 px-2">
            <div className="flex flex-row items-center">
              <img src={EthIcon} alt="networkicon" className="w-5 h-4" />
              <h2 className="font-karla ml-4 font-bold">Ethereum Mainnet</h2>
            </div>
            <button className="text-blue-600 font-bold text-sm hover:border-b-2 hover:border-blue-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectNetwork;
