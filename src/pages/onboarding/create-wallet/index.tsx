import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  persistEncryptedWalletAddress,
  generateSeedPhrase,
  getAddressFromSeedPhrase,
} from "../../../utils/utils";
import { FaExclamationCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./../../../assets/logoo.png";

const CreateWallet = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = (searchParams.get("type") as "create" | "recover") || "create";
  const [seedPhrase, setSeedPhrase] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleGenerateSeedPhrase = () => {
    const newSeedPhrase = generateSeedPhrase();
    setSeedPhrase(newSeedPhrase);
    const address = getAddressFromSeedPhrase(newSeedPhrase);
    setWalletAddress(address);
  };

  const handleSeedPhraseInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputPhrase = e.target.value;
    setSeedPhrase(inputPhrase);
    if (inputPhrase.trim()) {
      const address = getAddressFromSeedPhrase(inputPhrase);
      setWalletAddress(address);
    }
  };

  const handleContinue = () => {
    if (walletAddress) {
      persistEncryptedWalletAddress(walletAddress);
      navigate(`/view-balance?address=${walletAddress}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // const notify = () => {
  //   toast.success("This is a success message!");
  // };

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <button
          className="rounded"
          onClick={handleBack}
          style={{
            alignItems: "center",
            display: "inline",
            cursor: "pointer",
            color: "black",
            fontSize: "20px",
          }}
        >
          <IoMdArrowBack style={{ marginRight: "5px" }} />
        </button>
        <img src={logo} alt="" style={{ width: "70px" }} />
      </div>
      <div className="pt-5 text-center flex flex-col">
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
            {type === "create"
              ? "Once you generate the seed phrase, save it securely and once you have saved it, you can proceed to wallet."
              : "Please enter your seed phrase to recover your wallet."}
          </p>
        </div>
        <div>
          {type !== "recover" ? (
            <button
              onClick={handleGenerateSeedPhrase}
              className="bg-slate-800 text-white px-4 py-2 rounded font-bold w-full"
            >
              Generate seed phrase
            </button>
          ) : (
            <p className="bg-slate-800 text-white px-4 py-2 rounded font-bold w-full">
              Please enter your seed phrase
            </p>
          )}
        </div>
        <textarea
          className="border border-slate-500 rounded w-full h-40 m-auto mt-5 p-2"
          value={seedPhrase}
          onChange={handleSeedPhraseInput}
          placeholder={
            type === "recover"
              ? "Enter your seed phrase here"
              : "Your seed phrase will appear here"
          }
          readOnly={type === "create"}
        />
        <button
          onClick={handleContinue}
          disabled={!walletAddress}
          className={`text-slate-800 border border-slate-800 bg-white px-4 py-2 rounded font-bold w-full mt-10
            ${!walletAddress && "opacity-50 cursor-not-allowed"}`}
        >
          Continue to Wallet
        </button>
      </div>
    </div>
  );
};

export default CreateWallet;


