import React from "react";
import { ChartSection } from "./ChartSection";
import { CryptoRankings } from "./CryptoRankings";
import { Exchange } from "./Exchange";
import { Portfolio } from "./Portfolio";
import { SearchArea } from "./SearchArea";

export const Body = () => {
  return (
    <div className="container mx-auto bg-slate-100 rounded-lg lg:mt-12">
      <div className="flex flex-col p-4 lg:flex-row">
        <div className="w-full lg:w-8/12 flex-5 lg:px-2">
          <div>
            <SearchArea />
            <ChartSection />
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full max-h-[350px] lg:w-6/12">
              <Portfolio/>
            </div>
            <div className="w-full max-h-[350px] pl-0 lg:pl-2 lg:w-6/12">
              <Exchange/>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 lg:mt-0 lg:w-4/12">
          <CryptoRankings />
        </div>
      </div>
    </div>
  );
};
