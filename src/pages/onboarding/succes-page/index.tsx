// import Success from "../../../components/icons/Success";
// import { Link } from "react-router-dom";
import BackArrow from "../../../components/icons/BackArrow";
import {  useNavigate } from "react-router-dom";
// import Success from "../../../components/icons/Success";
import { getDecryptedWalletAddress } from "../../../utils/utils";

const SuccessPage = () => {
  const navigate = useNavigate();
  const walletAddress = getDecryptedWalletAddress();
  return (
    <div className="p-6">
      <div className="flex gap-2">
        {/* <Success /> */}
        <BackArrow />
        <p className="text-white font-semibold text-lg">Create a password</p>
      </div>
      <div className="flex flex-col justify-between h-[500px]">
        <div>
          <p className="text-xl mb-2 mt-4 text-white">One last step and you're all set!</p>
          <p className="text-white/50">
            Now create a password to help you login 
          </p>
        </div>

        
        <div className="text-white font-poppins">
          <form action="">
            <div className="flex flex-col gap-1 mb-5">
              <label htmlFor="">New Password</label>
              <input type="password" className="text-white/50 bg-white/5 outline-0 border-0 py-2 px-3 rounded-lg"/>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Confirm Password</label>
              <input type="password" className="text-white/50 bg-white/5 outline-0 border-0 py-2 px-3 rounded-lg"/>
            </div>

          </form>
        </div>

        <div className="w-full">
          <button
            className="w-full p-3 bg-violet-500 rounded-full text-white font-poppins"
            onClick={() => navigate(`/view-balance?address=${walletAddress}`)}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
