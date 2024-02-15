"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const ConnectStoreModal = ({
  spanRef,
  handleConnect,
  isLoading,
  shopifyInfo,
  setShopifyInfo,
  handleFileChange,
  displayError,
  connectStoreModal,
  setConnectStoreModal,
}) => {
  return (
    <>
      <div
        className={`absolute ${
          !connectStoreModal
            ? ["opacity-0", "pointer-events-none"].join(" ")
            : ""
        }   overflow-y-auto top-16 z-10 flex h-[25rem] w-[37rem] flex-col gap-2 rounded-lg bg-gray-950  shadow-2xl shadow-slate-800 ring-1 ring-green-800 p-2 text-white transition-all duration-300 md:left-1/3
      md:-translate-x-11`}
      >
        <form action="">
          <ul className="relative rounded-lg  px-6 py-2 ">
            <span
              ref={spanRef}
              className={`absolute text-sm text-red-600 -bottom-8 transition-all duration-500 left-32 ${
                displayError ? "" : "opacity-0"
              }`}
            >
              You can't leave any fields empty
            </span>
            <svg
              onClick={() => setConnectStoreModal(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute text-red-800 right-3 w-8 h-8 border-2 rounded-full cursor-pointer hover:text-red-900 hover:border-red-900 transition-all border-red-800"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <li className=" flex flex-row mt-3 items-center gap-5  py-1  tracking-normal transition-all duration-200">
              <p className="text-slate-300 text-sm">Shop Name</p>
              <input
                value={shopifyInfo.shopName}
                onChange={(e) =>
                  setShopifyInfo({
                    ...shopifyInfo,
                    shopName: e.target.value,
                  })
                }
                placeholder="Enter Your Shop Name"
                className="transition-all text-xs duration-300 h-10 w-44 rounded-md text-slate-300 placeholder:text-slate-300 placeholder:text-xs placeholder:text-opacity-95 placeholder:font-normal    bg-slate-900   px-3  outline-none outline-2 placeholder:opacity-50 focus:outline-indigo-800"
                type="text"
              />
            </li>
            <li className=" flex flex-row gap-3  py-1 mt-3   tracking-normal lg:flex-col transition-all duration-200  self-center"></li>
            <li className=" relative flex flex-row gap-8 items-center  ">
              <p className="text-slate-300 text-sm">Shop Logo</p>
              <div
                className={`border border-blue-500 rounded-sm h-[130px] w-[130px] ${
                  shopifyInfo.shopLogo ? "bg-white" : "bg-black"
                }`}
              >
                {shopifyInfo.shopLogo && (
                  <Image
                    width={130}
                    height={130}
                    className="w-24 rounded-sm bg-cover bg-center"
                    src={URL.createObjectURL(shopifyInfo.shopLogo)}
                    alt="Uploaded Preview"
                  ></Image>
                )}
                <button>
                  <input
                    onChange={handleFileChange}
                    accept="image/*"
                    type="file"
                    id="img"
                    className="hidden"
                  />
                </button>
              </div>
              <label
                className="bg-blue-700 hover:bg-blue-800 transition-all duration-300 p-2 rounded-md cursor-pointer  text-xs  text-center"
                htmlFor="img"
              >
                {shopifyInfo.shopLogo
                  ? shopifyInfo.shopLogo.name
                  : "Upload Logo"}
              </label>
            </li>

            <li
              onClick={handleConnect}
              className=" flex flex-row -mt-1 gap-3 px-2 py-1 text-sm font-semibold tracking-normal items-center justify-center ml-[90px] w-40"
            >
              <button
                disabled={isLoading}
                className="disabled:bg-opacity-50 rounded-md bg-green-700 px-4 py-2 duration-300 transition-all text-slate-100 hover:bg-green-800 mt-8"
              >
                {isLoading ? "Connecting..." : "Connect"}
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default ConnectStoreModal;
