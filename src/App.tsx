import { Route, Routes } from "react-router-dom";
import CreateWallet from "./pages/onboarding/create-wallet";

function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<CreateWallet />} />
        {/* <Route path="*" element={<NotFound />} />  */}
      </Routes>
    </div>
  );
}

export default App;
