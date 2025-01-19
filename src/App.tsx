import { Route, Routes } from "react-router-dom";
import CreateWallet from "./pages/onboarding/create-wallet";
import CreatePassword from "./pages/onboarding/welcome-page";
import ViewBalance from "./pages/viewbalance/ViewBalance";

function App() {
  return (
    <div className="h-full w-[375px] md:w-full">
      <Routes>
        {/* <Route path="/" element={<CreatePassword />} /> */}
        <Route path="/create-wallet" element={<CreateWallet />} />
        <Route path="/" element={<ViewBalance />} />
      </Routes>
    </div>
  );
}

export default App;
