import React, { useState } from "react";

interface Option {
  label: string;
  value: number;
}

type SelectProps = {
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
  onChange: (value: number[] | number) => void;
  filterText?: string;
  value: number[] | number;
};

const Select: React.FC<SelectProps> = ({
  options,
  multiple = false,
  placeholder = "Select...",
  onChange,
  filterText,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialSelectedValue = multiple ? [] : "";
  const [selectedValue, setSelectedValue] = useState<number[] | number>(value);

  const handleSelect = (option: Option) => {
    if (multiple) {
      const newValue = selectedValue as number[];
      const index = newValue.indexOf(option.value);
      if (index !== -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(option.value);
      }
      setSelectedValue([...newValue]);
      onChange([...newValue]);
    } else {
      setSelectedValue(option.value);
      onChange(option.value);
    }
  };

  const handleSelectAll = () => {
    if (multiple) {
      const allValues = options.map((option) => option.value);
      setSelectedValue(allValues);
      onChange(allValues);
    }
  };

  const handleDeselectAll = () => {
    if (multiple) {
      setSelectedValue([]);
      onChange([]);
    }
  };

  const filteredOptions = options.filter((option) =>
    filterText
      ? option.label.toLowerCase().includes(filterText.toLowerCase())
      : true
  );

  const isSelected = (option: Option) =>
    multiple
      ? (selectedValue as number[]).includes(option.value)
      : selectedValue === option.value;

  const toggleOpen = () => setIsOpen(!isOpen);

  const renderOption = (option: Option) => (
    <label key={option.value}>
      <input
        type={multiple ? "checkbox" : "radio"}
        checked={isSelected(option)}
        onChange={() => handleSelect(option)}
      />
      {option.label}
    </label>
  );

  const renderSelectAll = () => (
    <div>
      <button type="button" onClick={handleSelectAll}>
        Select All
      </button>
      <button type="button" onClick={handleDeselectAll}>
        Deselect All
      </button>
    </div>
  );

  return (
    <div className="select-container">
      <button type="button" onClick={toggleOpen}>
        {multiple
          ? `${(selectedValue as number[]).length} selected`
          : options.find((option) => option.value === selectedValue)?.label ||
            placeholder}
      </button>
      {isOpen && (
        <div className="select-dropdown">
          {multiple && renderSelectAll()}
          {filterText && (
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onChange(e.target.value as any)}
            />
          )}
          {filteredOptions.map(renderOption)}
        </div>
      )}
    </div>
  );
};

export default Select;
