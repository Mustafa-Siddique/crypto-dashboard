import { useState } from "react";
import { Listbox } from "@headlessui/react";

const currencies = [
  { id: 1, name: "BTC", selected: false },
  { id: 2, name: "ETH", selected: false },
  { id: 3, name: "BNB", selected: false },
];

export const CurrencyDropdown = () => {
  // state for the input and the dropdown
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);

  // Dropdown for Sell
  function handleOptionChange(option) {
    if (selectedCurrencies.find((c) => c.id === option.id)) {
      setSelectedCurrencies(
        selectedCurrencies.filter((c) => c.id !== option.id)
      );
    } else {
      setSelectedCurrencies([...selectedCurrencies, option]);
    }
  }

  return (
    <Listbox
      value={selectedCurrencies}
      onChange={setSelectedCurrencies}
      multiple
    >
      <Listbox.Button>
        {selectedCurrencies.map((c) => c.name).join(", ")}
      </Listbox.Button>
      <Listbox.Options>
        {currencies.map((currency) => (
          <Listbox.Option
            key={currency.id}
            value={currency}
            onClick={() => handleOptionChange(currency)}
            selected={currency.selected}
          >
            {currency.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
