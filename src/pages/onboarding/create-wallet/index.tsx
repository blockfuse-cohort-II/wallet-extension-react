import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const CreateWallet = () => {
  return (
    <div className="p-10">
      <div className="pt-20 text-center flex flex-col">
        <div>
          <p className="flex text-justify justify-center text-[#FEC84B] bg-[#FEC84B]/20 border border-[#f5c453] m-auto full p-5 mb-5 text-sm">
            <FaExclamationCircle
              style={{
                color: "orange",
                fontSize: "40px",
                marginRight: "5px",
                position: "relative",
                bottom: "10px",
              }}
            />
            Once you generate the seed phrase, save it securely, and once you
            have saved it, you can proceed to wallet.
          </p>
        </div>
        <div>
          <button className="bg-slate-800 text-white px-4 py-2 rounded font-bold w-full">
            Generate seed phrase
          </button>
        </div>
        <div className="border border-slate-500 rounded w-full h-40 m-auto mt-5"></div>
        <Link
          to="/view-balance"
          className="text-slate-800 border border-slate-800 bg-white px-4 py-2 rounded font-bold w-full mt-10"
        >
          Continue to Wallet
        </Link>
      </div>
    </div>
  );
};

export default CreateWallet;
