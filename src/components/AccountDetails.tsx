import { RiCloseLine } from "react-icons/ri";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const AccountDetails: React.FC<SendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" w-[90%] md:w-[400px] p-6 rounded shadow-md">
        <div className="flex items-center mb-4">
          <RiCloseLine
            className="cursor-pointer text-xl  bg-[#D9D9D9] rounded-full mr-3"
            onClick={onClose}
          />
          <h2 className="text-xl  text-white font-bold">Receive</h2>
        </div>
        <div className="">
          <img src="" alt="" />
        </div>
        <div>
          <h2>Account1</h2>
          <p>0xffee455434ererj3438434</p>
        </div>
        <div>
          <svg
            width="17"
            height="15"
            viewBox="0 0 17 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25 15.5V0.5H16.25V15.5H4.25ZM5.75 14H14.75V2H5.75V14ZM0.75 19V4.30775H2.25V17.5H12.4423V19H0.75Z"
              fill="white"
              fill-opacity="0.5"
            />
          </svg>
          Copy Address
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
