import { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";

interface Contact {
  name: string;
  address: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [newContact, setNewContact] = useState<Contact>({ name: "", address: "" });

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const saveContactsToLocalStorage = (contacts: Contact[]) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.address) {
      alert("Please fill in both name and address fields.");
      return;
    }
    if (!newContact.address.startsWith("0x") || newContact.address.length !== 42) {
      alert("Please enter a valid public address.");
      return;
    }

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    saveContactsToLocalStorage(updatedContacts);
    setNewContact({ name: "", address: "" });
    setIsAddContactModalOpen(false);
  };

  const handleDeleteContact = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    saveContactsToLocalStorage(updatedContacts);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsAddContactModalOpen(true)}
      >
        Add Contact
      </button>

      <div className="flex flex-col gap-4">
        {contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <div
              key={index + 1}
              className="bg-gray-700 p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold text-lg">{contact.name}</h2>
                <p className="text-gray-400 text-sm">{contact.address}</p>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteContact(index)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No contacts saved yet.</p>
        )}
      </div>

      {/* Add Contact Modal */}
      {isAddContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-md w-[90%] md:w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Contact</h2>
              <RiCloseLine
                className="cursor-pointer text-2xl text-white"
                onClick={() => setIsAddContactModalOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
                className="p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder="Public Address (0x...)"
                value={newContact.address}
                onChange={(e) =>
                  setNewContact({ ...newContact, address: e.target.value })
                }
                className="p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsAddContactModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddContact}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
