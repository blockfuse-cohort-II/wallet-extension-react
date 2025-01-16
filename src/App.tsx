import { Route, Routes } from "react-router-dom";
import CreateWallet from "./pages/onboarding/create-wallet";
import ViewBalance from "./pages/viewbalance/ViewBalance";

function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        {/* <Route path="/" element={<CreateWallet />} /> */}
        <Route path="/" element={<ViewBalance />} />
        {/* <Route path="*" element={<NotFound />} />  */}
      </Routes>
    </div>
  );
}

export default App;
