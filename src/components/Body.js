import React from "react";
import { CryptoRankings } from "./CryptoRankings";
import { SearchArea } from "./SearchArea";

export const Body = () => {
  return (
    <div className="container mx-auto dark:bg-slate-200 rounded-lg dark:text-white mt-12">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SearchArea />
        </div>
        <div className="col-span-1 p-2">
          <CryptoRankings />
        </div>
      </div>
    </div>
  );
};
