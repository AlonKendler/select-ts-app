import React, { useState, useMemo } from "react";
import "./Select.scss";

interface Option {
  label: string;
  value: number;
}

type SelectProps = {
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
  onChange: (value: number[] | number | null) => void;
  value: number[] | number | null;
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
    () =>
      (multiple ? (value as number[]) : [value as number]).filter(
        (v) => v != null
      ),
    [multiple, value]
  );

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [options, searchTerm]
  );

  const handleSelect = (optionValue: number) => {
    if (multiple) {
      const newValue = selectedValue.includes(optionValue)
        ? selectedValue.filter((v) => v !== optionValue)
        : [...selectedValue, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleSelectAll = () => {
    if (multiple) {
      onChange(filteredOptions.map((option) => option.value));
    }
  };

  const handleDeselectAll = () => {
    onChange(multiple ? [] : null);
  };

  const removeOption = (optionValue: number) => {
    if (multiple) {
      onChange(selectedValue.filter((v) => v !== optionValue));
    } else {
      onChange(null);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="select-container">
      <div className="select-header" onClick={toggleOpen}>
        <div className="selected-options">
          {selectedValue.length > 0 ? (
            <>
              {multiple && (
                <span className="selected-count">
                  {selectedValue.length} selected
                </span>
              )}
              {selectedValue.map((optionValue) => (
                <span key={optionValue} className="badge">
                  {
                    options.find((option) => option.value === optionValue)
                      ?.label
                  }
                  <button
                    className="remove-option"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(optionValue);
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </>
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>
        <div className="select-controls">
          {multiple && (
            <>
              <button
                className="control-button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleSelectAll();
                }}
                title="Select All"
              >
                ✓
              </button>
              <button
                className="control-button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDeselectAll();
                }}
                title="Deselect All"
              >
                ×
              </button>
            </>
          )}
          <span className="toggle-button">{isOpen ? "▲" : "▼"}</span>
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
            onClick={(e) => e.stopPropagation()}
          />
          <div className="options-list">
            {filteredOptions.map((option) => (
              <label key={option.value}>
                <input
                  type={multiple ? "checkbox" : "radio"}
                  checked={selectedValue.includes(option.value)}
                  onChange={() => handleSelect(option.value)}
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
