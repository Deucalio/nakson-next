"use client";
import Link from "next/link";
import Nav from "../../components/Nav";
import { useRef, useState } from "react";

export default function Page() {
  // Nav Configuration
  const navElement = useRef(null);
  const arrowElement = useRef(null);
  const sidebarItems = useRef(null);
  const pageElement = useRef(null);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  //   _________________________________________________________

  //   Input Fields States
  const [showCustomInputBox, setShowCustomInputBox] = useState(false);

  return (
    <main
      className={`grid md:h-screen grid-cols-6 bg-black relative  transition-all duration-1000 `}
    >
      {/* OPENED NAVBAR */}

      <Nav
        pageElement={pageElement}
        openSidebar={openSidebar}
        navElement={navElement}
        arrowElement={arrowElement}
        sidebarItems={sidebarItems}
        handleSidebar={handleSidebar}
      />

      <section
        ref={pageElement}
        className={`col-span-5  px-20 text-white transition-all duration-1000 `}
      >
        <ul className="mx-auto my-8 flex h-12 flex-row items-center justify-center gap-12 rounded-3xl text-xs">
          <Link href="/esync/settings/personal-info">
            <li name="personal-info" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                data-slot="icon"
                className="h-5 w-5 transition-all duration-300 pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              {/* <p>Personal Info</p> */}
            </li>
          </Link>

          <Link href="/esync/settings/shippers">
            <li
              name="shippers"
              className="cursor-pointer relative bg-zinc-800  text-gray-400 rounded-md p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                data-slot="icon"
                className="h-5 w-5 transition-all duration-500 pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          </Link>
          <Link href="/esync/settings/configuration">
            <li name="configuration" className="cursor-pointer ">
              {/* <p>Configuration</p> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                data-slot="icon"
                className="h-5 w-5 text-slate-50 pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          </Link>
        </ul>

        <p className="mb-3 border-b border-blue-900 py-2 text-base font-semibold tracking-wide">
          Shippers
        </p>
        <div className=" border-rose-600 grid grid-cols-2 gap-3 px-2 py-1 text-sm">
          <ul className="flex flex-col gap-6">
            <li className="flex flex-row gap-2">
              <select className="border-[1px] bg-black px-3 py-2" name="" id="">
                <option data="" type="">
                  Select Shipper Name
                </option>
                <option value=""></option>
                <option value=""></option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                data-slot="icon"
                className="mt-1 h-8 w-8"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="flex w-96 flex-col sm:flex-row gap-3 px-2 mt-4 ">
              <p>Name</p>
              <input
                className=" w-40 h-7 p-1 sm:w-auto sm:ml-auto border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900 "
                type="text"
              />
            </li>
            <li className="flex w-96 flex-col sm:flex-row gap-3 px-2">
              <p>Email</p>
              <input
                className="w-40 h-7 p-1 sm:w-auto sm:ml-auto  border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900 "
                type="text"
              />
            </li>
            <li className="flex w-96 flex-col sm:flex-row gap-3 px-2">
              <p>Phone</p>
              <input
                className="w-40 h-7 p-1 sm:w-auto sm:ml-auto  border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900 "
                type="text"
              />
            </li>
            <li className="flex w-96 flex-row gap-3 px-2 py-1">
              <p className="" htmlFor="">
                Address{" "}
              </p>
              <textarea
                className="border-white-400 ml-auto w-52 h-28 resize-none border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900"
                name=""
                id=""
              ></textarea>
            </li>
          </ul>
          <ul className="mt-[4.4rem] border-pink-400 flex flex-col gap-12">
            <li className="flex w-96 flex-row gap-3 px-2 py-1">
              <p className="" htmlFor="">
                {" "}
                Special Instructions{" "}
              </p>
              <select
                onChange={(e) => {
                  console.log("e.target.value", e.target.value);
                  if (e.target.value === "custom") {
                    setShowCustomInputBox(true);
                  }
                }}
                className="ml-14 h-10 -translate-y-2 border-[1px] border-blue-400 bg-black px-2 text-slate-300"
                name=""
                id=""
              >
                <option value="sku,quantity">SKU + Quantity</option>
                <option value="customer-notes">Customer Notes</option>
                <option value="custom">Custom</option>
              </select>
            </li>
            <li>
              {showCustomInputBox && (
                <input
                  className="w-96 h-7 p-1 border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900"
                  type="text"
                />
              )}
            </li>
            <li className="flex w-40 flex-row gap-3 px-2 py-1 lg:w-96">
              <select
                className="h-10 border-[1px] border-blue-400 bg-black px-2 text-slate-300"
                name=""
                id=""
              >
                <option value="">Select Shop</option>
                <option value="">Nakson</option>
                <option value="">Momdaughts</option>
              </select>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
