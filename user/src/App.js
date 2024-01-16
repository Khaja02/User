// src/App.js
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [allItems, setAllItems] = useState([
    { id: 1, profile: 'Profile 1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, profile: 'Profile 2', name: 'Jane Doe', email: 'jane.doe@example.com' },
    { id: 3, profile: 'Profile 3', name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 4, profile: 'Profile 4', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 5, profile: 'Profile 5', name: 'Charlie Brown', email: 'charlie.brown@example.com' },
    { id: 6, profile: 'Profile 6', name: 'David Johnson', email: 'david.johnson@example.com' },
    { id: 7, profile: 'Profile 7', name: 'Emma White', email: 'emma.white@example.com' },
    { id: 8, profile: 'Profile 8', name: 'Frank Brown', email: 'frank.brown@example.com' },
    { id: 9, profile: 'Profile 9', name: 'Grace Smith', email: 'grace.smith@example.com' },
    { id: 10, profile: 'Profile 10', name: 'Henry Davis', email: 'henry.davis@example.com' },
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setAllItems(allItems.filter((i) => i.id !== item.id));
    setInputValue('');
  };

  const handleChipRemove = (chip) => {
    setSelectedItems(selectedItems.filter((c) => c.id !== chip.id));
    setAllItems([...allItems, chip]);
  };

  const handleBackspace = () => {
    if (inputValue === '' && selectedItems.length > 0) {
      const lastChip = selectedItems[selectedItems.length - 1];
      handleChipRemove(lastChip);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 mt-8">Users</h1>
      <div className="relative">
        <div className="flex items-center flex-wrap">
          {selectedItems.map((chip) => (
            <div
              key={chip.id}
              className="flex items-center px-3 py-1 m-1 bg-blue-500 text-white rounded-full"
            >
              {chip.name}
              <button className="ml-2 focus:outline-none" onClick={() => handleChipRemove(chip)}>
                X
              </button>
            </div>
          ))}
          <input
            type="text"
            className="flex-shrink-0 px-3 py-2 border-b-2 border-blue-500 outline-none focus:border-blue-700"
            placeholder={selectedItems.length > 0 ? '' : 'Type to filter'}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Backspace' && handleBackspace()}
          />
        </div>
        <Transition
          show={selectedItems.length > 0}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute top-full left-0 z-10 mt-2 w-full">
        
          </div>
        </Transition>
      </div>

      <div className="overflow-y-auto max-h-40">
        <ul className="mt-4">
          {allItems
            .filter((item) =>
              `${item.profile} ${item.name} ${item.email}`
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            )
            .map((item) => (
              <li
                key={item.id}
                className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                onClick={() => handleItemClick(item)}
              >
                {item.name} ({item.email})
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
