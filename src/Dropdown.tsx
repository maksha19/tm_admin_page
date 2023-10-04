import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Select an option</label>
      <select
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        value={selectedOption || ''}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Select --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
