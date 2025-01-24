import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import nftImage1 from "../assets/Token.jpeg"

import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  id: string;
  // label: string;
  imageSrc: string; 
}

interface DropdownProps {
  items: DropdownItem[];
  onSelect: (id: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="mt-5">
      <button onClick={handleToggle} className="text-white text-sm font-poppins font-semibold">
        My NFT
        {isOpen ? <MdOutlineKeyboardArrowUp className="inline text-lg"/> : <MdOutlineKeyboardArrowDown className="inline text-lg"/>}
      </button>

      {isOpen && (
        <div className="mt-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelect(item.id);
                setIsOpen(false);
              }}
            >
              <img src={item.imageSrc} width={40} height={40} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


const NFT: React.FC = () => {
  const items = [
    { id: '2', imageSrc: nftImage1 },
  ];

  const handleSelect = (id: string) => {
    console.log(`Selected item ID: ${id}`);
  };

  return (
    <div>
      <Dropdown items={items} onSelect={handleSelect} />
    </div>
  );
};

export default NFT;
