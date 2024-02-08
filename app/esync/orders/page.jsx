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
import Nav from "../../components/esync/Nav";
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

    console.log("modified data: ", data);

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

  return (
    <main className="relative grid grid-cols-6 overflow-y-auto h-auto">
      {/* Button to book order */}
      <Nav
        pageElement={pageElement}
        openSidebar={openSidebar}
        navElement={navElement}
        arrowElement={arrowElement}
        sidebarItems={sidebarItems}
        handleSidebar={handleSidebar}
      />
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
