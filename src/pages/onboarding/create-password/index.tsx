import { Link } from "react-router-dom";
import blockfuseLogo from "../../../assets/blockfuse.png";

const CreatePassword = () => {
  return (
    <div className="relative p-10 font-outfit h-full w-full flex items-center justify-center">
      {/* <Navbar /> */}
      <div className="w-full text-center flex flex-col items-center gap-3">
        <img src={blockfuseLogo} alt="" className="h-16 " />
        <h1 className="text-gray-800 font-bold text-[26px] font-karla bg-gradient-to-r from-purple-500 to-pink-500  bg-clip-text text-transparent">
          Cohort 2 Wallet
        </h1>
        <p className="text-gray-800 font-karla text-base">
          Your gateway to secure, decentralized finance. Easily manage, send,
          and receive your digital assets
        </p>
        <div className="w-full flex flex-col gap-2.5 mt-2">
          <Link to="/create-wallet">
            <button
              //
              className="bg-slate-800 text-white px-4 py-3 rounded font-bold w-full"
            >
              Create a Wallet
            </button>
          </Link>
          <Link to="/">
            <button className=" border border-slate-800  text-slate-800 px-4 py-3 rounded font-bold w-full">
              {" "}
              Sign in with seed phrase
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute mt-auto bottom-4">
        Built with by ❤️ cohort two geeks
      </div>
    </div>
  );
};

export default CreatePassword;
