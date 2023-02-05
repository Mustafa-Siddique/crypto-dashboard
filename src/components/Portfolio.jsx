import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { PiePortfolio } from "./PiePortfolio";

export const Portfolio = () => {
  // Fetching Wallet Data from Redux Store
  const wallet = useSelector((state) => state.wallet.data);
  const [balance, setBalance] = useState(0);
  console.log(balance);
  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    const getBalance = async () => {
      const balance = await web3.eth.getBalance(wallet);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    // Checking wallet network
    const checkNetwork = async () => {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
      } catch (e) {
        if (e.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x38",
                  chainName: "BSC Mainnet",
                  nativeCurrency: {
                    name: "Binance",
                    symbol: "BNB", // 2-6 characters long
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://bscscan.com/"],
                  rpcUrls: ["https://bsc-dataseed.binance.org/"],
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        // console.error(e)
      }
    };
    checkNetwork();
    getBalance();
  }, [wallet]);

  return (
    <div className="bg-white p-4 rounded-lg relative">
      <div className="flex justify-between">
        <span className="text-xl font-semibold">Portfolio</span>
        <span className="text-gray-500">
          Total Value: <span className="text-black font-semibold">{balance} BNBs</span>
        </span>
      </div>
      <PiePortfolio />
    </div>
  );
};
