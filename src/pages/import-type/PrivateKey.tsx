import { useState } from "react";
import { getAddressFromPrivateKey, persistData } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const PrivateKey = () => {
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();
  const [privateKeyHidden, setPrivateKeyHidden] = useState(true);
  const handleAddWallet = () => {
    const wallet = getAddressFromPrivateKey(privateKey);
    persistData("accounts", [
      {
        address: wallet.address,
        privateKey: wallet.privateKey,
        isKeyImported: true,
      },
    ]);
    navigate("/success-page");
  };
  return (
    <div className="h-full  py-6 px-4">
      <header className="flex items-center font-medium font-poppins gap-3 text-white cursor-pointer">
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

        <p>Secret Recovery Phrase</p>
      </header>

      <div className="mt-8 text-white flex flex-col gap-1">
        <h2 className="text-2xl font-karla">Import Account</h2>
        <p className="font-inter text-gray-400">
          Enter your private key to import your account.
        </p>
        <form action="" className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-white font-poppins pt-32">
              Private Key
            </label>

            <div className="w-full relative">
              <input
                type={`${privateKeyHidden ? "privateKey" : "text"}`}
                className="text-white/50 bg-white/5 w-full outline-0 border-0 py-3 rounded-full px-4"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
              />

              <span
                className="absolute right-4 top-3 cursor-pointer "
                onClick={() => setPrivateKeyHidden(!privateKeyHidden)}
              >
                {privateKeyHidden ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <button
            className="w-full p-3 mt-3 bg-violet-500 rounded-full text-white font-poppins"
            onClick={handleAddWallet}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrivateKey;
