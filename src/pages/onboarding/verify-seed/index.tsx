import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";

const VerifySeed = () => {
  const [visibility, setVisibility] = useState(
    Array.from({ length: 12 }, () => false)
  );
  const [seedPhrase, setSeedPhrase] = useState(
    Array.from({ length: 12 }, () => "")
  );

  const toggleVisibility = (index: number) => {
    setVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  // Function to handle input changes
  const handleInputChange = (index: number, value: string) => {
    setSeedPhrase((prevSeedPhrase) => {
      const newSeedPhrase = [...prevSeedPhrase];
      newSeedPhrase[index] = value;
      return newSeedPhrase;
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

        <p>Verify Recovery Phrase</p>
      </header>

      <div className="mt-10 text-white flex flex-col gap-1">
        <h2 className="text-2xl font-karla">Verify Recovery Phrase</h2>
        <p className="font-inter text-gray-400">
          This is a crucial step to ensure your seed phrase is correct and can
          be used to recover your account. Please verify each word carefully and
          store it securely.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="flex relative font-poppins text-white items-center gap-1"
          >
            {index + 1}.
            <input
              type={visibility[index] ? "text" : "password"}
              value={seedPhrase[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full p-2 border border-gray-500 bg-transparent focus:outline-none rounded-lg pr-10"
            />
            <button
              onClick={() => toggleVisibility(index)}
              className="etxt-white right-0 flex items-center pr-3"
            >
              {visibility[index] ? <BsEye /> :  <BsEyeSlash /> }
            </button>
          </div>
        ))}
      </div>

      <Link to="/success-page">
        <button className="w-full mt-8 p-3 bg-violet-500 text-white rounded-full font-poppins">
          I'm sure, Finish
        </button>
      </Link>
    </div>
  );
};

export default VerifySeed;
