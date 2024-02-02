"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Shippers = () => {
  return (
    <>
      <section class="grid h-screen grid-cols-6 bg-black">
        <div class="col-span-1 bg-slate-900"></div>
        <div class="col-span-5 border-sky-500 px-20 text-white">
          <ul class="mx-auto my-8 flex h-12 flex-row items-center justify-center gap-12 rounded-3xl">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-6 w-6 text-slate-50"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li class="relative">
              <button class="flex h-8 w-32 flex-row items-center justify-center gap-2 rounded-2xl border-2 bg-white font-bold text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Shippers</p>
              </button>
            </li>

            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-6 w-6 text-slate-50"
              >
                <path
                  fillRule="evenodd"
                  d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          </ul>

          <div class="flex flex-row w-96 py-1 px-2 gap-3">
            <select class="bg-black border-[1px] py-2 px-3" name="" id="">
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
              class="w-8 h-8 mt-1"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <p class="w-/ mb-5 border-b border-blue-900 py-5 text-2xl font-semibold tracking-wide">
            Shipping Details
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-2">
            <ul class="flex w-2/3 flex-col gap-8 px-1 py-4 md:w-2/4">
              <li class="flex w-96 flex-row gap-3 px-2 py-1">
                <label for="">Name</label>
                <input
                  class="ml-auto border-[1px] bg-black opacity-60"
                  type="text"
                />
              </li>
              <li class="flex w-96 flex-row gap-3 px-2 py-1">
                <label for="">Email</label>
                <input
                  class="ml-auto border-[1px] bg-black opacity-60"
                  type="text"
                />
              </li>
              <li class="flex w-96 flex-row gap-3 px-2 py-1">
                <label for="">Phone</label>
                <input
                  class="ml-auto border-[1px] bg-black opacity-60"
                  type="text"
                />
              </li>
              <li class="flex w-96 flex-row gap-3 px-2 py-1">
                <label class="" for="">
                  Address
                </label>
                <textarea
                  class="h-28 ml-auto border-[1px] border-white-400 opacity-60 bg-black px-2 text-slate-300 resize-none"
                  name=""
                  id=""
                ></textarea>
              </li>
            </ul>

            <ul class="flex w-2/3 flex-col gap-8 px-1 py-4 md:w-2/4">
              <li class="flex w-96 flex-row gap-3 px-2 py-1">
                <label class="" for="">
                  Special Instructions
                </label>
                <select
                  class="ml-14 h-10 -translate-y-2 border-[1px] border-blue-400 bg-black px-2 text-slate-300 "
                  name=""
                  id=""
                >
                  <option value="">SKU + Quantity</option>
                  <option value="">Customer Notes</option>
                  <option value="">Custom</option>
                </select>
              </li>
              <li class="flex w-40 flex-row gap-3 px-2 py-1 lg:w-96">
                <select
                  class="h-10 border-[1px] border-blue-400 bg-black px-2 text-slate-300"
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
        </div>
      </section>
    </>
  );
};

export default function Page() {
  const navElement = useRef(null);
  const arrowElement = useRef(null);
  const sidebarItems = useRef(null);
  const pageElement = useRef(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const router = useRouter();

  const [page, setPage] = useState("personal-info");

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handlePageClick = (e) => {
    const parentElem = e.target.parentNode;
    const buttonElement = e.target.children[0];

    const pageToBeViewed = e.target.getAttribute("name");
    setPage(pageToBeViewed);
    console.log("page", pageToBeViewed);

    if (buttonElement.classList.value.includes("bg-slate-200")) {
      // it means that the button is already selected
      return;
    } else {
      for (let i = 0; i < parentElem.childNodes.length; i++) {
        if (
          parentElem.childNodes[i].children[0].classList.value.includes(
            "bg-slate-200"
          )
        ) {
          console.log("i", parentElem.childNodes[i].children[0]);
          const buttonElement = parentElem.childNodes[i].children[0];
          const hiddenSVGElement = parentElem.childNodes[i].children[1];

          //   pElement.classList.add("transition-all", "opacity-0");
          //   svgElement.classList.add("duration-1000", "scale-0");

          buttonElement.classList.remove("text-blue-600", "bg-slate-200");

          setTimeout(() => {
            buttonElement.classList.remove("flex");
            buttonElement.classList.add("w-4");

            hiddenSVGElement.classList.remove("opacity-0");
          }, 150);

          setTimeout(() => {
            buttonElement.classList.add("hidden");
          }, 200);

          const targetButtonElement = e.target.children[0];
          const targetSVGElement = e.target.children[1];

          targetButtonElement.classList.remove("hidden");
          setTimeout(() => {
            hiddenSVGElement.classList.remove("hidden");
            targetButtonElement.classList.remove("w-4");
            targetButtonElement.classList.add(
              "flex",
              "text-blue-600",
              "bg-slate-200"
            );
          }, 50);

          targetSVGElement.classList.add("hidden", "opacity-0");

          return;
        }
      }
    }
  };

  useEffect(() => {
    const sidebarElements = sidebarItems.current.children;
    if (openSidebar) {
      setTimeout(() => {
        pageElement.current.classList.add("-translate-x-32");
      }, 1500);

      // Remove text from sideBar Items
      navElement.current.classList.add("border-opacity-0");

      for (let i = 0; i < sidebarElements.length; i++) {
        setTimeout(() => {
          sidebarElements[i].children[1].classList.add(
            "transition-all",
            "opacity-0"
          );
        }, i * 50);
      }

      for (let i = 0; i < sidebarElements.length; i++) {
        setTimeout(() => {
          sidebarElements[i].children[1].classList.add("hidden");
        }, 1350);
      }

      setTimeout(() => {
        navElement.current.style.transform = "translateX(-300px)";
      }, 800);

      setTimeout(() => {
        navElement.current.style.transform = "";
        navElement.current.style.width = "6rem";
        navElement.current.classList.add("top-12", "rounded-3xl", "-left-6");
      }, 1300);

      setTimeout(() => {
        navElement.current.classList.add(
          "bg-blue-800",
          "bg-opacity-30",
          "h-[70vh]"
        );
      }, 1500);

      setTimeout(() => {
        //   select Nakson Image
        sidebarItems.current.parentNode.childNodes[0].classList.add(
          "transition-all",
          "duration-500"
        );
        sidebarItems.current.parentNode.childNodes[0].classList.add(
          "opacity-0"
        );
        arrowElement.current.classList.add("-rotate-180");
      }, 1);

      setTimeout(() => {
        sidebarItems.current.parentNode.childNodes[0].classList.add("hidden");
      }, 1400);
    } else {
      setTimeout(() => {
        pageElement.current.classList.remove("-translate-x-32");
      }, 100);
      for (let i = 0; i < sidebarElements.length; i++) {
        setTimeout(() => {
          sidebarElements[i].children[1].classList.remove("opacity-0");
        }, i * 200);
      }

      for (let i = 0; i < sidebarElements.length; i++) {
        setTimeout(() => {
          sidebarElements[i].children[1].classList.remove("hidden");
        }, 1350);
      }

      setTimeout(() => {
        navElement.current.style.transform = "";
        navElement.current.style.width = "100%";
      }, 400);

      //   branch-1

      setTimeout(() => {
        navElement.current.classList.remove("top-12", "rounded-3xl", "-left-6");
      }, 500);

      setTimeout(() => {
        navElement.current.classList.remove(
          "bg-blue-800",
          "bg-opacity-30",
          "h-[70vh]"
        );
      }, 50);

      setTimeout(() => {
        //   select Nakson Image
        // sidebarItems.current.parentNode.childNodes[0].classList.remove(
        //   "transition-all",
        //   "duration-500"
        // );
        sidebarItems.current.parentNode.childNodes[0].classList.remove(
          "opacity-0"
        );
        arrowElement.current.classList.remove("-rotate-180");
      }, 1);

      setTimeout(() => {
        sidebarItems.current.parentNode.childNodes[0].classList.add(
          "opacity-0"
        );
        sidebarItems.current.parentNode.childNodes[0].classList.remove(
          "hidden"
        );
      }, 100);

      setTimeout(() => {
        sidebarItems.current.parentNode.childNodes[0].classList.remove(
          "opacity-0"
        );
      }, 200);

      setTimeout(() => {
        navElement.current.style.paddingLeft = "5px";
      }, 500);
      navElement.current.classList.remove("border-opacity-0");
    }
  }, [openSidebar]);

  const toggleConfig = (e) => {
    e.target.parentElement.classList.toggle("translate-x-20");

    const ul = e.target.parentElement.parentElement.children[1];
    e.target.classList.add("animate-ping");

    e.target.classList.toggle("lg:rotate-90");
    e.target.classList.toggle("-rotate-90");
    setTimeout(() => {
      e.target.classList.remove("animate-ping");
    }, 1100);
    console.log("a", ul);

    for (let i = 0; i < ul.children.length; i++) {
      setTimeout(() => {
        ul.children[i].classList.toggle("scale-0");
      }, i * 150);
    }
  };

  return (
    <>
      <section className="grid md:h-screen grid-cols-6 bg-black relative">
        {/* OPENED NAVBAR */}
        <div
          ref={navElement}
          id="nav"
          className="col-span-5 md:col-span-1 relative transition-all duration-500       border-r border-slate-800  w-auto   h-screen
          "

          //   col-span-5 md:col-span-1 -translate-x-4    bg-blue-800 bg-opacity-30       w-32 h-[70%] top-12 rounded-3xl -left-6
        >
          <span className="flex  text-slate-300 w-auto sm:w-9 sm:h-9 justify-center  rounded-full  items-center border-violet-900 absolute transition-all right-3 bottom-0 -translate-y-1 duration-300 hover:border-violet-800 cursor-pointer -rotate-180">
            <svg
              ref={arrowElement}
              onClick={() => handleSidebar()}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
          <ul className="text-white">
            <li className="flex flex-col items-center gap-4 xl:flex-row lg:pl-9 cursor-pointer justify-center">
              <Image
                className="h-28"
                src="https://i.imgur.com/HkYc6sn.png"
                alt=""
              />
            </li>

            <ul
              ref={sidebarItems}
              className="mx-auto  flex w-11/12 flex-col justify-center gap-3 mt-4 gap-y-2 rounded-sm pl-2"
            >
              <li
                onClick={() => {
                  // send me to orders page
                  router.push("/");
                }}
                className="flex h-8 xl:h-10  flex-row items-center gap-1 text-xs transition-all duration-500 
              hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 xl:h-6 xl:w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <p className="transition-all duration-300">Home</p>
              </li>

              <li
                onClick={() => router.push("/products")}
                className="flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-500 hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8"
              >
                <svg
                  className="w-4 h-4 xl:h-6 xl:w-6 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6H17C17 3.2 14.8 1 12 1S7 3.2 7 6H5C3.9 6 3 6.9 3 8V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8C21 6.9 20.1 6 19 6M12 3C13.7 3 15 4.3 15 6H9C9 4.3 10.3 3 12 3M19 20H5V8H19V20M12 12C10.3 12 9 10.7 9 9H7C7 11.8 9.2 14 12 14S17 11.8 17 9H15C15 10.7 13.7 12 12 12Z" />
                </svg>

                <p className="transition-all duration-300">Products</p>
              </li>
              <li
                onClick={() => router.push("/orders")}
                className="flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-500 hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8"
              >
                <svg
                  className="w-4 h-4 xl:h-6 xl:w-6 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M9,20A2,2 0 0,1 7,22A2,2 0 0,1 5,20A2,2 0 0,1 7,18A2,2 0 0,1 9,20M17,18A2,2 0 0,0 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20A2,2 0 0,0 17,18M7.2,14.63C7.19,14.67 7.19,14.71 7.2,14.75A0.25,0.25 0 0,0 7.45,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.07,14.31 5.24,14L6.6,11.59L3,4H1V2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,12C16.94,12.62 16.27,13 15.55,13H8.1L7.2,14.63M9,9.5H13V11.5L16,8.5L13,5.5V7.5H9V9.5Z" />
                </svg>

                <p className="transition-all duration-300">Orders</p>
              </li>
              <li
                onClick={() => router.push("/customers")}
                className="flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-500 hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 xl:h-6 xl:w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <p className="transition-all duration-300">Customers</p>
              </li>
              <li
                onClick={() => router.push("/finance")}
                className="flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-500 hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8"
              >
                <svg
                  className="w-4 h-4 xl:h-6 xl:w-6 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>finance</title>
                  <path d="M6,16.5L3,19.44V11H6M11,14.66L9.43,13.32L8,14.64V7H11M16,13L13,16V3H16M18.81,12.81L17,11H22V16L20.21,14.21L13,21.36L9.53,18.34L5.75,22H3L9.47,15.66L13,18.64" />
                </svg>

                <p className="transition-all duration-300">Finance</p>
              </li>
              <li
                onClick={() => router.push("/settings")}
                className="flex h-8 xl:h-10 cursor-pointer flex-row items-center gap-1 bg-gray-500 bg-opacity-25 text-xs lg:gap-4 lg:pl-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 xl:h-6 xl:w-6 fill-white  transition-all duration-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                    clipRule="evenodd"
                  />
                  <title>Settings</title>
                </svg>

                <p className="transition-all duration-300">Settings</p>
              </li>
            </ul>
          </ul>
        </div>

        <div
          ref={pageElement}
          className={`col-span-5 border-sky-500 px-20 text-white transition-all duration-1000 `}
        >
          <ul className="mx-auto my-8 flex h-12 flex-row items-center justify-center gap-12 rounded-3xl text-xs">
            <li
              name="personal-info"
              onClick={(e) => handlePageClick(e)}
              className="cursor-pointer"
            >
              <button
                name="personal-info"
                className="pointer-events-none flex text-blue-600 border-[1px] border-blue-900  bg-slate-200 transition-all duration-300   h-8 w-36 flex-row items-center justify-center gap-2 rounded-2xl  font-bold "
              >
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
                <p>Personal Info</p>
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                data-slot="icon"
                className="h-5 w-5 transition-all hidden opacity-0 duration-500 pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li
              name="shippers"
              onClick={(e) => handlePageClick(e)}
              className="cursor-pointer relative"
            >
              <button
                name="shippers"
                className="transition-all duration-300 flex hidden h-8 w-32 flex-row items-center justify-center gap-2 rounded-2xl border-2 font-bold text-blue-600"
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
                <p>Shippers</p>
              </button>
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

            <li
              name="configuration"
              onClick={(e) => handlePageClick(e)}
              className="cursor-pointer"
            >
              <button
                name="configuration"
                className="flex hidden transition-all duration-300 h-8 w-32 flex-row items-center justify-center gap-2 rounded-2xl border-2 font-bold text-blue-600"
              >
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
                <p>Configuration</p>
              </button>
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
          </ul>

          {page === "shippers" && (
            <div class="flex w-96 flex-row gap-3 px-2 py-1 text-sm">
              <select class="border-[1px] bg-black px-3 py-2" name="" id="">
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
                class="mt-1 h-8 w-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          )}

          <p className="mb-5 border-b border-blue-900 py-5 text-base font-semibold tracking-wide">
            {
              {
                "personal-info": "Personal Information",
                shippers: "Shippers",
                configuration: "Configuration",
              }[page]
            }
          </p>

          {page === "configuration" && (
            <div class="grid grid-cols-1 items-center gap-2 lg:grid-cols-7  border-slate-700 pb-5">
              <div class="flex flex-row items-center gap-1 transition-all duration-500 relative">
                <Image
                  className="w-16"
                  src="
                  https://assets.stickpng.com/images/58482ec0cef1014c0b5e4a70.png"
                  alt=""
                />

                <svg
                  onClick={(e) => toggleConfig(e)}
                  onPointerEnter={(e) => {
                    const tooltip = e.target.nextSibling;
                    tooltip.classList.remove("opacity-0");
                  }}
                  onPointerLeave={(e) => {
                    const tooltip = e.target.nextSibling;
                    tooltip.classList.add("opacity-0");
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="relative w-8 text-violet-600 cursor-pointer transition-all duration-500   lg:rotate-90 ml-auto mt-7 "
                >
                  <path
                    className="pointer-events-none"
                    fillRule="evenodd"
                    d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  style={{
                    left: "revert",
                    top: "revert",
                    bottom: "70px",
                    right: "9px",
                  }}
                  className="opacity-0 absolute top-0 -m-8 h-fit w-fit -translate-x-0 -translate-y-3 rounded-lg bg-violet-800  px-2 py-1 text-sm font-bold text-[#FFFFFF]  transition-all duration-300 ease-in-out after:absolute after:left-1/2 after:bottom-0 after:h-0 after:w-0 after:-translate-x-4 after:translate-y-6 after:border-[15px] after:border-transparent after:border-t-violet-800 after:content-['']"
                >
                  Add Store
                </span>
              </div>

              <ul class="col-span-6 flex flex-col  gap-4 px-1 py-4 lg:flex-row">
                <li class="flex flex-row gap-3  py-1 text-sm font-semibold tracking-normal lg:flex-col transition-all duration-200">
                  <p for="">Store Name</p>
                  <input
                    class="ml-auto border-[1px] bg-black opacity-60"
                    type="text"
                  />
                </li>
                <li class="flex flex-row gap-3  py-1 text-sm font-semibold tracking-normal lg:flex-col transition-all duration-200">
                  <p for="">Store URL</p>
                  <input
                    class="ml-auto border-[1px] bg-black opacity-60"
                    type="text"
                  />
                </li>
                <li class="flex flex-row gap-3  py-1 text-sm font-semibold tracking-normal lg:flex-col transition-all duration-200">
                  <p for="">Access Token</p>
                  <input
                    class="ml-auto border-[1px] bg-black opacity-60"
                    type="text"
                  />
                </li>

                <li class="flex flex-row  gap-3 px-2 py-1 text-xs font-semibold tracking-normal lg:flex-col">
                  <button class="rounded-md bg-blue-700 px-4 py-2 text-slate-100 hover:bg-blue-800 mt-6">
                    Add Store
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <ul
              className={` ${
                page === "personal-info" || page === "shippers" ? "" : "hidden"
              } flex w-2/3 flex-col gap-8 px-1 py-4 text-sm md:w-2/4`}
            >
              <li className="flex w-96 flex-col sm:flex-row gap-3 px-2 py-1">
                <p>Name</p>
                <input
                  className=" w-40 sm:w-auto sm:ml-auto border-[1px] bg-black opacity-60"
                  type="text"
                />
              </li>
              <li className="flex w-96 flex-col sm:flex-row gap-3 px-2 py-1">
                <p>Email</p>
                <input
                  className="w-40 sm:w-auto sm:ml-auto  border-[1px] bg-black opacity-60"
                  type="text"
                />
              </li>
              <li className="flex w-96 flex-col sm:flex-row gap-3 px-2 py-1">
                <p>Phone</p>
                <input
                  className="w-40 sm:w-auto sm:ml-auto  border-[1px] bg-black opacity-60"
                  type="text"
                />
              </li>

              {page === "shippers" && (
                <li class="flex w-96 flex-row gap-3 px-2 py-1">
                  <p class="" for="">
                    Address{" "}
                  </p>
                  <textarea
                    class="border-white-400 ml-auto h-28 resize-none border-[1px] bg-black px-2 text-slate-300 opacity-60"
                    name=""
                    id=""
                  ></textarea>
                </li>
              )}
            </ul>
            {page === "personal-info" && (
              <ul className="flex w-2/3 flex-col gap-8 px-1 py-4 text-sm md:w-2/4 lg:ml-11 xl:-ml-7">
                <li className="flex w-96 flex-col sm:flex-row gap-3 px-2 py-1">
                  {/* <label for=""></label> */}
                  <p>About Your Brand</p>
                  <textarea
                    className="border-white-400 w-40 sm:w-auto sm:ml-auto h-20 resize-none border-[1px] bg-black px-2 text-slate-300 opacity-60"
                    name=""
                    id=""
                  ></textarea>
                </li>

                <li className="flex w-96 flex-col sm:flex-row gap-3 px-2 py-1">
                  <p>Address</p>
                  <textarea
                    className="border-white-400 w-40 sm:w-auto sm:ml-auto h-28 resize-none border-[1px] bg-black px-2 text-slate-300 opacity-60"
                    name=""
                    id=""
                  ></textarea>
                </li>
              </ul>
            )}

            {page === "shippers" && (
              <ul class="flex w-2/3 flex-col gap-8 px-1 py-4 md:w-2/4 text-sm">
                <li class="flex w-96 flex-row gap-3 px-2 py-1">
                  <p class="" for="">
                    {" "}
                    Special Instructions{" "}
                  </p>
                  <select
                    class="ml-14 h-10 -translate-y-2 border-[1px] border-blue-400 bg-black px-2 text-slate-300"
                    name=""
                    id=""
                  >
                    <option value="">SKU + Quantity</option>
                    <option value="">Customer Notes</option>
                    <option value="">Custom</option>
                  </select>
                </li>
                <li class="flex w-40 flex-row gap-3 px-2 py-1 lg:w-96">
                  <select
                    class="h-10 border-[1px] border-blue-400 bg-black px-2 text-slate-300"
                    name=""
                    id=""
                  >
                    <option value="">Select Shop</option>
                    <option value="">Nakson</option>
                    <option value="">Momdaughts</option>
                  </select>
                </li>
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
