import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ options, onChange, placeholder, className }) => {
  return (
    <select
      className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#365b6d] ${className}`}
      onChange={(e) => onChange(e.target.value)}
      defaultValue=""
    >
      <option value="" disabled>
        {placeholder || 'Select an option'}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
