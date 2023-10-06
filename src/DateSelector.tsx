import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateSelectorProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Select a Date</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onChange(date)}
        dateFormat="yyyy-MM-dd"
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default DateSelector;
