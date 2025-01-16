import { Link } from "react-router-dom";

const CreatePassword = () => {
  return (
    <div className="p-10">
        {/* <Navbar /> */}
        <div className="text-center pt-20 ">
          <h1 className="text-gray-800 font-bold text-3xl">Wallet</h1>
          <p className="pt-10">Welcome to your Web3 Wallet made just for you.</p>
          <div className="pt-20 flex flex-col gap-8">
            <div>
              <Link to="/create-wallet" className=" bg-[#FEC84B]  text-white px-4 py-2 rounded font-bold">Create a Wallet</Link>
            </div>
            <div>
            <Link to="/" className="bg-slate-800 text-white px-4 py-2 rounded font-bold">Sign in with seed phrase</Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CreatePassword;
