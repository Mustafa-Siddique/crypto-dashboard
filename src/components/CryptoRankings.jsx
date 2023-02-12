import React, { useEffect } from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingStart } from "../features/trendingSlice";

export const CryptoRankings = () => {
  // Redux
  const data = useSelector((state) => state.trending.data);
  const dispatch = useDispatch();

  // Get trending data on page load
  useEffect(() => {
    dispatch(getTrendingStart());
  }, []);

  return (
    <div className="bg-white text-black rounded-md p-2 h-full">
      <h4 className="font-bold text-2xl mb-6">Cryptocurrency by Market Cap</h4>
      {data &&
        data.map((coin) => (
          <div className="border-b flex items-center mb-2 justify-between">
            <div className="flex items-center">
              <img src={coin.image} className="w-8 h-8 mr-2" alt="" />
              <div>
                <h4 className="font-semibold">{coin.name}</h4>
                <span>Mkt. Cap ${coin.market_cap}</span>
              </div>
            </div>
            {coin.price_change_percentage_24h > 0 ? (
              <span className="flex align-middle text-[#4DAF0B]">
                <MdArrowDropUp size={30} />{" "}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className="flex align-middle text-[#DB4530]">
                <MdArrowDropDown size={30} />{" "}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            )}
          </div>
        ))}
    </div>
  );
};
