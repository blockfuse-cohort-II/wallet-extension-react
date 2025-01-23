import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { retrieveData, validatePassword, clearStore } from "../../utils/utils";
import { toast } from "sonner";
import logo from "../../assets/logo2.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const walletAddress = retrieveData("accounts")[0].address;

  const verifyPassword = () => {
    console.log("password", password);
    if (validatePassword(password)) {
      navigate(`/view-balance?address=${walletAddress}`);
    } else {
      toast.info("Incorrect password.");
    }
  };

  const forgotPassword = () => {
    clearStore();
    navigate("/verify-seed?type=import");
  };

  return (
    <div className="p-6">
      <div className="flex gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            window.history.back();
          }}
        >
          <path
            d="M10 13.6443L11.0443 12.6L9.19425 10.75H13.75V9.25H9.19425L11.0443 7.4L10 6.35575L6.35575 10L10 13.6443ZM10.0017 19.5C8.68775 19.5 7.45267 19.2507 6.2965 18.752C5.14033 18.2533 4.13467 17.5766 3.2795 16.7218C2.42433 15.8669 1.74725 14.8617 1.24825 13.706C0.749417 12.5503 0.5 11.3156 0.5 10.0017C0.5 8.68775 0.749333 7.45267 1.248 6.2965C1.74667 5.14033 2.42342 4.13467 3.27825 3.2795C4.13308 2.42433 5.13833 1.74725 6.294 1.24825C7.44967 0.749417 8.68442 0.5 9.99825 0.5C11.3123 0.5 12.5473 0.749333 13.7035 1.248C14.8597 1.74667 15.8653 2.42342 16.7205 3.27825C17.5757 4.13308 18.2528 5.13833 18.7518 6.294C19.2506 7.44967 19.5 8.68442 19.5 9.99825C19.5 11.3123 19.2507 12.5473 18.752 13.7035C18.2533 14.8597 17.5766 15.8653 16.7218 16.7205C15.8669 17.5757 14.8617 18.2528 13.706 18.7518C12.5503 19.2506 11.3156 19.5 10.0017 19.5Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
        <p className="text-white font-semibold text-lg"></p>
      </div>
      <div className="min-h">
        <div className="items-center">
          <div className="mt-20">
            {" "}
            <Link to="/">
              <img
                src={logo}
                width={40}
                height={40}
                alt=""
                className="m-auto"
              />
            </Link>
          </div>
          <h2 className="text-xl mt-4 text-white font-poppins text-center font-bold ">
            Unlock
          </h2>
          <form action="" className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-white font-poppins pt-20">
                Password
              </label>
              <input
                type="password"
                className="text-white/50 bg-white/5 outline-0 border-0 py-3 px-2 rounded-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full p-3 mt-8 bg-violet-500 rounded-full text-white font-poppins"
              onClick={verifyPassword}
            >
              Unlock
            </button>
          </form>
        </div>
      </div>

      <div className="text-xs font-poppins mt-10 text-center text-white hover:text-violet-500">
        <button onClick={forgotPassword}>Forgot password?</button>
      </div>
    </div>
  );
};

export default Login;
