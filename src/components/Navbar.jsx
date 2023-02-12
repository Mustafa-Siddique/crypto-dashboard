import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import { addWallet } from "../features/walletSlice";

export const Navbar = () => {
  // Redux
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet.data);

  // On page load
  useEffect(() => {
    getCurrentWallet();
    addWalletListener();
  }, []);

  // Connect wallet function on click
  const connectWallet = async () => {
    if (
      typeof window.ethereum !== "undefined" &&
      typeof window !== "undefined"
    ) {
      try {
        // Metamask is installed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        dispatch(addWallet(accounts[0]));
        // Sign and verify login message
        const message = "Login to Cadillacs";
        const web3 = new Web3(window.ethereum);
        await web3.eth.personal.sign(message, accounts[0], (err, signature) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Signature", signature);
          }
        });
        
      } catch (err) {
        // User denied account access...
        console.error(err);
      }
    } else {
      // Metamask is not installed
      console.log("Metamask is not installed");
    }
  };

  // Get account info on page load
  const getCurrentWallet = async () => {
    if (
      typeof window.ethereum !== "undefined" &&
      typeof window !== "undefined"
    ) {
      try {
        // Metamask is installed
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          dispatch(addWallet(accounts[0]));
        } else {
          console.log("No accounts found");
        }
      } catch (err) {
        // User denied account access...
        console.error(err);
      }
    } else {
      // Metamask is not installed
      console.log("Metamask is not installed");
    }
  };

  // Account chnage listener
  const addWalletListener = async () => {
    if (
      typeof window.ethereum !== "undefined" &&
      typeof window !== "undefined"
    ) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          dispatch(addWallet(accounts[0]));
        } else {
          dispatch(addWallet(""));
        }
      });
    }
  };

  return (
    <Disclosure as="nav" className="bg-white-800">
      {({ open }) => (
        <>
          <div className="mx-auto container px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <a
                    href="https://cadillacs.in"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="block h-8 w-auto"
                      src="https://cadillacs.in/wp-content/uploads/2022/10/logo.png"
                      alt="Cadillacs"
                    />
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      to="/"
                      className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </Link>
                    <button
                      className="bg-amber-300 py-1 px-3 rounded font-semibold hover:bg-amber-500 hover:text-white"
                      onClick={connectWallet}
                      disabled={wallet.length > 0}
                    >
                      {wallet.length > 0 ? (
                        <span className="text-gray-700">
                          {wallet.slice(0, 6)}...{wallet.slice(-4)}
                        </span>
                      ) : (
                        <span className="text-gray-700">Connect Wallet</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Disclosure.Button
                as={Link}
                to="/"
                className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
