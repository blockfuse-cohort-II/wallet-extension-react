import Success from "../../../components/icons/Success";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="p-6">
      <div className="flex gap-2">
        <Success />
        <p className="text-white font-semibold text-lg">Create a Wallet</p>
      </div>
      <div className="flex flex-col justify-between h-[500px]">
        <div>
          <p className="text-2xl mt-4 text-white">You are all set!</p>
          <p className="text-white/50">You can now fully enjoy using your wallet.</p>
        </div>

        <div className="w-full">
          <Link to="/view-balance" className="w-full p-3 bg-violet-500 rounded-full text-white font-poppins">Get Started</Link>
        </div>
      </div>

    </div>
  )
}

export default SuccessPage;