# React Customizable Select Component

A lightweight, customizable, and accessible React select component built with TypeScript. This project demonstrates the implementation of a reusable select component along with a sample form showcasing its usage.

## Features

- Customizable single and multiple selection modes
- Checkbox support for multiple selections
- Placeholder text for empty selections
- "Select/Deselect All" functionality for multiple selection mode
- Built-in search/filter functionality
- Collapsible dropdown
- Keyboard navigation support
- Accessibility features with ARIA attributes
- No external UI dependencies

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AlonKendler/select-ts-app.git
   cd select-ts-app
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm start
   ```

## Usage

Here's a basic example of how to use the `Select` component:

```jsx
import React, { useState } from "react";
import Select from "./components/Select/Select";

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder="Select an option"
      multiple={false}
      isSearchable={true}
    />
  );
};

export default MyComponent;
```

### Props

| Prop         | Type                                                                                                   | Default     | Description                                        |
| ------------ | ------------------------------------------------------------------------------------------------------ | ----------- | -------------------------------------------------- |
| options      | Array<{ label: string, value: number }>                                                                | Required    | List of options to display                         |
| value        | number \| number[] \| null                                                                             | Required    | Selected value(s)                                  |
| onChange     | (value: number \| number[] \| null) => void                                                            | Required    | Change handler function                            |
| multiple     | boolean                                                                                                | false       | Enable multiple selection mode                     |
| placeholder  | string                                                                                                 | "Select..." | Placeholder text when no option is selected        |
| isSearchable | boolean                                                                                                | true        | Enable search/filter functionality                 |
| disabled     | boolean                                                                                                | false       | Disable the select component                       |
| classname    | string                                                                                                 | ""          | Additional CSS class name                          |
| renderOption | (option: Option) => React.ReactNode                                                                    | undefined   | Custom render function for options                 |
| renderValue  | (value: Option \| Option[]) => React.ReactNode                                                         | undefined   | Custom render function for selected value(s)       |
| customStyles | { container?: React.CSSProperties; option?: React.CSSProperties; selectedValue?: React.CSSProperties } | {}          | Custom styles for different parts of the component |

## Available Scripts

- **`npm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- **`npm test`**: Launches the test runner in interactive watch mode.
- **`npm run build`**: Builds the app for production to the `build` folder.
- **`npm run eject`**: Removes the single build dependency from your project.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
