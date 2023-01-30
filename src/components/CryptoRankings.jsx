import React, { useState, useEffect } from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getTrendingStart } from "../features/trendingSlice";

export const CryptoRankings = () => {
  const data = useSelector((state) => state.trending.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingStart());
  }, []);

  useEffect(() => {
    console.log(data, 'trending data');
  }, [data]);
  
  return (
    <div className="bg-white text-black rounded-md p-2 h-full">
      <h4 className="font-bold mb-6">Cryptocurrency by Market Cap</h4>
      <div className="border-b flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Tether</h4>
          <span>Mkt. Cap $192889</span>
        </div>
        <span className="flex align-middle text-[#4DAF0B]">
          <MdArrowDropUp size={30} /> 2%
        </span>
      </div>
    </div>
  );
};
