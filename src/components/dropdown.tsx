import React, { Ref } from "react";
import Select from "react-select";

export interface DropdownOption {
  value: string | number;
  label: string;
}

type TDropdownProps = {
  label: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  options: DropdownOption[];
  selection?: DropdownOption | null;
  dropdownPlaceholder?: string | undefined;
  dropdownRef?: Ref<any> | null;
  onChange?: (val: DropdownOption | null) => void;
  openDropdownOnFocus?: boolean;
};

const Dropdown: React.FC<TDropdownProps> = ({
  label,
  required = false,
  disabled = false,
  name,
  options,
  dropdownPlaceholder,
  dropdownRef = null,
  onChange,
  selection,
  openDropdownOnFocus = false,
}) => {
  return (
    <div className="my-4">
      <label htmlFor={name} className="italic">
        {label} {required ? "*" : null}
      </label>
      
      <Select
        classNamePrefix="custom-select"
        classNames={{
          container: () => `mt-2`,
          singleValue: () => `!text-white`,
          control: ({isFocused}) => `!bg-transparent rounded-md ${isFocused ? "border-gray-500" : "border-gray-300"}`
        }}
        value={selection}
        options={options.map(({ value, label }) => ({
          value,
          label,
        }))}
        isDisabled={disabled}
        onChange={onChange}
        ref={dropdownRef}
        openMenuOnFocus={openDropdownOnFocus}
        placeholder={dropdownPlaceholder}
        required={required}
        isSearchable={false}
      />
    </div>
  );
};

export default Dropdown;
