import React from "react";
import { useState } from "react";
import Select from "./Select";
import "./App.css";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, selectedOptions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Select
        options={options}
        multiple={true}
        placeholder="Select Colors"
        value={selectedOptions}
        onChange={(value) => setSelectedOptions(value as number[])}
      />
      <Select
        options={options}
        multiple={false}
        placeholder="Select Colors"
        value={selectedOptions}
        onChange={(value) => setSelectedOptions(value as number[])}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
