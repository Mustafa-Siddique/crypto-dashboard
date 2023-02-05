import React, { Fragment, useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Listbox, Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { getExchangeStart } from "../features/exchangeSlice";
import { RiSwapLine } from "react-icons/ri";

export const Exchange = () => {
  const [inputData, setInputData] = useState(0);
  const data = useSelector((state) => state.exchange.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExchangeStart());
  }, []);

  //   useEffect(() => {
  //     console.log("Exchange: ", data.bitcoin.eth);
  //   }, [data]);

  // Dropdown for Sell
  const option = [{ name: "BTC" }, { name: "ETH" }];
  const [selected, setSelected] = useState(option[0]);

  //   converting selected valueof btc to eth
  const btcToEth = (input) => {
    if (!data || !data.bitcoin) {
      return null;
    }
    if (selected.name === "BTC") {
      return input * data.bitcoin.eth;
    } else {
      return input / data.bitcoin.eth;
    }
  };

  return (
    <div className="bg-white p-4 rounded h-full">
      <h4 className="text-xl font-semibold">Exchange Coins</h4>

      {/* Sell */}
      <div className="flex justify-between mt-12 w-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-red-400 mr-2">SELL</p>
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
                <span className="block truncate">{selected.name}</span>
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
                <Listbox.Options className="absolute bottom-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {option.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-2 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
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
          <input
            type="number"
            id=""
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="border rounded py-2 text-black font-semibold focus:outline-none px-2"
            placeholder="Enter Value"
          />
        </div>
      </div>

      {/* BUY */}
      <div className="flex justify-between mt-6 w-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-green-400 mr-2">BUY</p>
          <Listbox value={selected} disabled onChange={setSelected}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-200 py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
                <span className="block truncate">
                  {selected.name.includes("BTC") === true ? "ETH" : "BTC"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
            </div>
          </Listbox>
          <input
            type="number"
            id=""
            disabled
            value={btcToEth(inputData)}
            className="border rounded py-2 text-black font-semibold focus:outline-none px-2"
            placeholder="Enter Value"
          />
        </div>
      </div>
      <button
        className="bg-amber-300 py-1 px-3 rounded font-semibold hover:bg-amber-500 hover:text-white mt-6"
        onClick={btcToEth(inputData)}
      >
        Exchange <RiSwapLine className="inline-block" size={24} />
      </button>
      <p className="text-gray-400 mt-2">
        1 BTC = {!data || !data.bitcoin ? "Loading..." : data.bitcoin.eth} ETH
      </p>
    </div>
  );
};
