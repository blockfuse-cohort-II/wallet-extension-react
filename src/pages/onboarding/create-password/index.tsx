import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDecryptedWalletAddress } from "../../../utils/utils";

const CreatePassword = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const walletAddress = getDecryptedWalletAddress(); 

    if (walletAddress) {

      navigate(`/view-balance?address=${walletAddress}`);
    }
  }, [navigate]);
  return (
    <div className="p-10">
      {/* <Navbar /> */}
      <div className="text-center pt-20 ">
        <h1 className="text-gray-800 font-bold text-3xl">Wallet</h1>
        <p className="pt-10">Welcome to your Web3 Wallet made just for you.</p>
        <div className="pt-20 flex flex-col gap-6">
          <div>
            <Link
              to="/create-wallet?type=create"
              className=" bg-[#FEC84B]  text-white px-6 py-3 rounded font-bold"
            >
              Create a Wallet
            </Link>
          </div>
          <h3 className="text-gray-800 font-bold text-xl">or</h3>
          <div>
            <Link
              to="/create-wallet?type=recover"
              className="bg-slate-800 text-white px-6 py-3 rounded font-bold"
            >
              Import Existing Wallet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
