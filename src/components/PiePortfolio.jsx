import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Web3 from "web3";
import { useSelector } from "react-redux";
import { contractABI } from "../web3/contractABI";

export const PiePortfolio = () => {
  // State for assets
  const [assets, setAssets] = useState([]);

  // Get wallet from redux
  const wallet = useSelector((state) => state.wallet.data);

  // Calling getAsset function on wallet change
  useEffect(() => {
    getAssets();
  }, [wallet]);

  // Get the assets from the user's wallet
  const getAssets = async () => {
    const web3 = new Web3(window.ethereum);
    try {
      // Get the balance of each asset in the contract array
      const contractArray = [
        {
          address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
          name: "BUSD",
        },
        {
          address: "0x156ab3346823B651294766e23e6Cf87254d68962",
          name: "LUNA",
        },
        {
          address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
          name: "ADA",
        },
        {
          address: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
          name: "MATIC",
        },
        {
          address: "0x749f031FDa3a4904b026f2275A697096492a129d",
          name: "BETS",
        },
      ];
      const _assets = {};
      // Loop and get the balance of each asset
      for (let token of contractArray) {
        const contract = new web3.eth.Contract(contractABI, token.address);
        const tokenBalance = await contract.methods.balanceOf(wallet).call();
        _assets[token.name] = web3.utils.fromWei(tokenBalance, "ether");
      }
      setAssets(_assets);
    } catch (error) {
      console.error(error);
    }
  };

  // ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    // Setting the labels from the assets object
    labels:
      wallet.length > 1
        ? Object.keys(assets)
        : ["LUNA", "MATIC", "BETS", "BUSD", "ADA"],
    datasets: [
      {
        label: "Assets in Wallet",
        data: wallet.length > 1 ? Object.values(assets) : [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Pie
        data={data}
        height="275px"
        width="275px"
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: wallet.length > 1 ? "Altcoins" : "Connect Your Wallet to Get Balance",
            },
          },
        }}
      />
    </div>
  );
};
