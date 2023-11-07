"use client";
import Link from "next/link";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Nav({
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  nav,
  setNav,
  handleClickScroll,
}) {
  // animate the nav bar on scroll
  // const [nav, setNav] = useState(false);
  const navRef = useRef(null);
  const closeNavIcon = useRef(null);
  const nav_link_1 = useRef(null);
  const nav_link_2 = useRef(null);
  const nav_link_3 = useRef(null);

  const openNavIcon = useRef(null);

  useEffect(() => {
    if (nav) {
      navRef.current.classList.remove("translate-x-[300px]");
      document.body.style.overflowY = "hidden";
    } else {
      navRef.current.classList.add("translate-x-[300px]");

      document.body.style.overflowY = "scroll";
    }

    return () => {};
  }, [nav]);

  // const [touchStart, setTouchStart] = useState(null);
  // const [touchEnd, setTouchEnd] = useState(null);

  // // the required distance between touchStart and touchEnd to be detected as a swipe
  // const minSwipeDistance = 50;

  // const onTouchStart = (e) => {
  //   setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
  //   setTouchStart(e.targetTouches[0].clientX);
  // };

  // const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  // const onTouchEnd = () => {
  //   if (!touchStart || !touchEnd) return;
  //   const distance = touchStart - touchEnd;
  //   const isLeftSwipe = distance > minSwipeDistance;
  //   const isRightSwipe = distance < -minSwipeDistance;
  //   // if (isLeftSwipe || isRightSwipe)
  //   //   console.log("swipe", isLeftSwipe ? "left" : "right");
  //   // // add your conditional logic here

  //   if (isRightSwipe) {
  //     setNav(false);
  //   }
  // };

  return (
    <nav className="flex flex-row sm:static sticky top-0 z-50">
      <ul className="flex w-full flex-row justify-between ">
        <img
          onClick={() => handleClickScroll("main")}
          className="h-20 w-20 cursor-pointer -mt-3"
          src="https://i.imgur.com/HkYc6sn.png"
          alt=""
        />
        <li
          className=" relative left-[1.4rem] ml-auto flex w-fit 
          flex-col gap-3 px-12 py-4 pb-8 leading-3 md:hidden z-40 appearance-none"
        >
          <div
            ref={openNavIcon}
            className="flex flex-col  gap-3 transition-all"
          >
            <p
              ref={nav_link_1}
              onClick={() => setNav(!nav)}
              className={`w-8 border-b-[1px] border-white`}
            ></p>

            <p
              ref={nav_link_2}
              onClick={() => setNav(!nav)}
              className={`w-8 border-b-[1px] border-white`}
            ></p>

            <p
              ref={nav_link_3}
              onClick={() => setNav(!nav)}
              className={`w-8 border-b-[1px] border-white`}
            ></p>
          </div>

          <svg
            ref={closeNavIcon}
            onClick={() => setNav(!nav)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`transition-all w-8 h-8 text-slate-400 hidden`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          {/* show X svg if navbar is opened */}
          {/* {nav ? (
            <svg
              ref={closeNavIcon}
              onClick={() => setNav(!nav)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`transition-all w-8 h-8 text-slate-400 scale-0 `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <>
              <p
                onClick={() => setNav(!nav)}
                className="w-8 border-b-[1px] border-white"
              ></p>

              <p
                onClick={() => setNav(!nav)}
                className="w-8 border-b-[1px] border-white"
              ></p>

              <p
                onClick={() => setNav(!nav)}
                className="w-8 border-b-[1px] border-white"
              ></p>
            </>
          )} */}

          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={navRef}
            className="mobile-nav absolute -left-32 -top-[1px] flex h-[100vh] w-60 cursor-auto flex-col justify-between gap-4 bg-black text-xs   
             transition-all ease-in translate-x-[300px]"
          >
            <ul className="flex flex-col gap-3 px-8 py-24 text-sm">
              <li className="flex flex-row justify-between absolute top-0">
                <img
                  className="h-20 w-20 -translate-x-4 cursor-pointer"
                  src="https://i.imgur.com/HkYc6sn.png"
                  alt=""
                />
                <svg
                  onClick={() => setNav(!nav)}
                  ref={closeNavIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 text-slate-100 transition-all absolute top-6 -right-24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </li>

              <li
                onClick={() => {
                  setNav(false);
                  handleClickScroll("services");
                }}
                className="cursor-pointer transition-all duration-200 hover:text-base"
              >
                Our Services
              </li>

              <Link href="/portfolio">
                <li
                  onClick={() => {
                    setNav(false);
                  }}
                  className="cursor-pointer transition-all duration-200 hover:text-base"
                >
                  Portfolio of Projects
                </li>
              </Link>
              <li
                onClick={() => {
                  setNav(false);
                  handleClickScroll("clients");
                }}
                className="cursor-pointer transition-all duration-200 hover:text-base"
              >
                Clients
              </li>
              <li
                onClick={() => {
                  setNav(false);
                  handleClickScroll("faq");
                }}
                className="cursor-pointer transition-all duration-200 hover:text-base"
              >
                FAQ
              </li>
            </ul>

            <ul className="flex h-60 flex-col bg-black px-4 py-6 text-sm">
              <li>Socials</li>

              <p className="-ml-4 mt-2 w-[30rem] border-[1px] border-gray-600"></p>
              <ul className="flex flex-row gap-3 py-4">
                <li>
                  <img
                    className="h-8 w-8"
                    src="https://i.imgur.com/c1gDFDf.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="ml-2 mr-1 h-8 w-8"
                    src="https://i.imgur.com/Q86OpaW.png"
                    alt=""
                  />
                </li>
                <img
                  className="h-8 w-8"
                  src="https://i.imgur.com/nHov7Z3.png"
                  alt=""
                />
                <li></li>
                <img
                  className="-ml-2 h-8 w-8"
                  src="https://i.imgur.com/UzIM92Y.png"
                  alt=""
                />
                <li></li>
              </ul>
            </ul>
          </div>
        </li>

        <li className="mx-auto my-auto hidden w-2/3 flex-row items-center justify-center gap-9 py-3 md:flex lg:gap-16 lg:pl-16">
          <p
            onClick={() => handleClickScroll("services")}
            className="cursor-pointer text-sm transition-all duration-200 ease-out hover:scale-110"
          >
            Services
          </p>
          <p
            onClick={() => handleClickScroll("clients")}
            className="cursor-pointer text-sm transition-all duration-200 ease-out hover:scale-110"
          >
            Clients
          </p>
          <p
            onClick={() => handleClickScroll("faq")}
            className="cursor-pointer text-sm transition-all duration-200 ease-out hover:scale-110"
          >
            FAQ
          </p>
        </li>

        <li className="mx-auto my-auto hidden md:block">
          <Link href="/portfolio">
            <button className="flex w-36 flex-row items-center gap-1 rounded-xl bg-gradient-to-l from-indigo-400 to-purple-800 px-4 py-2 transition-all hover:scale-105">
              &nbsp; &nbsp; Portfolio
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-3 w-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
          </Link>
        </li>
      </ul>

      {/* overlay */}

      {/* <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={() => setNav(false)}
        className={`transition-all duration-150 ease-linear overlay  absolute inset-0 z-20 ${
          nav && "backdrop-blur-sm"
        } md:hidden `}
      ></div> */}
    </nav>
  );
}
