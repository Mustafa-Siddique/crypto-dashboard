import React from "react";
import { ChartSection } from "./ChartSection";
import { CryptoRankings } from "./CryptoRankings";
import { SearchArea } from "./SearchArea";

export const Body = () => {
  return (
    <div className="container mx-auto bg-slate-100 rounded-lg mt-12">
      <div className="flex flex-col p-4 lg:flex-row">
        <div className="w-full md:w-8/12 flex-5 px-2">
          <SearchArea />
          <ChartSection/>
        </div>
        <div className="w-full md:w-4/12">
          <CryptoRankings />
        </div>
      </div>
    </div>
  );
};
