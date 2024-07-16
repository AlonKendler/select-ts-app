import React, { useState } from "react";
import Select from "./Select";
import "./App.scss";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  { label: "Option 4", value: 4 },
  { label: "Option 5", value: 5 },
];

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMultiOptions, setSelectedMultiOptions] = useState<number[]>(
    []
  );
  const [selectedSingleOption, setSelectedSingleOption] = useState<
    number | null
  >(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, selectedMultiOptions, selectedSingleOption });
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
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
        placeholder="Select Multiple"
        value={selectedMultiOptions}
        onChange={(value) => setSelectedMultiOptions(value as number[])}
      />
      <Select
        options={options}
        multiple={false}
        placeholder="Select Single"
        value={selectedSingleOption}
        onChange={(value) => setSelectedSingleOption(value as number | null)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
