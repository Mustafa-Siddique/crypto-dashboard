import React, { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getChartStart, setDropDown } from "../features/chartSlice";

export const SearchArea = () => {
  const dispatch = useDispatch();

  const option = [{ name: "USD" }, { name: "INR" }];

  // Importing the chartSlice from the redux store
  const selectedCrypto = useSelector((state) => state.chart.dropdownAsset);
  const selectedTimeline = useSelector((state) => state.chart.dropdownTime);
  const selectedCurrency = useSelector((state) => state.chart.dropdownCurrency);

  // UseEffect to fetch the chart data
  useEffect(() => {
    dispatch(getChartStart({ asset: selectedCrypto, time: selectedTimeline, currency: selectedCurrency }))
  }, [selectedCurrency])
  
  return (
    <div className="flex justify-between">
      <Listbox
        value={selectedCurrency}
        onChange={(e) =>
          dispatch(
            setDropDown({ type: "currency", value: e.name.toLowerCase() })
          )
        }
      >
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
            <span className="block truncate">
              {selectedCurrency.toUpperCase()}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {option.map((currency, currencyIdx) => (
                <Listbox.Option
                  key={currencyIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-2 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={currency}
                >
                  {({ selectedCurrency }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selectedCurrency ? "font-medium" : "font-normal"
                        }`}
                      >
                        {currency.name}
                      </span>
                      {selectedCurrency ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <div className="flex bg-white rounded px-2 w-full ml-2 shadow-sm">
        <FaSearch size={26} className="mt-1 mr-1 text-slate-600" />
        <input
          placeholder="Search by coin"
          type="search"
          className="bg-transparent outline-none border-none px-2 w-full"
          name=""
          id=""
        />
      </div>
    </div>
  );
};
