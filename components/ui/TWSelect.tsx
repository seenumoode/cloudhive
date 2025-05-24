"use client";

import { FC, SelectHTMLAttributes, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface TWSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

const TWSelect: FC<TWSelectProps> = ({
  options,
  placeholder,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <select
        className={`
          w-full px-4 py-2 border rounded-lg bg-white text-gray-800
          appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500
          ${isFocused || props.value ? "" : "text-gray-500"}
          ${className}
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
};

export default TWSelect;
