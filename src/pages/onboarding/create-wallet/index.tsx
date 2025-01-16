import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./../../../assets/logoo.png";


const CreateWallet = () => {
  const navigate = useNavigate();

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
            Once you generate the seed phrase, save it securely, and once you
            have saved it, you can proceed to wallet.
          </p>
        </div>
        <div>
          <button className="bg-slate-800 text-white px-4 py-2 rounded font-bold w-full">
            Generate seed phrase
          </button>
        </div>
        <div className="border border-slate-500 rounded w-full h-40 m-auto mt-5 relative">
          <FaRegCopy
            // onClick={notify}
            style={{
              color: "gray",
              fontSize: "17px",
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "7px",
            }}
          />
        </div>
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
