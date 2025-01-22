import React, { useEffect, useState } from "react";
import { getContacts, getPrivateKey, getSelectedNetworkConfig, sendEther } from "../utils/utils";
import { RiCloseLine } from "react-icons/ri";
import AccountIcon from "../assets/Account icon.png";
import ethIcon from "../assets/ETH stroke icon.png";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const SendModal: React.FC<SendModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
}) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("ETH"); // Default token
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!recipient || !amount) {
      setMessage("Please enter recipient address and amount.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      console.log('we got here')
      // const selectedNetwork =
      //   localStorage.getItem("selectedNetwork") ?? "sepolia";
      // const networks: { [key: string]: { rpcUrl: string; chainId: number } } = {
      //   sepolia: {
      //     rpcUrl:
      //       "https://sepolia.infura.io/v3/1cef973dff844ba09dea342050cd5967",
      //     chainId: 11155111,
      //   },
      // };
      const network = getSelectedNetworkConfig();
      if (!network) throw new Error("Network configuration missing!");

      const providerUrl = network.rpcUrl;
      const chainId = network.chainId;
      console.log(providerUrl, chainId, "providerUrl, chainId");

      const privateKey = await getPrivateKey();
      console.log(privateKey, "tis good")

      const transaction = await sendEther(
        privateKey,
        recipient,
        amount,
        chainId,
        providerUrl,
        // token // Pass the token type
      );
      setMessage(`Transaction successful! Hash: ${transaction.hash}`);
    } catch (error) {
      console.error(error);
      setMessage("Failed to send transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="text-sm fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="w-[90%] md:w-[400px] p-6 rounded bg-[#252525]">
        <div className="flex items-center mb-6">
          <RiCloseLine
            className="cursor-pointer text-xl bg-[#D9D9D9] rounded-full mr-3"
            onClick={onClose}
          />
          <h2 className="text-lg text-white font-bold">Send</h2>
        </div>
        <div className="text-white">
          <h2 className="mb-2">From</h2>
          <div className="flex rounded-lg justify-between bg-[#363636] p-2">
            <img
              src={AccountIcon}
              alt="homeicon"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-white mr-24">
              <p>Account</p>
              <p className="text-[13px] truncate">{walletAddress}</p>
            </div>
          </div>
        </div>

        <div className="text-white mt-8">
          <h2 className="mb-2">To</h2>
          <input
            type="text"
            placeholder="Enter recipient address (0x...)"
            className="bg-transparent border p-2 rounded-md border-border w-full placeholder:text-sm"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div className="text-white mt-4">
          <h2 className="mb-2">Token</h2>
          <select
            className="bg-transparent border p-2 rounded-md border-border w-full text-white"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          >
            <option value="ETH">ETH</option>
            {/* Add more tokens if supported */}
          </select>
        </div>

        <div className="text-white mt-4">
          <h2 className="mb-2">Amount</h2>
          <input
            type="number"
            placeholder="Enter amount"
            className="bg-transparent border p-2 rounded-md border-border w-full placeholder:text-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mt-6 text-center text-red-500">{message}</div>

        <div className="mt-10 flex justify-around">
          <button
            className="text-violet-500 border border-border rounded-full p-3 px-11 hover:bg-[#363636]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`text-violet-500 border border-border rounded-full p-3 px-11 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#363636] hover:bg-gray-700"
            }`}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendModal;

// import React, { useEffect, useState } from "react";
// import { getContacts, getPrivateKey, sendEther } from "../utils/utils";
// import { RiCloseLine } from "react-icons/ri";
// import { IoIosArrowDown } from "react-icons/io";
// import AccountIcon from "../assets/Account icon.png";
// import ethIcon from "../assets/ETH stroke icon.png";
// import { useNavigate } from "react-router-dom";

// interface SendModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   walletAddress: string;
// }
// const SendModal: React.FC<SendModalProps> = ({
//   isOpen,
//   onClose,
//   walletAddress,
// }) => {

// const navigate = useNavigate();

//   console.log(walletAddress, "walletAddress"); //for now we are just testing with one walletAddress, we have to use this to store privatekeys
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false); // not used!
//   const [message, setMessage] = useState(""); // not used!
//   const [activeTab, setActiveTa] = useState("account");
//   const [contacts, setContacts] = useState<{ name: string; address: string }[]>(
//     []
//   );
//   const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
//   const [newContact, setNewContact] = useState<{ name: string; address: string }>({
//     name: "",
//     address: "",
//   });

//   useEffect(() => {
//     const contactsList = getContacts();
//     setContacts(contactsList);
//   }, []);

//   const handleSend = async () => {
//     onClose()
//     console.log(recipient, amount, "recipient, amount");
//     if (!recipient || !amount) {
//       setMessage("Recipient address and amount are required.");
//       (() => navigate(`/view-balance?address=${walletAddress}`))();
//       return;
//     }

//     setLoading(true);
//     setMessage("");
//     try {
//       const selectedNetwork =
//         localStorage.getItem("selectedNetwork") ?? "mainnet";
//       console.log(selectedNetwork, "selectednet");
//       const networks: { [key: string]: { rpcUrl: string; chainId: number } } = {
//         // mainnet: {
//         //   rpcUrl: "https://mainnet.infura.io/v3/1cef973dff844ba09dea342050cd5967",
//         //   chainId: 1,
//         // },
//         sepolia: {
//           rpcUrl:
//             "https://sepolia.infura.io/v3/1cef973dff844ba09dea342050cd5967",
//           chainId: 11155111,
//         },
//         // Add other networks here...
//       };
//       const network = networks[selectedNetwork as keyof typeof networks];
//       console.log(network, "network");
//       if (!network) throw new Error("Network configuration missing!");

//       const providerUrl = network.rpcUrl;
//       const chainId = network.chainId;

//       // Retrieve the encrypted private key from storage and decrypt it
//       const privateKey = await getPrivateKey();

//       const transaction = await sendEther(
//         privateKey, // Replace with private key in backend for security
//         recipient,
//         amount,
//         chainId,
//         providerUrl
//       );
//       setMessage(`Transaction successful! Hash: ${transaction.hash}`);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to send transaction. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddContact = () => {
//     if (!newContact.name || !newContact.address) {
//       alert("Please fill in both name and address fields.");
//       return;
//     }
//     if (!newContact.address.startsWith("0x") || newContact.address.length !== 42) {
//       alert("Please enter a valid public address.");
//       return;
//     }

//     const updatedContacts = [...contacts, newContact];
//     setContacts(updatedContacts);
//     localStorage.setItem("contacts", JSON.stringify(updatedContacts)); // Save to localStorage
//     setNewContact({ name: "", address: "" }); // Reset input fields
//     setIsAddContactModalOpen(false); // Close modal
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="text-sm fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
//       <div className=" w-[90%] md:w-[400px] p-6 rounded">
//         <div className="flex items-center mb-6">
//           <RiCloseLine
//             className="cursor-pointer text-xl  bg-[#D9D9D9] rounded-full mr-3"
//             onClick={onClose}
//           />
//           <h2 className="text-lg text-white font-bold">Send</h2>
//         </div>
//         <div className="text-white">
//           <h2 className="mb-2">From</h2>
//           <div className="flex rounded-lg justify-between bg-[#363636] p-2">
//             <img
//               src={AccountIcon}
//               alt="homeicon"
//               className="w-10 h-10 rounded-full "
//             />

//             <div className="text-white mr-24">
//               <p>Account 1</p>
//               <p className="text-[13px]">0xfdk2....dds323</p>
//             </div>
//             <IoIosArrowDown className="font-bold cursor-pointer text-base text-white ml-2" />
//           </div>
//         </div>
//         <div className="text-white mt-8 ">
//           <h2 className="mb-2">To</h2>
//           <div>
//             <input
//               type="text"
//               placeholder="Enter public address (0x) or domain name"
//               className="bg-transparent border p-2 rounded-md border-border w-full placeholder:text-sm"
//               value={recipient}
//               onChange={(e) => setRecipient(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="mt-4">
//           <header className="flex gap-6 cursor-pointer mb-3">
//             <p
//               className={`${activeTab === "account"
//                   ? "text-violet-500 border-b-2 border-violet-500"
//                   : "text-white"
//                 } px-3 pb-1.5`}
//               onClick={() => setActiveTa("account")}
//             >
//               Your account
//             </p>
//             <p
//               className={`${activeTab === "contact"
//                   ? "text-violet-500 border-b-2 border-violet-500 "
//                   : "text-white"
//                 } px-3 pb-1.5`}
//               onClick={() => setActiveTa("contact")}
//             >
//               {" "}
//               Contacts
//             </p>
//           </header>
//           {activeTab === "account" && (
//             <div className="flex flex-col gap-2">
//               <div className="flex rounded-lg justify-around p-2 hover:border hover:bg-gray-800">
//                 <div className="flex gap-3">
//                   <img
//                     src={AccountIcon}
//                     alt="homeicon"
//                     className="w-10 h-10 rounded-full "
//                   />

//                   <div className="text-white mr-24">
//                     <p>Account 1</p>
//                     <p className="text-[13px]">0xfdk2....dds323</p>
//                   </div>
//                 </div>

//                 <div className="text-white flex flex-col gap-1">
//                   <div className="flex gap-1">
//                     <div className="">$0.00</div>{" "}
//                     <div className="text-[10px] mt-[3px]">USD</div>
//                   </div>
//                   <div className="flex gap-1">
//                     <img src={ethIcon} alt="" className="h-[20px] w-[10px]" />{" "}
//                     <div className="text-sm">0 ETH</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex rounded-lg justify-around p-2 hover:border hover:bg-gray-800">
//                 <div className="flex gap-3">
//                   <img
//                     src={AccountIcon}
//                     alt="homeicon"
//                     className="w-10 h-10 rounded-full "
//                   />

//                   <div className="text-white mr-24">
//                     <p>Account 2</p>
//                     <p className="text-[13px]">0xfdk2....dds323</p>
//                   </div>
//                 </div>

//                 <div className="text-white flex flex-col gap-1">
//                   <div className="flex gap-1">
//                     <div className="">$0.00</div>{" "}
//                     <div className="text-[10px] mt-[3px]">USD</div>
//                   </div>
//                   <div className="flex gap-1">
//                     <img src={ethIcon} alt="" className="h-[20px] w-[10px]" />{" "}
//                     <div className="text-sm">0 ETH</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//           {activeTab === "contact" && (
//             <div className="flex flex-col gap-2">
//               {contacts.length > 0 ? (
//                 contacts.map((contact) => (
//                   <div
//                     key={contact.address}
//                     className="flex justify-between items-center p-2 border rounded hover:bg-gray-700 cursor-pointer"
//                     onClick={() => {
//                       setRecipient(contact.address); // Set the recipient address
//                       setActiveTa("account"); // Optionally switch back to the "Your account" tab
//                     }}
//                   >
//                     <div>
//                       <p className="text-white font-semibold">{contact.name}</p>
//                       <p className="text-gray-400 text-sm">{contact.address}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-400">No contacts available.</p>
//               )}
//               <button
//                 className="bg-blue-500 text-white px-3 py-1 rounded mt-4"
//                 onClick={() => setIsAddContactModalOpen(true)}
//               >
//                 Add Contact
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="mt-10 flex justify-around">
//           <button className="text-violet-500 border border-border rounded-full p-3 px-11 hover:bg-[#363636]">
//             Cancel
//           </button>
//           <button
//   className={`text-violet-500 border border-border rounded-full p-3 px-11 ${
//     loading ? "bg-gray-600 cursor-not-allowed" : "bg-[#363636] hover:bg-gray-700"
//   }`}
//   onClick={handleSend}
//   disabled={loading} // Disable the button while loading
// >
//   {loading ? "Sending..." : "Continue"} 
// </button>
//         </div>
//       </div>
//       {isAddContactModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-6 rounded shadow-md w-[90%] md:w-[400px]">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Add Contact</h2>
//               <RiCloseLine
//                 className="cursor-pointer text-2xl text-white"
//                 onClick={() => setIsAddContactModalOpen(false)}
//               />
//             </div>

//             <div className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={newContact.name}
//                 onChange={(e) =>
//                   setNewContact({ ...newContact, name: e.target.value })
//                 }
//                 className="p-2 rounded bg-gray-700 text-white"
//               />
//               <input
//                 type="text"
//                 placeholder="Public Address (0x...)"
//                 value={newContact.address}
//                 onChange={(e) =>
//                   setNewContact({ ...newContact, address: e.target.value })
//                 }
//                 className="p-2 rounded bg-gray-700 text-white"
//               />
//             </div>

//             <div className="flex justify-end gap-4 mt-4">
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//                 onClick={() => setIsAddContactModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={handleAddContact}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SendModal;
