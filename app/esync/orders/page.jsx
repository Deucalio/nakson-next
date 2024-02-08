"use client";
import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons"; // for customizing icons
import { Suspense, useEffect, useState, useRef } from "react"; // useState for storing data and useEffect for changing data on click
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import BookedOrdersModal from "../components/BookedOrdersModal";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { getUser } from "../actions/getUser";
function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // Animate spin using TailwindCSS classes.
  return (
    <>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </>
  );
}

// BRANCH 1

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const saveUser = async () => {
    const user = await getUser();
    setUser(user);
  };

  useEffect(() => {
    saveUser();
  }, []);

  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState();

  const [numberOfPages, setNumberOfPages] = useState(5);

  // Show modal when book order button is clicked
  const [showBookedOrdersModal, setShowBookedOrdersModal] = useState(false);

  const searchParams = useSearchParams();
  const numberOfPagesFromUrl =
    Number(searchParams.get("numberOfOrders")) === 0
      ? 5
      : Number(searchParams.get("numberOfOrders"));

  const router = useRouter();

  const fetchOrders = async () => {
    if (!user) return;
    console.log("user: ", user.user.email);
    const serverRes = await axios.get("/api/server-url");
    const { serverURL } = serverRes.data;
    const res = axios.post(`${serverURL}/shopify/orders`, {
      email: user.user.email,
    });
    let { data } = await res;
    console.log("data: ", data);

    // some orders have their name as null
    // so we will set first and last name to empty string
    data = data.map((order, index) => {
      if (order.customer === null) {
        order.customer = { ...order.customer, first_name: "", last_name: "" };
      } else if (order.customer) {
        if (order.customer.first_name === null) {
          order.customer.first_name = "";
        } else if (order.customer.last_name === null) {
          order.customer.last_name = "";
        }
      }
      return { ...order, selected: false, sr_number: index + 1 };
    });

    console.log("modified data:  ", data);

    // data = data.sort(function (a, b) {
    //   // Turn your strings into dates, and then subtract them
    //   // to get a value that is either negative, positive, or zero.
    //   return new Date(b.created_at) - new Date(a.created_at);
    // });

    setFilterData(data.slice(0, numberOfPages));

    setOrders(data);
  };

  const selectOrder = (id) => {
    const newOrders = orders.map((order) => {
      if (order.id === id) {
        order.selected = !order.selected;
      }
      return order;
    });
    setOrders(newOrders);
  };

  const selectAllOrders = (e) => {
    let selectedOrders = filterData.map((order) => {
      order.selected = e.target.checked;
      return order;
    });
    setFilterData(selectedOrders);
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchOrders();
    }
    return () => {
      ignore = true;
    };
    // this ensures that the fetchOrders function is only called once
  }, [user]);

  useEffect(() => {
    setNumberOfPages(numberOfPagesFromUrl);
  }, [numberOfPagesFromUrl]);

  const bookOrder = async () => {
    let ordersTobeBooked = filterData.filter((order) => order.selected);
    if (ordersTobeBooked.length === 0) {
      alert("No orders selected");
      return;
    }

    // Display Modal
    setShowBookedOrdersModal(true);

    // // Send Test Orders to the backend in JSON format
    // const res = await axios.post("http://localhost:4000/orders", {
    //   orders: ordersTobeBooked,
    // });
    // console.log(res);
  };
  useEffect(() => {
    if (showBookedOrdersModal) {
      navElement.current.classList.add("blur-lg");
    } else {
      navElement.current.classList.remove("blur-lg");
    }
  }, [showBookedOrdersModal]);

  const sidebarItems = useRef(null);
  const pageElement = useRef(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navElement = useRef(null);
  const arrowElement = useRef(null);
  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
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
    <main className="relative grid grid-cols-6 overflow-y-auto h-auto">
      <div
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
              width="0"
              height="0"
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
              className="flex h-8 xl:h-10  flex-row items-center gap-1 text-xs transition-all duration-300
              hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25  lg:gap-4 lg:pl-8"
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
            <li className="flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-300 hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8">
              <svg
                className="w-4 h-4 xl:h-6 xl:w-6 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 6H17C17 3.2 14.8 1 12 1S7 3.2 7 6H5C3.9 6 3 6.9 3 8V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8C21 6.9 20.1 6 19 6M12 3C13.7 3 15 4.3 15 6H9C9 4.3 10.3 3 12 3M19 20H5V8H19V20M12 12C10.3 12 9 10.7 9 9H7C7 11.8 9.2 14 12 14S17 11.8 17 9H15C15 10.7 13.7 12 12 12Z" />
              </svg>

              <p className="transition-all duration-300">Products</p>
            </li>
            <li className="flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-300 hover:cursor-pointer bg-gray-500 bg-opacity-25 lg:gap-4 lg:pl-8">
              <svg
                className="w-4 h-4 xl:h-6 xl:w-6 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M9,20A2,2 0 0,1 7,22A2,2 0 0,1 5,20A2,2 0 0,1 7,18A2,2 0 0,1 9,20M17,18A2,2 0 0,0 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20A2,2 0 0,0 17,18M7.2,14.63C7.19,14.67 7.19,14.71 7.2,14.75A0.25,0.25 0 0,0 7.45,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.07,14.31 5.24,14L6.6,11.59L3,4H1V2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,12C16.94,12.62 16.27,13 15.55,13H8.1L7.2,14.63M9,9.5H13V11.5L16,8.5L13,5.5V7.5H9V9.5Z" />
              </svg>

              <p className="transition-all duration-300">Orders</p>
            </li>
            <li className="flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-300 hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8">
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
            <li className="flex h-8 xl:h-10 flex-row items-center gap-1 text-xs transition-all duration-300 hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 lg:gap-4 lg:pl-8">
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
              className="flex h-8 xl:h-10 cursor-pointer flex-row items-center gap-1 hover:bg-gray-500 hover:bg-opacity-25 text-xs lg:gap-4 lg:pl-8"
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
      {/* Button to book order */}

      <div
        className={`transition-all duration-500 absolute top-8 left-60 translate-x-10 flex flex-row gap-5    ${
          showBookedOrdersModal ? "blur-lg" : ""
        }`}
      >
        <button
          onClick={bookOrder}
          className={` ${
            showBookedOrdersModal ? "pointer-events-none" : ""
          } bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `}
        >
          Book Order
        </button>
        <span>
          {filterData && filterData.filter((order) => order.selected).length}{" "}
          Selected
        </span>

        <span>
          Total Orders: <span className="text-blue-500">{orders.length}</span>
        </span>
      </div>

      <section
        ref={pageElement}
        className={`relative transition-all duration-700 container mx-auto mt-24 border-rose-400 p-4 col-span-5 h-[85vh] ${
          showBookedOrdersModal
            ? "overflow-y-hidden"
            : openSidebar === true
            ? "overflow-y-hidden"
            : "overflow-y-auto"
        } `}
      >
        <ul
          className={`grid transition-all duration-500 w-[63rem] grid-cols-12 gap-y-6 text-white md:mx-auto   ${
            showBookedOrdersModal ? "blur-lg" : ""
          }`}
        >
          <div className="relative">
            <input
              onChange={selectAllOrders}
              checked={
                filterData ? filterData.every((order) => order.selected) : false
              }
              type="checkbox"
              id="_checkbox"
            />
            <label htmlFor="_checkbox" />
            <div id="tick_mark"></div>
          </div>

          <li className="h-9 border-r-2 border-blue-700 pt-1 text-center text-lg text-slate-500  ">
            Order#
          </li>
          <li className="col-span-2 h-9 border-blue-700 pt-1 text-center text-lg text-slate-500  ">
            Customer
          </li>
          <li className="h-9 border-x-2 border-blue-700 pt-1 text-center text-lg text-slate-500  ">
            Status
          </li>
          <li className="col-span-2 h-9 border-blue-700 pt-1 text-center text-lg text-slate-500  ">
            Payment Status
          </li>
          <li className="h-9 border-x-2 border-blue-700 pt-1 text-center text-lg text-slate-500  ">
            Courier
          </li>
          <li className="h-9 border-blue-700 pt-1 text-center text-lg text-slate-500  ">
            Date
          </li>
          <li className="h-9 border-x-2 border-blue-700 pt-1 text-center text-lg text-slate-500 ">
            Total
          </li>
          <li className="h-9 border-x-2 border-blue-700 pt-1 text-center text-lg text-slate-500 col-span-2 ">
            Tags
          </li>
        </ul>

        {!filterData && (
          <ul
            className={` animate-pulse h-96 md:mx-auto grid w-[65rem] text-white mt-4 cursor-pointer grid-cols-10 rounded-sm transition-all hover:bg-zinc-900
            ${2 ? "bg-zinc-900" : ""}`}
          >
            <li className="bg-opacity-30 py-2 text-center "></li>

            <li className="col-span-2 bg-opacity-30 py-2 text-center "></li>

            <li className="bg-opacity-30 py-2 text-center "></li>
            <li className="col-span-2 bg-opacity-30 py-2 text-center "></li>
            <li className="bg-opacity-30 py-2 text-center "></li>
            <li className="bg-opacity-30 py-2 text-center "></li>
            <li className="bg-opacity-30 py-2 text-center "></li>
          </ul>
        )}

        {filterData &&
          filterData.map((order, index) => {
            return (
              <ul
                key={order.id}
                className={`md:mx-auto grid w-[63rem] text-white mt-4 cursor-pointer grid-cols-12 rounded-sm transition-all duration-500 hover:bg-zinc-900
                ${order.selected ? "bg-zinc-900" : ""} ${
                  showBookedOrdersModal ? "blur-lg" : ""
                }   text-sm`}
              >
                <input
                  onChange={() => selectOrder(order.id)}
                  type="checkbox"
                  checked={order.selected}
                  className="h-5 w-5 mt-3 ml-7   accent-blue-700"
                />
                <li className="bg-opacity-30 py-2 text-center ">
                  {order.name}
                </li>

                <li className="col-span-2 bg-opacity-30 py-2 text-center ">
                  {order.customer.first_name.charAt(0).toUpperCase() +
                    order.customer.first_name.slice(1)}{" "}
                  {order.customer.last_name.charAt(0).toUpperCase() +
                    order.customer.last_name.slice(1)}
                </li>

                <li className="bg-opacity-30 py-2 text-center ">
                  {order.fulfillment_status ? order.fulfillment_status : "Null"}
                </li>
                <li className="col-span-2 bg-opacity-30 py-2 text-center ">
                  {order.financial_status}
                </li>
                <li className="bg-opacity-30 py-2 text-center ">N/A</li>
                <li className="bg-opacity-30 py-2 text-center ">
                  {
                    // dd/mm/yy
                    // new Date(order.created_at).getDay() +
                    //   "/" +
                    //   new Date(order.created_at).getMonth() +
                    //   "/" +
                    //   new Date(order.created_at).getFullYear()
                    new Date(order.created_at).toLocaleDateString()
                  }
                </li>
                <li className="bg-opacity-30 py-2 text-center ">
                  Rs {order.total_price}
                </li>
                <li className="bg-opacity-30 py-2 text-center col-span-2 ">
                  {order.tags}
                </li>
              </ul>
            );
          })}

        <div
          className={`mx-auto flex flex-row items-center w-1/2  transition-all duration-700  h-36 ${
            !filterData ? "hidden" : "block"
          }
          ${showBookedOrdersModal ? "blur-lg" : ""}
          `}
        >
          <Pagination
            onChange={(e) => {
              console.log("page changed", e.target.textContent);
              setFilterData(orders.map((order) => (order.selected = false)));
              setFilterData(
                orders.slice(
                  e.target.textContent * numberOfPages - numberOfPages,
                  e.target.textContent * numberOfPages
                )
              );
            }}
            count={Math.ceil(orders.length / numberOfPages)}
            color="primary"
          />

          <form
            className={`p-4 container transition-all duration-500 ${
              showBookedOrdersModal ? "blur-lg" : ""
            }  `}
          >
            <select
              value={numberOfPages}
              onChange={(e) => {
                // setNumberOfPages(e.target.value);
                window.location.href = `/esync/orders?numberOfOrders=${encodeURIComponent(
                  e.target.value
                )}`;
                // router.push(`/orders?selectedOption=${encodeURIComponent(e.target.value)}`);
              }}
              className="h-9 bg-black text-white border-2 border-slate-500 px- rounded-lg"
              name="cars"
              id="cars"
            >
              <option className="text-blue-500 bg-black" value="5">
                5
              </option>
              <option
                defaultChecked
                className="text-blue-500 bg-black"
                value="20"
              >
                20
              </option>
              <option className="text-blue-500 bg-black" value="50">
                50
              </option>
              <option className="text-blue-500 bg-black" value="100">
                100
              </option>
              <option className="text-blue-500 bg-black" value="200">
                200
              </option>
            </select>
          </form>
        </div>
      </section>

      {/* MODAL */}
      {showBookedOrdersModal && (
        <BookedOrdersModal
          setFilterData={setFilterData}
          filterData={filterData.filter((order) => order.selected)}
          setShowBookedOrdersModal={setShowBookedOrdersModal}
        />
      )}
    </main>
  );
}
