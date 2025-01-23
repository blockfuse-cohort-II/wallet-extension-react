import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/onboarding/welcome-page";
import ViewBalance from "./pages/viewbalance/ViewBalance";
import GenerateSeed from "./pages/onboarding/generate-seed";
import Transactions from "./pages/transactions";
import SuccessPage from "./pages/onboarding/succes-page";
import VerifySeed from "./pages/verify-seed";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import Contacts from "./pages/contacts";
import ImportStrategy from "./pages/import-type";
import PrivateKey from "./pages/import-type/PrivateKey";

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
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/import-wallet" element={<ImportStrategy />} />
        <Route path="/private-key" element={<PrivateKey />} />

      </Routes>
      <ToastContainer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
