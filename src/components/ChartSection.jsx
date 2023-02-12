import React, { Fragment, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { Listbox } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { Bar, Line } from "react-chartjs-2";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { getChartStart, setDropDown } from "../features/chartSlice";
import moment from "moment";

// Registering the chart.js plugins
ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const ChartSection = () => {
  const dispatch = useDispatch();

  // Importing the chartSlice from the redux store
  const selectedCrypto = useSelector((state) => state.chart.dropdownAsset);
  const selectedTimeline = useSelector((state) => state.chart.dropdownTime);
  const selectedCurrency = useSelector((state) => state.chart.dropdownCurrency);
  const chartData = useSelector((state) => state.chart.data);
  // console.log("Chart Data: ", chartData.prices.item[0]);

  // Asset Selector
  const crypto = [
    { name: "BITCOIN" },
    { name: "ETHEREUM" },
    { name: "BINANCECOIN" },
    { name: "SOLANA" },
  ];

  // Dropdown Selector 2
  const chartType = [{ name: "Area" }, { name: "Bar" }, { name: "Line" }];
  const [selected2, setSelected2] = useState(chartType[0]);

  // Chart Timeline Selector
  const timeline = [
    { name: "1D", value: "1" },
    { name: "1W", value: "7" },
    { name: "1M", value: "30" },
    { name: "1Y", value: "365" },
  ];

  // UseEffect to fetch the chart data on page load
  useEffect(() => {
    dispatch(
      getChartStart({
        asset: selectedCrypto,
        time: selectedTimeline,
        currency: selectedCurrency,
      })
    );
  }, []);

  // UseEffect to dispatch the chart data to redux
  useEffect(() => {
    dispatch(
      getChartStart({
        asset: selectedCrypto,
        time: selectedTimeline,
        currency: selectedCurrency,
      })
    );
  }, [selectedCrypto, selectedTimeline]);

  // Function to dispatch timeline to redux on click of button
  const handleTimeline = (e) => {
    dispatch(setDropDown({ type: "time", value: e.value }));
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "none",
      },
      title: {
        display: true,
        text: selectedCrypto.toUpperCase(),
      },
    },
  };

  // Converting epoch time to date using moment
  const labels = chartData.prices
    ? chartData.prices.map((item) =>
        moment(item[0]).format(selectedTimeline < 2 ? "LT" : "MMM Do YY")
      )
    : ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        fill: selected2.name === "Area",
        // converting epoch time to date using moment
        data: chartData.prices
          ? chartData.prices.map((item) => item[1])
          : [0, 10, 5, 2, 20, 30, 45],
        borderColor: "#F59E0B",
        backgroundColor: "#FEF2C7",
      },
    ],
  };

  return (
    <div className="bg-white rounded my-3 p-4">
      <div className="flex justify-between flex-col md:flex-row">
        <div>
          {timeline.map((item) => (
            <button
              key={item.name}
              onClick={() => handleTimeline(item)}
              className={
                selectedTimeline === item.value
                  ? "border-amber-500 bg-amber-100 border rounded-lg p-3 mx-2"
                  : "border rounded-lg p-3 mx-2"
              }
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex mt-4 md:mt-0">
          {/* Dropdown Selector 1 */}
          <Listbox
            value={selectedCrypto}
            onChange={(e) =>
              dispatch(setDropDown({ type: "asset", value: e.toLowerCase() }))
            }
          >
            <div className="relative mr-2">
              <Listbox.Button className="relative w-full cursor-default rounded-lg py-3 border pl-3 pr-10 text-left shadow-md sm:text-sm">
                <span className="block font-semibold truncate">
                  {selectedCrypto.toUpperCase()}
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
                  {crypto.map((asset, assetIdx) => (
                    <Listbox.Option
                      key={assetIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-2 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={asset.name}
                    >
                      {({ selectedCrypto }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selectedCrypto ? "font-medium" : "font-normal"
                            }`}
                          >
                            {asset.name}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          {/* Dropdown Selector 2 */}
          <Listbox value={selected2} onChange={setSelected2}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg py-3 border pl-3 pr-10 text-left shadow-md sm:text-sm">
                <span className="block font-semibold truncate">
                  {selected2.name}
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
                  {chartType.map((person, personIdx) => (
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
                      {({ selected2 }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected2 ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected2 ? (
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
        </div>
      </div>
      {/* Chart Here! */}
      {selected2.name === "Area" ? (
        <Line data={data} options={options} />
      ) : selected2.name === "Bar" ? (
        <Bar data={data} options={options} />
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
};
