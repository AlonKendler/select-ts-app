import React, { useState, useMemo, useRef, useEffect } from "react";
import "./Select.scss";

interface Option {
  label: string;
  value: number;
}

type SelectProps = {
  isSearchable?: boolean;
  disabled?: boolean;
  classname?: string;
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
  onChange: (value: number[] | number | null) => void;
  value: number[] | number | null;
};

const Select: React.FC<SelectProps> = ({
  isSearchable = true,
  disabled = false,
  classname = "",
  options,
  multiple = false,
  placeholder = "Select...",
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusIndex, setFocusIndex] = useState(0);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRefs = useRef<(HTMLLabelElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "ArrowDown"
      ) {
        setIsOpen(true);
        event.preventDefault();
        setFocusIndex(0);
      }
    } else {
      if (event.key === "Escape") {
        setIsOpen(false);
      } else if (event.key === "ArrowDown") {
        setFocusIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === "ArrowUp") {
        setFocusIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
        );
      } else if (event.key === "Enter") {
        handleSelect(filteredOptions[focusIndex].value);
      }
    }
  };

  useEffect(() => {
    if (isOpen && optionsRefs.current[focusIndex]) {
      optionsRefs.current[focusIndex]!.focus();
    }
  }, [isOpen, focusIndex]);

  return (
    <div
      className={`select-container ${classname}`}
      ref={selectRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-disabled={disabled}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <div
        className={`select-header ${disabled ? "disabled" : ""}`}
        onClick={toggleOpen}
        aria-controls="select-listbox"
      >
        <div className="selected-options">
          {selectedValue.length > 0 ? (
            <>
              {multiple && (
                <span className="selected-count">
                  {selectedValue.length} selected
                </span>
              )}
              <div className="selected-badges">
                {selectedValue.map((optionValue) => (
                  <span key={optionValue} className="badge">
                    {
                      options.find((option) => option.value === optionValue)
                        ?.label
                    }
                    <button
                      className="remove-option"
                      onClick={(e) => {
                        e.preventDefault();
                        removeOption(optionValue);
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
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
        <div className="select-dropdown" id="select-listbox" role="listbox">
          {isSearchable && (
            <input
              type="text"
              className="search-input"
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              role="searchbox"
            />
          )}
          <div className="options-list">
            {filteredOptions.map((option, index) => (
              <label
                key={option.value}
                ref={(el) => (optionsRefs.current[index] = el)}
                tabIndex={-1}
                role="option"
                aria-selected={selectedValue.includes(option.value)}
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  checked={selectedValue.includes(option.value)}
                  onChange={() => handleSelect(option.value)}
                  disabled={disabled}
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
