import React, { useState, useMemo } from "react";
import "./Select.scss";

interface Option {
  id: number;
  label: string;
}

type SelectProps = {
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
  onChange: (value: number[] | number) => void;
  value: number[] | number;
};

const Select: React.FC<SelectProps> = ({
  options,
  multiple = false,
  placeholder = "Select...",
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedValue = useMemo(
    () => (multiple ? (value as number[]) : [value as number]),
    [multiple, value]
  );

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [options, searchTerm]
  );

  const handleSelect = (optionId: number) => {
    if (multiple) {
      const newValue = selectedValue.includes(optionId)
        ? selectedValue.filter((id) => id !== optionId)
        : [...selectedValue, optionId];
      onChange(newValue);
    } else {
      onChange(optionId);
      setIsOpen(false);
    }
  };

  const handleSelectAll = () => {
    if (multiple) {
      onChange(filteredOptions.map((option) => option.id));
    }
  };

  const handleDeselectAll = () => {
    if (multiple) {
      onChange([]);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="select-container">
      <div className="select-header">
        <div className="selected-options">
          {selectedValue.length > 0 ? (
            selectedValue.map((optionId) => (
              <span key={optionId} className="badge">
                {options.find((option) => option.id === optionId)?.label}
              </span>
            ))
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>
        <div className="select-controls">
          {multiple && (
            <>
              <button
                className="control-button"
                onClick={handleSelectAll}
                title="Select All"
              >
                ✓
              </button>
              <button
                className="control-button"
                onClick={handleDeselectAll}
                title="Deselect All"
              >
                ×
              </button>
            </>
          )}
          <button
            className={`toggle-button ${isOpen ? "open" : ""}`}
            onClick={toggleOpen}
          >
            {isOpen ? "▲" : "▼"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="select-dropdown">
          <input
            type="text"
            className="search-input"
            placeholder="Search options..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="options-list">
            {filteredOptions.map((option) => (
              <label key={option.id}>
                <input
                  type={multiple ? "checkbox" : "radio"}
                  checked={selectedValue.includes(option.id)}
                  onChange={() => handleSelect(option.id)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
