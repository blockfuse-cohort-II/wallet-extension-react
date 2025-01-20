import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdMore, IoMdClose, IoMdAdd } from "react-icons/io";
import { addCustomNetwork, getNetwork, networks, persistSelectedNetwork } from "../utils/utils";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customNetwork, setCustomNetwork] = useState({
    name: "",
    rpcUrl: "",
    chainId: "",
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseNetworkBar = () => {
    setIsOpenNetworkTab(!isOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCustomNetwork({ name: "", rpcUrl: "", chainId: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomNetwork((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomNetwork = () => {
    const { name, rpcUrl, chainId } = customNetwork;
    if (!name || !rpcUrl || !chainId) {
      alert("Please fill in all fields.");
      return;
    }

    addCustomNetwork(name, rpcUrl, parseInt(chainId));
    handleCloseModal();
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
        
        <button className="absolute bottom-[20%] w-[80%] h-8 bg-white text-black rounded-full mt-3 flex flex-row items-center justify-center font-poppins "
        onClick={handleOpenModal}>
          <IoMdAdd className="text-2xl font-bold mr-3" />
          Add custom Network
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[90%] md:w-[400px]">
              <h2 className="text-xl font-bold mb-4">Add Custom Network</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Network Name</label>
                <input
                  type="text"
                  name="name"
                  value={customNetwork.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Custom Network"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">RPC URL</label>
                <input
                  type="text"
                  name="rpcUrl"
                  value={customNetwork.rpcUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., https://custom-rpc.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Chain ID</label>
                <input
                  type="text"
                  name="chainId"
                  value={customNetwork.chainId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 1337"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddCustomNetwork}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Add
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default SelectNetwork;