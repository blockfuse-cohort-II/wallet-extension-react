import { useState } from "react";
import BackArrow from "../../../components/icons/BackArrow";
import { useNavigate } from "react-router-dom";
import { getDecryptedWalletAddress, savePassword } from "../../../utils/utils";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "sonner";

const SuccessPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const walletAddress = getDecryptedWalletAddress();

  const verifyPassword = () => {
    if (password.length < 8) {
      toast.warning("password must be more than 8 words");
    } else if (password === confirmPassword) {
      // Save password in local storage
      savePassword(password);
      toast.success("Password created");
      navigate(`/view-balance?address=${walletAddress}`);
      return;
    } else {
      toast.warning("Passwords do not match");
    }
  };

  return (
    <div className="p-6">
      <div className="flex gap-2">
        <BackArrow />
        <p className="text-white font-semibold text-lg">Create a password</p>
      </div>
      <div className="flex flex-col justify-between h-[500px]">
        <div>
          <p className="text-xl mb-2 mt-4 text-white">
            One last step and you're all set!
          </p>
          <p className="text-white/50">
            Now create a password to help you login
          </p>
        </div>

        <div className="text-white font-poppins">
          <form action="">
            <div className="flex flex-col gap-1 mb-5">
              <label htmlFor="">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="text-white/50 bg-white/5 outline-0 border-0 py-2 px-3 rounded-lg w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 focus:outline-none"
                >
                  {showPassword ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="text-white/50 bg-white/5 outline-0 border-0 py-2 px-3 rounded-lg w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 focus:outline-none"
                >
                  {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full">
          <button
            className="w-full p-3 bg-violet-500 rounded-full text-white font-poppins"
            onClick={verifyPassword}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
