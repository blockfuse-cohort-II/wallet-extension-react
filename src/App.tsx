import { Route, Routes } from "react-router-dom";
import CreateWallet from "./pages/onboarding/create-wallet";
import CreatePassword from "./pages/onboarding/create-password";

function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<CreatePassword />} />
        <Route path="/create-wallet" element={<CreateWallet />} />
        {/* <Route path="*" element={<NotFound />} />  */}
      </Routes>
    </div>
  );
}

export default App;
