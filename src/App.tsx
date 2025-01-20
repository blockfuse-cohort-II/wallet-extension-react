import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/onboarding/welcome-page";
import ViewBalance from "./pages/viewbalance/ViewBalance";
import GenerateSeed from "./pages/onboarding/generate-seed";
import Transactions from "./pages/transactions";
import SuccessPage from "./pages/onboarding/succes-page";
import VerifySeed from "./pages/onboarding/verify-seed";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-full w-[375px] md:w-full">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/create-wallet" element={<GenerateSeed />} />
        <Route path="/view-balance" element={<ViewBalance />} />
        <Route path="/verify-seed" element={<VerifySeed />} />
        <Route path="/transactions" element={<Transactions />} /> 
        <Route path="/success-page" element={<SuccessPage />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
