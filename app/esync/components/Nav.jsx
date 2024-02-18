"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
const Nav = ({
  pageElement,
  openSidebar,
  navElement,
  arrowElement,
  handleSidebar,
  sidebarItems,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log("pathname: ", pathname);

  useEffect(() => {
    const sidebarElements = sidebarItems.current.children;
    if (openSidebar) {
      setTimeout(() => {
        pageElement.current.classList.add("-translate-x-32");
      }, 1500);

      // Remove text from sideBar Items
      navElement.current.classList.add("border-opacity-0");
      navElement.current.classList.remove("h-screen");

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
      pageElement.current.classList.add("h-screen");
    }
    if (!openSidebar) {
      pageElement.current.classList.remove("h-screen");
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
  return (
    <nav
      ref={navElement}
      id="nav"
      className={`col-span-5 md:col-span-1 relative transition-all duration-500 border-r border-slate-800 w-auto h-screen `}
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
            width={150}
            height={150}
            src="https://i.imgur.com/HkYc6sn.png"
            alt=""
          />
        </li>

        <ul
          ref={sidebarItems}
          className="mx-auto  flex w-11/12 flex-col justify-center gap-3 mt-4 gap-y-2 rounded-sm pl-2"
        >
          <li
            onClick={() => router.push("/esync")}
            className={`flex
            ${
              pathname === "/esync"
                ? "bg-gray-500 bg-opacity-25"
                : "hover:bg-opacity-25 hover:bg-gray-500"
            }
            h-8 xl:h-10  flex-row items-center gap-1 text-xs transition-all duration-200 rounded-sm 
            hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25  lg:gap-4 lg:pl-8`}
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

            <p className="transition-all duration-200">Home</p>
          </li>
          <li
            onClick={() => router.push("/esync/products")}
            className={`
            ${
              pathname === "/esync/products"
                ? "bg-gray-500 bg-opacity-25"
                : "hover:bg-opacity-25 hover:bg-gray-500"
            }
            flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-200 rounded-sm hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8`}
          >
            <svg
              className="w-4 h-4 xl:h-6 xl:w-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19 6H17C17 3.2 14.8 1 12 1S7 3.2 7 6H5C3.9 6 3 6.9 3 8V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8C21 6.9 20.1 6 19 6M12 3C13.7 3 15 4.3 15 6H9C9 4.3 10.3 3 12 3M19 20H5V8H19V20M12 12C10.3 12 9 10.7 9 9H7C7 11.8 9.2 14 12 14S17 11.8 17 9H15C15 10.7 13.7 12 12 12Z" />
            </svg>

            <p className="transition-all duration-200">Products</p>
          </li>
          <li
            onClick={() => router.push("/esync/orders")}
            className={`flex 
            ${
              pathname === "/esync/orders"
                ? "bg-gray-500 bg-opacity-25"
                : "hover:bg-opacity-25 hover:bg-gray-500"
            }
            h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-200 rounded-sm hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8`}
          >
            <svg
              className="w-4 h-4 xl:h-6 xl:w-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M9,20A2,2 0 0,1 7,22A2,2 0 0,1 5,20A2,2 0 0,1 7,18A2,2 0 0,1 9,20M17,18A2,2 0 0,0 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20A2,2 0 0,0 17,18M7.2,14.63C7.19,14.67 7.19,14.71 7.2,14.75A0.25,0.25 0 0,0 7.45,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.07,14.31 5.24,14L6.6,11.59L3,4H1V2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,12C16.94,12.62 16.27,13 15.55,13H8.1L7.2,14.63M9,9.5H13V11.5L16,8.5L13,5.5V7.5H9V9.5Z" />
            </svg>

            <p className="transition-all duration-200">Orders</p>
          </li>
          <li
            onClick={() => router.push("/esync/customers")}
            className={`
            ${
              pathname === "/esync/customers"
                ? "bg-gray-500 bg-opacity-25"
                : "hover:bg-opacity-25 hover:bg-gray-500"
            }
            flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-200 rounded-sm hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8`}
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

            <p className="transition-all duration-200">Customers</p>
          </li>
          <li
            onClick={() => router.push("/esync/finance")}
            className={`flex
            ${
              pathname === "/esync/finance"
                ? "bg-gray-500 bg-opacity-25"
                : "hover:bg-opacity-25 hover:bg-gray-500"
            }
            
            h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-200 rounded-sm hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8`}
          >
            <svg
              className="w-4 h-4 xl:h-6 xl:w-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>finance</title>
              <path d="M6,16.5L3,19.44V11H6M11,14.66L9.43,13.32L8,14.64V7H11M16,13L13,16V3H16M18.81,12.81L17,11H22V16L20.21,14.21L13,21.36L9.53,18.34L5.75,22H3L9.47,15.66L13,18.64" />
            </svg>

            <p className="transition-all duration-200">Finance</p>
          </li>
          <li
            onClick={() => router.push("/esync/settings")}
            className={`flex h-8 xl:h-10 cursor-pointer flex-row items-center gap-1 ${
              pathname === "/esync/settings"
                ? "bg-gray-500 bg-opacity-25"
                : "hover:bg-opacity-25 hover:bg-gray-500"
            }  transition-all duration-200 rounded-sm bg-opacity-25 text-xs lg:gap-4 lg:pl-8`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 xl:h-6 xl:w-6 fill-white  transition-all duration-200 rounded-sm"
            >
              <path
                fillRule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                clipRule="evenodd"
              />
              <title>Settings</title>
            </svg>

            <p className="transition-all duration-200">Settings</p>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default Nav;
