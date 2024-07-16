import React, { useState } from "react";
import "./App.scss";
import Select from "./components/Select/Select";

/* generateOptions creates mocks like:
const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  { label: "Option 4", value: 4 },
  { label: "Option 5", value: 5 },
];
*/

const generateOptions = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: i + 1,
  }));
};

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMultiOptions, setSelectedMultiOptions] = useState<number[]>(
    []
  );
  const [selectedSingleOption, setSelectedSingleOption] = useState<
    number | null
  >(null);
  const [selectedLargeSingleOption, setSelectedLargeSingleOption] = useState<
    number | null
  >(null);
  const [selectedLargeOptions, setSelectedLargeOptions] = useState<number[]>(
    []
  );
  const [selectedEmptyOptions, setSelectedEmptyOptions] = useState<number[]>(
    []
  );

  const normalOptions = generateOptions(5);
  const largeOptions = generateOptions(100);
  const emptyOptions: { label: string; value: number }[] = [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      name,
      email,
      selectedMultiOptions,
      selectedSingleOption,
      selectedLargeOptions,
      selectedLargeSingleOption,
      selectedEmptyOptions,
    });
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
        options={normalOptions}
        multiple={true}
        placeholder="Select Multiple (Normal)"
        value={selectedMultiOptions}
        onChange={(value) => setSelectedMultiOptions(value as number[])}
        isSearchable={true}
        disabled={false}
        classname="normal-multi-select"
      />
      <Select
        options={normalOptions}
        multiple={false}
        placeholder="Select Single (Normal)"
        value={selectedSingleOption}
        onChange={(value) => setSelectedSingleOption(value as number | null)}
        isSearchable={true}
        disabled={false}
        classname="normal-single-select"
      />
      <Select
        options={largeOptions}
        multiple={true}
        placeholder="Select Multiple (Large)"
        value={selectedLargeOptions}
        onChange={(value) => setSelectedLargeOptions(value as number[])}
        isSearchable={true}
        disabled={false}
        classname="large-multi-select"
      />
      <Select
        options={largeOptions}
        multiple={false}
        placeholder="Select Single (Large)"
        value={selectedLargeSingleOption}
        onChange={(value) =>
          setSelectedLargeSingleOption(value as number | null)
        }
        isSearchable={false}
        disabled={false}
        classname="large-single-select"
      />
      <Select
        options={emptyOptions}
        multiple={true}
        placeholder="Select (Empty)"
        value={selectedEmptyOptions}
        onChange={(value) => setSelectedEmptyOptions(value as number[])}
        isSearchable={true}
        disabled={true}
        classname="empty-multi-select"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
