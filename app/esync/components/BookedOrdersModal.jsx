"use client";
import { useEffect, useRef, useState } from "react";
import LEOPARDS_CITIES from "../LEOPARDS_CITIES";
import axios from "axios";
import generateCusotmizedSlip from "./generateCusotmizedSlip";
import { getUser } from "../actions/getUser";
import TCS_CITIES from "../TCS_CITIES";
import Notification from "./Notification";
const EditModal = ({
  shipmentType,
  orderToBeEditedId,
  setEditedOrders,
  editedOrders,
  modal: bookedOrdersModal,
  setShowEditModal,
}) => {
  const editModal = useRef(null);

  const [editOrderDetails, setEditOrderDetails] = useState({
    address: "",
    city: "",
    codAmount: "",
    serviceType: "",
  });
  const handleChange = (e) => {
    // display values first

    const { name, value } = e.target;
    setEditOrderDetails({ ...editOrderDetails, [name]: value });
  };

  const order = editedOrders.find((order) => order.id === orderToBeEditedId);

  useEffect(() => {
    setEditOrderDetails({
      address: order.billing_address.address1,
      city: order.billing_address.city,
      codAmount: Number(order.total_outstanding),
      serviceType: "Overnight",
    });
  }, []);

  const closeEditModal = () => {
    setShowEditModal(false);
    bookedOrdersModal.current.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    const modalNode = editModal.current;
    bookedOrdersModal.current.classList.add("overflow-hidden");

    setTimeout(() => {
      modalNode.classList.remove("opacity-0");
    }, 100);

    setTimeout(() => {
      modalNode.classList.add("-top-12");
    }, 300);
  });
  const saveEditedOrderDetail = () => {
    // Save the details of the editied orders
    const newOrders = editedOrders.map((order) => {
      if (order.id === orderToBeEditedId) {
        return {
          ...order,
          billing_address: {
            ...order.billing_address,
            address1: editOrderDetails.address,
            city: editOrderDetails.city,
          },
          total_outstanding: editOrderDetails.codAmount,
        };
      } else {
        return order;
      }
    });
    setEditedOrders(newOrders);
    closeEditModal();
  };

  return (
    <>
      {editOrderDetails && (
        <div
          ref={editModal}
          className="absolute transition-all opacity-0 top-16 -left-2    duration-700    bg-slate-950 border-blue-950 border-[1px]    z-[60] h-[75vh] w-[45rem] md:translate-x-1/3  py-8 px-2 rounded-md"
        >
          <ul className="grid grid-cols-2 gap-6 text-slate-300 pl-16 pr-16 py-8  h-5/6 mt-2">
            <li className="col-span-2 h-14 text-slate-300 -translate-y-8 flex flex-col gap-1 mb-3">
              <p className="text-xl absolute -top-6    tracking-wide font-semibold">
                Edit
              </p>
              <p className="mt-4">{order.name}</p>
              <p>
                {order.customer.first_name.charAt(0).toUpperCase() +
                  order.customer.first_name.slice(1)}{" "}
                {order.customer.last_name.charAt(0).toUpperCase() +
                  order.customer.last_name.slice(1)}
              </p>
            </li>
            <li className="text-sm flex flex-col gap-2">
              <p>Address: </p>
              <textarea
                className="h-28 w-56 outline-none bg-slate-800  py-1 px-2 resize-none"
                value={editOrderDetails.address}
                name="address"
                onChange={handleChange}
                cols="30"
                rows="10"
              >
                {/* 60 characters only */}
                {order.billing_address.address1} - {order.billing_address.city}
              </textarea>
            </li>

            <li className="text-sm flex flex-col gap-2 ">
              <p>COD Amount: </p>
              <input
                name="codAmount"
                onChange={handleChange}
                value={editOrderDetails.codAmount}
                className="bg-slate-800 w-56 outline-none ring-0  h-9 px-3"
                type="number"
              />
            </li>

            <li>
              <button
                onClick={saveEditedOrderDetail}
                className="rounded-md bg-blue-700 px-6 py-3 text-slate-100 hover:bg-blue-800 absolute right-4 bottom-3 "
              >
                Save
              </button>
            </li>
          </ul>
          <svg
            onClick={() => closeEditModal()}
            className="absolute top-4 right-4 z-50 h-9 text-red-700 cursor-pointer hover:text-red-800 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M320 320L192 192M192 320l128-128"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default function BookedOrdersModal({
  user,
  setUser,
  setFilterData,
  filterData: SelectedOrders,
  setShowBookedOrdersModal,
}) {
  // const [user, setUser] = useState({});

  const [showNotification, setShowNotification] = useState(false);

  const [slipData, setSlipData] = useState([]);

  const fetchSlipData = async () => {
    // await
  };

  // useEffect(() => {
  //   // If isDisable is true, and slipData is empty, then send a request to the server
  //   if (isDisable && slipData.length === 0) {
  //     // Send a request to the server
  //     const fetchSlipData = async () => {
  //       const response = await axios.post("/api/courier/leopards/book", {
  //         email: user.user.email,
  //         orders: editedOrders,
  //       });

  //       setSlipData(response.data);
  //     };
  //     fetchSlipData();
  //   }
  // }, [isDisable]);

  // const saveUser = async () => {
  //   const user = await getUser();
  //   console.log("user inside: ", user);
  //   setUser(user);
  // };

  const [bookedOrdersData, setBookedOrdersData] = useState([]);

  // const [shipmentType, setShipmentType] = useState({
  //   leopards: ["Overnight", "Overland", "Detain"],
  //   tcs: ["Overnight", "Overland", "Detain"],
  // });
  // const [options, setOptions] = useState({
  //   courier: "",
  //   serviceType: "",
  // });

  const [undo, setUndo] = useState(false);

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  // Edit Modal Order Id
  const [orderToBeEditedId, setOrderToBeEditedId] = useState(null);

  // Edited Orders
  const [editedOrders, setEditedOrders] = useState([]);
  const [bookOptions, setBookOptions] = useState({
    courier_type: "",
    service_type: "--",
  });

  // Disable the Button
  const [isDisable, setIsDisable] = useState(false);

  const modal = useRef(null);
  const removeSpecialCharacter = (str) => str.replace(/[^a-zA-Z]/g, "");

  // First useEffect
  useEffect(() => {
    // Fetch User
    // saveUser();
    // Add default property
    let newOrders = SelectedOrders.map((order) => {
      return {
        ...order,
        service_type: "",
        courier_type: "",
        correct_city: undefined,
      };
    });
    setEditedOrders(newOrders);
    // use fading animation
    const modalNode = modal.current;
    document.body.classList.add("overflow-hidden");

    setTimeout(() => {
      modalNode.classList.remove("opacity-0");
    }, 300);

    setTimeout(() => {
      modalNode.classList.remove("-mt-14");
    }, 250);
  }, []);

  // ----

  // For bookOptions
  useEffect(() => {
    console.log("orders: ", editedOrders);
    if (bookOptions.courier_type === "" && editedOrders.length > 0) {
      const blankOrders = editedOrders.map((order) => {
        return {
          ...order,
          courier_type: "",
          service_type: "",
          correct_city: undefined,
        };
      });

      setEditedOrders(blankOrders);
      return;
    }

    if (bookOptions.courier_type === "Leopards") {
      console.log("bookOptions: ", bookOptions);
      let newOrders = editedOrders.map((order) => {
        return {
          ...order,
          courier_type: bookOptions.courier_type,
          service_type: bookOptions.service_type,
          correct_city: LEOPARDS_CITIES.find(
            (city) =>
              removeSpecialCharacter(city.name).toLowerCase() ===
              removeSpecialCharacter(order.billing_address.city).toLowerCase()
          ),
        };
      });

      const correctCities = [];
      newOrders.filter((order) => correctCities.push(order.correct_city));
      console.log("New Orders: ", newOrders);

      setEditedOrders(newOrders);
    } else if (bookOptions.courier_type === "TCS") {
      console.log("bookOptions: ", bookOptions);
      let newOrders = editedOrders.map((order) => {
        return {
          ...order,
          courier_type: bookOptions.courier_type,
          service_type: bookOptions.service_type,
          correct_city: TCS_CITIES.find(
            (city) =>
              removeSpecialCharacter(city.cityName).toLowerCase() ===
              removeSpecialCharacter(order.billing_address.city).toLowerCase()
          ),
        };
      });

      const correctCities = [];
      newOrders.filter((order) => correctCities.push(order.correct_city));
      console.log("New Orders: ", newOrders);

      setEditedOrders(newOrders);
    }
  }, [bookOptions]);

  // _____

  // Whenever the service type is changed, editedOrders should be updated
  // useEffect(() => {
  //   if (options.serviceType === "") {
  //     console.log("if block");
  //     return;
  //   } else {
  //     console.log("else Block:");
  //     return;
  //     const newOrders = editedOrders.map((order) => {
  //       return {
  //         ...order,
  //         courier_type: options.courier,
  //         service_type: options.serviceType,
  //         selected: true,
  //         correct_city: LEOPARDS_CITIES
  //           ? LEOPARDS_CITIES.filter(
  //               (city) =>
  //                 removeSpecialCharacter(city.name).toLowerCase() ===
  //                 removeSpecialCharacter(
  //                   order.billing_address.city
  //                 ).toLowerCase()
  //             )[0]
  //           : "",
  //       };
  //     });
  //     setEditedOrders(newOrders);
  //   }
  // }, [options]);

  const closeModal = () => {
    // trigger page Reload
    // Unselect all the orders

    const modalNode = modal.current;
    document.body.classList.remove("overflow-hidden");

    setTimeout(() => {
      modalNode.classList.add("opacity-0");
    }, 100);

    setTimeout(() => {
      modalNode.classList.add("-mt-14");
    }, 350);

    setTimeout(() => {
      setShowBookedOrdersModal(false);
    }, 400);
  };

  const openEditModal = (id) => {
    setShowEditModal(true);
    setOrderToBeEditedId(id);
  };

  const removeOrder = (e, id) => {
    e.stopPropagation();
    const svg = e.target;
    const li = svg.parentElement;
    const ul = li.parentElement;

    ul.classList.add("opacity-0");
    ul.classList.add("h-[1px]");

    setTimeout(() => {
      ul.classList.add("hidden");
    }, 200);
  };

  const bookOrder = async (e) => {
    console.log("user: ", user);
    e.preventDefault();
    if (!user.user.email) {
      return alert("No User Found");
    }

    setIsDisable(true);

    if (bookOptions.courier_type === "") {
      alert("Select Courier");
      setIsDisable(false);
      return;
    }

    let ordersToBeBooked = editedOrders.filter(
      (order) => order.correct_city !== undefined
    );

    // get Server URL
    const serverRes = await axios.get("/api/server-url");
    const { serverURL } = serverRes.data;

    // Start timer
    const startTime = new Date();

    const courier = bookOptions.courier_type.toLowerCase();
    console.log("Courier: ", courier);

    // Inngest API
    // Generate a ID for Database
    const id = Math.floor(Math.random() * 1000000);

    console.log("dbID: ", id);

    const responseInngest = await axios.post(`/api/courier/tcs`, {
      email: user.user.email,
      orders: ordersToBeBooked,
      serverURL: serverURL,
      dbID: id,
    });
    console.log("Response Inngest: ", responseInngest.data.message);

    setIsDisable(false);

    // _______________

    // const responseOne = await axios.post(`${serverURL}/${courier}/book`, {
    //   email: user.user.email,
    //   orders: ordersToBeBooked,
    // });

    // console.log("Response One: ", responseOne.data);

    // console.log("Downloading Slip...");
    // const pdfBytes = await generateCusotmizedSlip(
    //   responseOne.data.booked_orders,
    //   courier
    // );
    // const downloadFile = Object.values(pdfBytes);
    // const blob = new Blob([new Uint8Array(downloadFile)], {
    //   type: "application/pdf",
    // });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = `${courier}-${responseOne.data.booked_orders.length}-${responseOne.data.timeTaken}-Slip.pdf`; // Set the desired file name
    // document.body.appendChild(a);

    // a.click();

    // document.body.removeChild(a);

    // const endTime = new Date();
    // const timeTaken = (endTime - startTime) / 1000; // Time in seconds
    // console.log("Time Taken to download Slip: ", timeTaken);
    // setIsDisable(false);

    return;
  };

  // Display loading Screen if EditedOrders is empty

  return (
    <>
      <div
        ref={modal}
        className={` absolute transition-all left-24 -mt-14 opacity-0 duration-700 top-6 -translate-y-1 -translate-x-5  z-50 mx-auto  h-[90vh] w-[30rem] overflow-auto rounded-sm border-slate-700 bg-black md:w-11/12
        border-[1px] 
        `}
      >
        <form
          className={`${
            showEditModal ? ["blur-xl", "pointer-events-none"].join(" ") : ""
          } m-4 flex flex-row transition-all duration-700 justify-around gap-2 border-b-[1px] border-slate-500 px-3 py-3`}
        >
          <div
            className={`flex flex-row gap-5 ${
              isDisable
                ? ["opacity-50", "pointer-events-none"].join(" ")
                : "opacity-100"
            } `}
          >
            <select
              onChange={(e) => {
                const courier = e.target.value;
                setBookOptions({
                  courier_type: courier,
                  service_type:
                    courier === ""
                      ? "--"
                      : courier === "Leopards"
                      ? "Overnight"
                      : "Express",
                });
              }}
              className="mt-1 h-10 rounded-lg border-2 border-slate-500 bg-black px-3 text-white"
            >
              <option className="bg-black text-blue-500" value="">
                Select Courier
              </option>
              <option className="bg-black text-blue-500" value="Leopards">
                Leopards
              </option>
              <option className="bg-black text-blue-500" value="TCS">
                TCS
              </option>
            </select>

            {/* Serivce Type (Overland, Detain etc) */}

            <select
              onChange={(e) => {
                setBookOptions({
                  ...bookOptions,
                  service_type: e.target.value,
                });
              }}
              disabled={bookOptions.courier_type === ""}
              // value={bookOptions.service_type}
              value={
                // Show Customized if even one order is of different service type
                // from the bookOptions.service_type
                // Else show the bookOptions.service_type
                editedOrders.filter(
                  (order) =>
                    order.service_type !== bookOptions.service_type &&
                    order.selected
                ).length > 0
                  ? "customized"
                  : bookOptions.service_type
              }
              className="mt-1 h-10 rounded-lg border-2 border-slate-500 bg-black px-3 text-white"
            >
              <option className="bg-black text-slate-500" value="--">
                --
              </option>
              <option
                disabled
                className="bg-black text-slate-500"
                value="customized"
              >
                Customized
              </option>

              {bookOptions.courier_type === "Leopards" && (
                <>
                  <option className="bg-black text-blue-500" value="Overnight">
                    Overnight
                  </option>
                  <option className="bg-black text-blue-500" value="Overland">
                    Overland
                  </option>
                  <option className="bg-black text-blue-500" value="Detain">
                    Detain
                  </option>
                </>
              )}
              {
                // TCS Service Types
                bookOptions.courier_type === "TCS" && (
                  <>
                    <option className="bg-black text-blue-500" value="Express">
                      Express
                    </option>
                    <option
                      className="bg-black text-blue-500"
                      value="Economy-Express"
                    >
                      Economy Express
                    </option>
                    <option className="bg-black text-blue-500" value="Overland">
                      Overland
                    </option>
                  </>
                )
              }
            </select>
          </div>

          <button
            disabled={
              isDisable ||
              editedOrders.every((order) => order.correct_city === undefined)
            }
            onClick={(e) => bookOrder(e)}
            className="rounded-md bg-blue-800 px-4 py-2 text-slate-100 hover:bg-blue-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-700"
          >
            {isDisable ? "Booking..." : "Book Orders"}
          </button>
        </form>
        <svg
          onClick={() => closeModal()}
          className={` ${
            showEditModal ? ["blur-xl", "pointer-events-none"].join(" ") : ""
          } absolute transition-all duration-700 right-0 top-0 z-50 h-9 text-red-700 hover:text-red-800 cursor-pointer
          ${isDisable && ["text-red-950", "pointer-events-none"].join(" ")}
          `}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M320 320L192 192M192 320l128-128"
          />
        </svg>

        <p
          className={`${
            showEditModal ? ["blur-xl", "pointer-events-none"].join(" ") : ""
          } px-8 text-lg transition-all duration-700 font-semibold text-slate-400`}
        >
          Orders Selected:{" "}
          {editedOrders.filter((order) => order.selected).length}
        </p>

        <p
          className={`${
            showEditModal ? ["blur-xl", "pointer-events-none"].join(" ") : ""
          } px-8 text-lg transition-all duration-700 font-semibold text-slate-400`}
        >
          Read to be Booked:{" "}
          {
            editedOrders.filter((order) => order.correct_city !== undefined)
              .length
          }
        </p>

        <div
          className={`${
            showEditModal ? ["blur-xl", "pointer-events-none"].join(" ") : ""
          } m-4 transition-all duration-700 translate-y-5 py-4  h-2/3  overflow-y-auto scroll-smooth  relative`}
        >
          {/* UNDO MODAL */}

          {undo && (
            <div
              class="absolute w-56   h-8 rounded-md top-4 left-1/3 translate-x-2/3  bg-red-700 bg-opacity-50 text-opacity-90  text-sm z-50 text-white flex items-center flex-row justify-around 
            shadow-red-800 shadow-2xl transition-shadow duration-500 cursor-pointer"
            >
              <p class="">
                Removed <span class="font-medium">NAK5188</span>{" "}
              </p>
              <p class="font-bold hover:underline cursor-pointer">Undo</p>
            </div>
          )}
          <ul
            className={`grid w-[60rem] grid-cols-13 font-bold text-slate-400 md:h-10 md:w-auto text-sm ${
              isDisable && ["opacity-50", "pointer-events-none"].join(" ")
            }`}
          >
            <li className="flex items-center justify-center bg-slate-900">
              SR#
            </li>
            <li className="flex items-center justify-center border-x-2 border-slate-700 bg-slate-900">
              Order#
            </li>
            <li className="col-span-2 flex items-center justify-center bg-slate-900">
              Name
            </li>
            <li className="flex items-center justify-center border-x-2 border-slate-700 bg-slate-900">
              Phone No
            </li>
            <li className="col-span-3 flex items-center justify-center bg-slate-900">
              Address
            </li>
            <li className="flex items-center justify-center border-x-2 border-slate-700 bg-slate-900">
              City
            </li>
            <li className="flex items-center justify-center col-span-2 bg-slate-900">
              Service Type
            </li>
            <li className="flex items-center justify-center border-x-2 border-slate-700 bg-slate-900">
              Amount
            </li>
            <li className="flex items-center justify-center border-x-2 border-slate-700 bg-slate-900">
              Edit
            </li>
          </ul>

          {/* SelectedOrders */}

          {editedOrders &&
            editedOrders.map((order, index) => (
              <ul
                id={order.sr_number}
                key={order.name}
                className={`${
                  showEditModal
                    ? ["blur-xl", "pointer-events-none"].join(" ")
                    : ""
                } mt-5 grid w-[65rem] transition-all duration-300 grid-cols-13 rounded-lg bg-zinc-900 pb-2 text-slate-300 md:w-auto h-14 text-sm  scroll-smooth ${
                  isDisable && ["opacity-50", "pointer-events-none"].join(" ")
                } `}
              >
                <li className="relative flex flex-row items-center justify-center transition-all ">
                  <svg
                    onClick={(e) => removeOrder(e, order.id)}
                    className="absolute left-4 h-6 w-6 -translate-x-2 cursor-pointer text-rose-700 hover:text-rose-800"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeWidth="32"
                      className="pointer-events-none"
                    />
                    <path
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M320 320L192 192M192 320l128-128"
                      className="pointer-events-none"
                    />
                  </svg>
                  <p>{order.sr_number}</p>
                </li>
                <li className="flex items-center justify-center transition-all">
                  {order.name}
                </li>
                <li className="col-span-2 flex items-center justify-center transition-all">
                  {order.customer.first_name.charAt(0).toUpperCase() +
                    order.customer.first_name.slice(1)}{" "}
                  {order.customer.last_name.charAt(0).toUpperCase() +
                    order.customer.last_name.slice(1)}
                </li>
                <li className="flex items-center justify-center transition-all text-sm">
                  {order.shipping_address?.phone
                    ? order.shipping_address.phone
                    : "No Phone"}
                  {/* 22 */}
                </li>
                <li className="col-span-3 flex items-center justify-center transition-all px-7 text-xs">
                  {/* 50 characters only */}
                  {order.billing_address.address1.slice(0, 50)
                    ? order.billing_address.address1.slice(0, 50)
                    : "No Address"}{" "}
                  -
                  {order.billing_address.city
                    ? order.billing_address.city
                    : "NA"}
                </li>
                <li className="flex items-center justify-center transition-all ">
                  {/* {order.billing_address.city
                    ? order.billing_address.city
                    : "No City"} */}

                  {bookOptions.courier_type === "" && (
                    <select
                      disabled
                      value="---"
                      className="mt-1 h-10 w-32 rounded-lg  bg-zinc-800 outline-none  px-3"
                    >
                      <option disabled value="---">
                        ---
                      </option>
                    </select>
                  )}

                  {bookOptions.courier_type === "Leopards" && (
                    <select
                      onChange={(e) => {
                        const newOrders = editedOrders.map((ord) => {
                          if (ord.name === order.name) {
                            return {
                              ...ord,
                              correct_city: LEOPARDS_CITIES.find(
                                (city) =>
                                  removeSpecialCharacter(
                                    city.name
                                  ).toLowerCase() ===
                                  removeSpecialCharacter(
                                    e.target.value
                                  ).toLowerCase()
                              ),
                            };
                          } else {
                            return ord;
                          }
                        });
                        console.log("Changed Orders: ", newOrders);
                        setEditedOrders(newOrders);
                      }}
                      value={
                        order.correct_city &&
                        order.correct_city.name &&
                        removeSpecialCharacter(
                          order.correct_city.name
                        ).toLowerCase()
                      }
                      className="mt-1 h-10 w-32 rounded-lg border-slate-500 bg-zinc-800 outline-none border-0 px-3"
                    >
                      <option value="---">---</option>

                      {LEOPARDS_CITIES.map((city) => {
                        return (
                          <option
                            key={city.id}
                            name={city.name}
                            id={city.id}
                            value={removeSpecialCharacter(
                              city.name
                            ).toLowerCase()}
                          >
                            {city.name}
                          </option>
                        );
                      })}
                    </select>
                  )}

                  {
                    // TCS Cities
                    bookOptions.courier_type === "TCS" && (
                      <select
                        onChange={(e) => {
                          const newOrders = editedOrders.map((ord) => {
                            if (ord.name === order.name) {
                              return {
                                ...ord,
                                correct_city: TCS_CITIES.find(
                                  (city) =>
                                    removeSpecialCharacter(
                                      city.cityName
                                    ).toLowerCase() ===
                                    removeSpecialCharacter(
                                      e.target.value
                                    ).toLowerCase()
                                ),
                              };
                            } else {
                              return ord;
                            }
                          });
                          console.log("Changed Orders (TCS): ", newOrders);
                          setEditedOrders(newOrders);
                        }}
                        value={
                          order.correct_city &&
                          order.correct_city.cityName &&
                          removeSpecialCharacter(
                            order.correct_city.cityName
                          ).toLowerCase()
                        }
                        className="mt-1 h-10 w-32 rounded-lg border-slate-500 bg-zinc-800 outline-none border-0 px-3"
                      >
                        <option value="---">---</option>

                        {TCS_CITIES.map((city) => {
                          return (
                            <option
                              key={city.cityID}
                              name={city.cityName}
                              id={city.cityID}
                              value={removeSpecialCharacter(
                                city.cityName
                              ).toLowerCase()}
                            >
                              {city.cityName}
                            </option>
                          );
                        })}
                      </select>
                    )
                  }
                </li>
                <li className="flex items-center col-span-2 justify-center transition-all text-slate-300">
                  {bookOptions.courier_type === "" && (
                    <select
                      disabled
                      value="---"
                      className="mt-1 h-10 w-32 rounded-lg border-slate-500 bg-zinc-800 outline-none border-0 px-3"
                    >
                      <option disabled value="---">
                        ---
                      </option>
                    </select>
                  )}

                  {bookOptions.courier_type === "Leopards" && (
                    <select
                      onChange={(e) => {
                        const newOrders = editedOrders.map((ord) => {
                          if (ord.id === order.id) {
                            return {
                              ...ord,
                              service_type:
                                e.target.value.slice(0, 1) +
                                e.target.value.slice(1).toLowerCase(),
                            };
                          } else {
                            return ord;
                          }
                        });
                        console.log("new Order:", newOrders);
                        setEditedOrders(newOrders);
                      }}
                      value={order.service_type.toLowerCase()}
                      // value={
                      //   order.service_type.slice(0, 1) +
                      //   order.service_type.slice(1).toLowerCase()
                      // }
                      className="mt-1 h-10 w-32 rounded-lg border-slate-500 bg-zinc-800 outline-none border-0 px-3 text-base"
                    >
                      {/* {order.correct_city && (
                        <option
                          value={
                            order.service_type.slice(0, 1) +
                            order.service_type.slice(1).toLowerCase()
                          }
                        >
                          {order.service_type}
                        </option>
                      )} */}
                      {order.correct_city &&
                        order.correct_city.shipment_type &&
                        order.correct_city.shipment_type.map((type) => {
                          return (
                            <option key={type} value={type.toLowerCase()}>
                              {type.slice(0, 1) + type.slice(1).toLowerCase()}
                            </option>
                          );
                        })}
                    </select>
                  )}

                  {bookOptions.courier_type === "TCS" && (
                    <select
                      onChange={(e) => {
                        const newOrders = editedOrders.map((ord) => {
                          if (ord.id === order.id) {
                            return {
                              ...ord,
                              service_type: e.target.value,
                            };
                          } else {
                            return ord;
                          }
                        });
                        console.log("new Order:", newOrders);
                        setEditedOrders(newOrders);
                      }}
                      value={order.service_type}
                      // value={
                      //   order.service_type.slice(0, 1) +
                      //   order.service_type.slice(1).toLowerCase()
                      // }
                      className="mt-1 h-10 w-32 rounded-lg border-slate-500 bg-zinc-800 outline-none border-0 px-3 text-base"
                    >
                      {
                        <>
                          <option
                            className="bg-black text-blue-500"
                            value="Express"
                          >
                            Express
                          </option>
                          <option
                            className="bg-black text-blue-500"
                            value="Economy-Express"
                          >
                            Economy Express
                          </option>
                          <option
                            className="bg-black text-blue-500"
                            value="Overland"
                          >
                            Overland
                          </option>
                        </>
                      }

                      {/* {order.correct_city && (
                        <option
                          value={
                            order.service_type.slice(0, 1) +
                            order.service_type.slice(1).toLowerCase()
                          }
                        >
                          {order.service_type}
                        </option>
                      )} */}

                      {}
                    </select>
                  )}
                </li>
                <li className="flex items-center justify-center">
                  {order.total_outstanding} PKR
                </li>
                <li
                  className={` 
                    flex items-center justify-center`}
                >
                  <svg
                    onClick={() => alert("Work in Progress")}
                    className={`flex h-7 cursor-pointer items-center justify-center text-blue-400 hover:text-blue-700 opacity-25`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M364.13 125.25L87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z"
                    />
                  </svg>
                </li>
              </ul>
            ))}
          <span
            className={`loader absolute top-1/3   left-1/2
          ${isDisable ? "opacity-100" : "opacity-0"}
          `}
          ></span>
        </div>
      </div>
      {isDisable && (
        <Notification
          timer={20}
          showNotification={"Order are being Booked..."}
          setShowNotification={setShowNotification}
          label={"Success"}
        />
      )}

      {showEditModal && (
        <EditModal
          shipmentType={shipmentType}
          editedOrders={editedOrders}
          setEditedOrders={setEditedOrders}
          orderToBeEditedId={orderToBeEditedId}
          modal={modal}
          setShowEditModal={setShowEditModal}
        />
      )}
    </>
  );
}
