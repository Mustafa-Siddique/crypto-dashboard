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
        "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        "0x156ab3346823B651294766e23e6Cf87254d68962",
        "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
        "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
        '0x749f031FDa3a4904b026f2275A697096492a129d'
      ];
      for (let tokenAddress of contractArray) {
        const contract = new web3.eth.Contract(contractABI, tokenAddress);
        const tokenBalance = await contract.methods.balanceOf(wallet).call();
        console.log(`Token Balance of ${tokenAddress}:` ,web3.utils.fromWei(tokenBalance, "ether"));  
    }
      // contractArray.forEach(async (contractAddress) => {
      //   const balance = await web3.eth.getBalance(contractAddress, wallet);
      //   if (balance > 0) {
      //     setAssets((prevAssets) => [
      //       ...prevAssets,
      //       { contractAddress, balance },
      //     ]);
      //   }
      // });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(assets);

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
              display: false,
              text: "Portfolio",
            },
          },
        }}
      />
    </div>
  );
};
