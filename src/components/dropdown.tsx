import React, { Ref } from "react";
import Select from "react-select";

export interface DropdownOption {
  value: string;
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
    <div className="">
      <label htmlFor={name} className="">
        {label} {required ? "*" : null}
      </label>

      <Select
        classNamePrefix=""
        className=""
        styles={{
          option: () => ({}),
          control: () => ({}),
          singleValue: () => ({}),
          indicatorsContainer: () => ({}),
        }}
        value={selection}
        options={options.map(({ value, label }) => ({
          value,
          label,
        }))}
        isDisabled={disabled === true}
        onChange={onChange}
        ref={dropdownRef}
        openMenuOnFocus={openDropdownOnFocus}
        placeholder={dropdownPlaceholder}
        required={required}
      />
    </div>
  );
};
