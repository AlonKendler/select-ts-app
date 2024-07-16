import React, { useState } from "react";
import "./App.scss";
import Select from "./components/Select/Select";

const generateOptions = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: i + 1,
  }));
};

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    singleSelect: null as number | null,
    multiSelect: [] as number[],
    largeSelect: [] as number[],
    customStyleSelect: [] as number[],
    disabledSelect: null as number | null,
  });

  const normalOptions = generateOptions(5);
  const largeOptions = generateOptions(30);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  // Custom option rendering
  const renderCustomOption = (option: { label: string; value: number }) => (
    <div style={{ display: "contents", alignItems: "center" }}>
      <span style={{ marginRight: "10px" }}>🔥</span>
      {option.label}
    </div>
  );

  // Custom styles
  const customStyles = {
    container: { border: "2px solid purple", borderRadius: "8px" },
    option: { color: "purple", fontWeight: "bold" as "bold" },
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <h1>Select Component Showcase</h1>

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <h2>Single Select (Default)</h2>
      <Select
        options={normalOptions}
        value={formData.singleSelect}
        onChange={(value) => handleChange("singleSelect", value)}
        placeholder="Choose one option"
      />

      <h2>Multiple Select with Search</h2>
      <Select
        options={normalOptions}
        multiple={true}
        isSearchable={true}
        value={formData.multiSelect}
        onChange={(value) => handleChange("multiSelect", value as number[])}
        placeholder="Choose multiple options"
      />

      <h2>Large Dataset with Multiple Select with Search</h2>
      <Select
        options={largeOptions}
        multiple={true}
        isSearchable={true}
        value={formData.largeSelect}
        onChange={(value) => handleChange("largeSelect", value as number[])}
        placeholder="Select from 100 options"
      />

      <h2>Custom Styling and Option Rendering</h2>
      <Select
        options={normalOptions}
        multiple={true}
        value={formData.customStyleSelect}
        onChange={(value) =>
          handleChange("customStyleSelect", value as number[])
        }
        placeholder="Custom styled select"
        renderOption={renderCustomOption}
        customStyles={customStyles}
      />

      <h2>Disabled Select</h2>
      <Select
        options={normalOptions}
        value={formData.disabledSelect}
        onChange={(value) => handleChange("disabledSelect", value)}
        placeholder="This select is disabled"
        disabled={true}
      />

      <button type="submit">Submit Form</button>
    </form>
  );
};

export default App;
