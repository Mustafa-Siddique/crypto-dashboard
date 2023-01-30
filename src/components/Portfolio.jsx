import React from "react";
import { PiePortfolio } from "./PiePortfolio";

export const Portfolio = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between">
        <span className="text-xl font-semibold">Portfolio</span>
        <span className="text-gray-500">
          Total Value: <span className="text-black font-semibold">$1000</span>
        </span>
      </div>
      <PiePortfolio />
    </div>
  );
};
