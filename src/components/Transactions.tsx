import ArrowDown from "./icons/ArrowDown";
import ArrowUp from "./icons/ArrowUp";
import Minus from "./icons/Minus";
import Plus from "./icons/Plus";
// import Search from "./icons/Search";

const Transactions = () => {
  return (
    <div className="text-white/50 h-full overflow-y-">
      {/* <h3>Transactions</h3>
      <div className="flex gap-2 bg-white/5 px-4 py-2 rounded-lg">
        <Search />
        <div></div>
        <input
          type="search"
          placeholder="Search..."
          className="text-white/50 bg-transparent outline-0 border-0"
        />
      </div> */}
      <div>
        <h3 className="py-3">November</h3>

        <div className="flex flex-col gap-3">
          <div className=" bg-white/5 flex gap-2 px-5 py-2 rounded-lg">
            <Plus />
            <div className="text-sm">
              <p className="text-white">11/11/2024 23:05</p>
              <p>7.43 LINK</p>
            </div>
          </div>
          <div className=" bg-white/5 flex gap-2 px-5 py-2 rounded-lg">
            <Minus />
            <div className="text-sm">
              <p className="text-white">11/11/2024 23:05</p>
              <p>7.43 ETH</p>
            </div>
          </div>
          <div className=" bg-white/5 flex gap-2 px-5 py-2 rounded-lg">
            <ArrowDown />
            <div className="text-sm">
              <p className="text-white">11/11/2024 23:05</p>
              <p>7.43 ETH</p>
            </div>
          </div>
          <div className=" bg-white/5 flex gap-2 px-5 py-2 rounded-lg">
            <ArrowUp />
            <div className="text-sm">
              <p className="text-white">11/11/2024 23:05</p>
              <p>7.43 ETH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
