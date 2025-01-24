import ArrowDown from "./icons/ArrowDown";
import ArrowUp from "./icons/ArrowUp";
// import Minus from "./icons/Minus";
// import Plus from "./icons/Plus";
// import Search from "./icons/Search";
import { getTransactionHistory } from "../utils/utils";
import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string | null;
  value: number | null;
  currency: string | null;
  txnType: string;
}

const Transactions: React.FC = () => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const fetchedTransactions = await getTransactionHistory();
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);


  const renderTransactions = () => {
    return transactions.map((tx) => (
      <div key={tx.hash}>
          <div className=" bg-white/5 flex gap-2 px-5 py-3 rounded-lg mb-3">
            <div>
              {tx.txnType === "send" ? <ArrowUp /> : <ArrowDown />}
            </div>
            <div className="text-sm self-center">
              <p className="text-white">{}</p>
              <p className="text-white">{}</p>
              <p><span>{tx.value}</span> {tx.currency}</p>
            </div>
          </div>
      </div>
    ));
  };

  return (
    <div className="text-white/50 h-full overflow-y">
      <div>
        <div className="transactions-page p-4">
          {loading ? (
            <p>Loading activity...</p>
          ) : transactions.length > 0 ? (
            renderTransactions()
          ) : (
            <p className="text-center py-4">No activity yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
