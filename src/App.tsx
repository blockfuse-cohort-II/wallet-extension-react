import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/onboarding/welcome-page";
import ViewBalance from "./pages/viewbalance/ViewBalance";
import GenerateSeed from "./pages/onboarding/generate-seed";
import Transactions from "./pages/transactions";

function App() {
  return (
    <div className="h-full w-[375px] md:w-full">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/create-wallet" element={<GenerateSeed />} />
        <Route path="/view-balance" element={<ViewBalance />} />
        <Route path="/transactions" element={<Transactions />} /> 
      </Routes>
    </div>
  );
}

export default App;