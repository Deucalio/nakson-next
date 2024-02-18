"use client";
import React, { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { useRouter } from "next/navigation";
const page = () => {
  // Nav Configuration
  const navElement = useRef(null);
  const arrowElement = useRef(null);
  const sidebarItems = useRef(null);
  const pageElement = useRef(null);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  // _____

  const router = useRouter();

  return (
    <main
      id="main-login"
      class="relative h-screen overflow-hidden grid grid-cols-12 "
    >
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
        class="col-span-12 sm:col-span-10 relative z-10 mx-auto grid  h-fit sm:h-5/6 translate-y-11 grid-cols-8 rounded-3xl border-2 border-violet-950   bg-transparent  md:w-4/5
  lg:w-3/4"
      >
        <div class="col-span-3 rounded-lg overflow-hidden">
          <img
            class="h-full rounded-3xl bg-cover "
            src="https://i.imgur.com/ddnB1HA.jpeg"
            alt="e sync logo"
          />
        </div>
        <div class="col-span-5  rounded-3xl border-fuchsia-400 py-8 pl-24 md:pl-8 ">
          <ul class="mx-auto -ml-10 flex flex-col items-center gap-3 md:gap-7 border-fuchsia-900 text-xl text-slate-200">
            <li class="flex flex-col gap-2">
              <div class=" rounded-xl opacity-75 -translate-x-1 -translate-y-4 text-center text-8xl font-bold tracking-widest text-transparent  lg:left-1/4">
                <h1>503</h1>
              </div>
            </li>
            <li class="text-md">Hold on, we're undergoing some</li>
            <li
              id="maintenance"
              class="uppercase  font-bold -translate-x-4 md:translate-x-0 md:text-5xl opacity-80 tracking-normal bg-clip-text text-transparent bg-gradient-to-b from-green-500 via-green-500 to-black  "
            >
              maintenance
            </li>
            <li className="text-gray-300 opacity-50">Check back soon!</li>
            <li class="flex flex-row gap-4 text-xs sm:text-2xl">
              <button
                onClick={() => router.push("/esync/orders")}
                class="flex flex-row-reverse px-5 py-2 items-center gap-2 justify-center  rounded-lg bg-blue-700  transition-all text-gray-50 opacity-90 hover:opacity-100"
              >
                <p>Orders</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default page;
