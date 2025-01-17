import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  encryptValue,
  generateSeedPhrase,
  getAddressFromSeedPhrase,
} from "../../../utils/utils";

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
      const encryptedWalletAddress = encryptValue(walletAddress);
      localStorage.setItem("encryptedWalletAddress", encryptedWalletAddress);
      navigate(`/view-balance?address=${walletAddress}`);
    }
  };

  return (
    <div className="p-10">
      <div className="pt-20 text-center flex flex-col">
        <div>
          <p className="text-justify justify-center text-[#FEC84B] bg-[#FEC84B]/20 border border-[#f5c453] m-auto full p-5 mb-5">
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
