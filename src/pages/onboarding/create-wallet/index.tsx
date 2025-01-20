import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  persistEncryptedWalletAddress,
  generateSeedPhrase,
  getAddressFromSeedPhrase,
  savePrivateKey,
} from "../../../utils/utils";
import { FaExclamationCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./../../../assets/logo2.png";

const CreateWallet = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = (searchParams.get("type") as "create" | "recover") || "create";
  const [seedPhrase, setSeedPhrase] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // const handleGenerateSeedPhrase = () => {
  //   const newSeedPhrase = generateSeedPhrase();
  //   setSeedPhrase(newSeedPhrase);
  //   const {address, privateKey} = getAddressFromSeedPhrase(newSeedPhrase);
  //   setWalletAddress(address);

  //    // Save the encrypted private key immediately
  //   //  const passphrase = "secure-internal-passphrase"; // Internal passphrase
  //   //  savePrivateKey(privateKey, seedPhrase);
  //    savePrivateKey(privateKey);
  //    console.log(seedPhrase, "seedPhrase", privateKey, "privateKey");
  //    console.log("Private key securely stored.");
    
  // };

  // const handleSeedPhraseInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const inputPhrase = e.target.value;
  //   setSeedPhrase(inputPhrase);
  //   if (inputPhrase.trim()) {
  //     const {address} = getAddressFromSeedPhrase(inputPhrase);
  //     setWalletAddress(address);
  //   }
  // };

  // const handleContinue = () => {
  //   if (walletAddress && seedPhrase) {
  //     persistEncryptedWalletAddress(walletAddress);
  //     alert("Wallet created successfully and private key securely stored.");
  //     navigate(`/view-balance?address=${walletAddress}`);
  //   }
  // };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    
  );
};

export default CreateWallet;


