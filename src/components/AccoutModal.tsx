import { IoMdMore, IoMdClose, IoMdAdd } from "react-icons/io";
import AccountIcon from "../assets/Account icon.png";
import { CiSearch } from "react-icons/ci";
import EthIcon from "../../src/assets/ETH stroke icon.png";

interface PropsSelectNetwork {
  isOpen: boolean;
  setIsAccountModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AccoutModal: React.FC<PropsSelectNetwork> = ({
  isOpen,
  setIsAccountModalOpen,
}) => {
  const handleCloseNetworkBar = () => {
    setIsAccountModalOpen(!isOpen);
  };

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
        <div className="flex flex-row items-center border h-9 rounded shadow-md w-[345px] mt-2  px-2">
          <CiSearch className="text-white " />
          <input
            type="text"
            placeholder="Search"
            // value={searchQuery}
            // onChange={handleSearchChange}
            className="w-full h-full outline-none pl-2 text-white bg-transparent"
          />
        </div>

        {/* -------------------Networks ----------------------*/}
        <div
          className="mt-2 h-[60%] overflow-auto px-6 "
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          {/* -----------------Accounts -------------------*/}
          <div className="w-[345px] mt-5">
            {/* Account */}
            <div className="flex flex-row items-center h-10  py-2 px-2 justify-between">

              <div className="flex flex-row items-center">
                {/* account image */}
                <div className="h-full w-6 rounded-full">
                  <img
                    src={AccountIcon}
                    alt="account-Image"
                    className="w-full h-full"
                  />
                </div>

                {/* account name and address */}
                <div className="ml-5">
                  <h2 className="font-karla font-bold text-xl">Account 1</h2>
                  <span className="font-karla text-sm font-normal">
                    0xeb7CD....71
                  </span>
                </div>
              </div>

              {/* account balance and assets */}
              <div className="flex">
                <div className="flex flex-col items-end mr-2">
                    <p className="font-karla text-base ">$0.21 USD</p>
                    <div className="flex flex-row items-center justify-between">
                        <img src={AccountIcon} alt="asset icon" className="w-3 mr-2" />
                        <h2 className="font-karla">0.00001  <span>Eth</span></h2>
                    </div>
                </div>
                  <IoMdMore className="font-bold text-2xl"/>
              </div>
            </div>
          </div>
        </div>

        {/* custom network  */}

        <button className="absolute bottom-[20%] w-[80%] h-8 bg-white text-black rounded-full mt-3 flex flex-row items-center justify-center font-poppins ">
          <IoMdAdd className="text-2xl font-bold mr-3" />
          Add Account
        </button>
      </div>
    </div>
  );
};

export default AccoutModal;
