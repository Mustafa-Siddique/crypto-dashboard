import React, { useState, useEffect } from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const CryptoRankings = () => {

  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTrending();
  }, []);

  const getTrending = async () => {
     
     let reqOptions = {
       url: "https://api.coingecko.com/api/v3/search/trending",
       method: "GET",
     }
     
     let response = await axios.request(reqOptions);
     setData(response.data);
     console.log(response.data)
     dispatch(getTrending(response.data));
  }
  console.log(data)
  

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
