import { Link } from "react-router-dom";
import logo from "./../../../assets/logoo.png";

const CreatePassword = () => {
  return (
    <div className="relative p-10 font-outfit h-full w-full flex items-center justify-center">
      {/* <Navbar /> */}
      <div className="w-full text-center flex flex-col items-center gap-32">
        <div className="flex flex-col gap-4">
          <div className="flex">
            <img src={logo} alt="" style={{ width: "100px" }} />
            <h1 className="ml-[-30px] mt-2 text-gray-800 font-bold text-[60px] font-karla bg-gradient-to-r from-slate-800 to-gray-500  bg-clip-text text-transparent">
              artera
            </h1>
          </div>
          <p className="text-gray-800 font-karla text-base ">
            Welcome to Katera, the wallet built to safeguard your funds
            effortlessly.
          </p>
        </div>
        <div className="w-full flex flex-col gap-2.5 mt-2">
          <Link to="/create-wallet">
            <button className="bg-slate-800 text-white px-4 py-3 rounded font-bold w-full">
              Create a Wallet
            </button>
          </Link>
          <Link to="/">
            <button className=" border border-slate-800  text-slate-800 px-4 py-3 rounded font-bold w-full">
              {" "}
              Import an existing wallet
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
