import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";

const GenerateSeed = () => {
  const [visibility, setVisibility] = useState(
    Array.from({ length: 12 }, () => false)
  );
  const toggleVisibility = (index: number) => {
    setVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  return (
    <div className="h-full overflow-auto no-scrollbar  py-4 px-4">
      <header className="flex items-center font-medium font-poppins gap-3 text-white">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 13.6443L11.0443 12.6L9.19425 10.75H13.75V9.25H9.19425L11.0443 7.4L10 6.35575L6.35575 10L10 13.6443ZM10.0017 19.5C8.68775 19.5 7.45267 19.2507 6.2965 18.752C5.14033 18.2533 4.13467 17.5766 3.2795 16.7218C2.42433 15.8669 1.74725 14.8617 1.24825 13.706C0.749417 12.5503 0.5 11.3156 0.5 10.0017C0.5 8.68775 0.749333 7.45267 1.248 6.2965C1.74667 5.14033 2.42342 4.13467 3.27825 3.2795C4.13308 2.42433 5.13833 1.74725 6.294 1.24825C7.44967 0.749417 8.68442 0.5 9.99825 0.5C11.3123 0.5 12.5473 0.749333 13.7035 1.248C14.8597 1.74667 15.8653 2.42342 16.7205 3.27825C17.5757 4.13308 18.2528 5.13833 18.7518 6.294C19.2506 7.44967 19.5 8.68442 19.5 9.99825C19.5 11.3123 19.2507 12.5473 18.752 13.7035C18.2533 14.8597 17.5766 15.8653 16.7218 16.7205C15.8669 17.5757 14.8617 18.2528 13.706 18.7518C12.5503 19.2506 11.3156 19.5 10.0017 19.5Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>

        <p>Secret Recovery Phrase</p>
      </header>

      <div className="mt-4 text-white flex flex-col gap-1">
        <h2 className="text-2xl font-karla">Protect you wallet</h2>
        <p className="font-inter text-gray-400">
          This is the only way to recover your account. Please store it safely.
        </p>

        <div className="mt-3 border grow w-full h-auto rounded-lg border-gray-500">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              className={`p-3 ${
                index < 11 && "border-b"
              }  border-b-gray-500 w-full flex justify-between items-center font-poppins`}
            >
              <div className="inline-flex gap-2">
                <p>{index + 1}.</p>
                <p>{visibility[index] ? "Access" : "******"}</p>
              </div>
              <button onClick={() => toggleVisibility(index)}>
                {visibility[index] ?  <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
          ))}
        </div>

        <Link to="">
          <button className="w-full mt-3 p-3 bg-[#E6E6E6] rounded-full text-[#1A1A1A] font-poppins">
            Ok, I saved it somewhere safe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GenerateSeed;
