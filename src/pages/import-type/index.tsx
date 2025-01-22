import React, { useState } from "react";
import CustomCheckbox from "../../components/reusables/RoundedCheckbox";
import { useNavigate } from "react-router-dom";

const ImportStrategy = () => {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState("");

  const isValid = isChecked === "private" || isChecked === "seed";

  const handleNextPage = () => {
    const redirect =
      isChecked === "private" ? "/private-key" : "/verify-seed?type=import";

    console.log(redirect);
    navigate(redirect);
  };

  return (
    <div className="py-6 px-4 h-full">
      <header className="flex items-center font-medium font-poppins gap-3 text-white cursor-pointer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            window.history.back();
            localStorage.removeItem("seedPhrase");
          }}
        >
          <path
            d="M10 13.6443L11.0443 12.6L9.19425 10.75H13.75V9.25H9.19425L11.0443 7.4L10 6.35575L6.35575 10L10 13.6443ZM10.0017 19.5C8.68775 19.5 7.45267 19.2507 6.2965 18.752C5.14033 18.2533 4.13467 17.5766 3.2795 16.7218C2.42433 15.8669 1.74725 14.8617 1.24825 13.706C0.749417 12.5503 0.5 11.3156 0.5 10.0017C0.5 8.68775 0.749333 7.45267 1.248 6.2965C1.74667 5.14033 2.42342 4.13467 3.27825 3.2795C4.13308 2.42433 5.13833 1.74725 6.294 1.24825C7.44967 0.749417 8.68442 0.5 9.99825 0.5C11.3123 0.5 12.5473 0.749333 13.7035 1.248C14.8597 1.74667 15.8653 2.42342 16.7205 3.27825C17.5757 4.13308 18.2528 5.13833 18.7518 6.294C19.2506 7.44967 19.5 8.68442 19.5 9.99825C19.5 11.3123 19.2507 12.5473 18.752 13.7035C18.2533 14.8597 17.5766 15.8653 16.7218 16.7205C15.8669 17.5757 14.8617 18.2528 13.706 18.7518C12.5503 19.2506 11.3156 19.5 10.0017 19.5Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>

        <p>Import Strategy</p>
      </header>

      <div className="mt-8 text-white flex flex-col gap-1">
        <h2 className="text-2xl font-karla">
          Select a Method to import your wallet
        </h2>
        <p className="font-inter text-gray-400">
          Select Prefered strategy to import your wallet
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        <div
          className={`w-full border ${
            isChecked === "private" ? "border-violet-500" : "border-gray-500"
          }  flex items-start p-4 rounded-lg cursor-pointer`}
          onClick={() => setIsChecked("private")}
        >
          <div className="pt-1.5">
            <CustomCheckbox
              label="Private Key"
              checked={isChecked === "private"}
              onChange={() => setIsChecked("private")}
            />
          </div>
          <div className="">
            <h2 className="font-semibold text-violet-500 text-base font-karla">
              Private Key
            </h2>
            <p className="font-inter text-gray-400">
              Use your unique private key to import your wallet. This key gives
              you access to your account and funds.
            </p>
          </div>
        </div>

        <div
          className={`w-full border ${
            isChecked === "seed" ? "border-violet-500" : "border-gray-500"
          }  flex items-start p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out`}
          onClick={() => setIsChecked("seed")}
        >
          <div className="pt-1.5">
            <CustomCheckbox
              label="Private Key"
              checked={isChecked === "seed"}
              onChange={() => setIsChecked("seed")}
            />
          </div>
          <div className="">
            <h2 className="font-semibold text-violet-500 text-base font-karla">
              Seed phrase
            </h2>
            <p className="font-inter text-gray-400">
              Use your seed phrase to import your wallet. This phrase is a
              series of words that gives you access to your account and funds.
            </p>
          </div>
        </div>
      </div>

      <button
        className={`w-full p-3 mt-10 ${
          !isValid && "opacity-20"
        } bg-violet-500 rounded-full text-white font-poppins transition-opacity duration-300 ease-in-out`}
        disabled={!isValid}
        onClick={handleNextPage}
      >
        Continue
      </button>
    </div>
  );
};

export default ImportStrategy;
