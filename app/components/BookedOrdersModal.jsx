"use client";
import { useEffect, useRef, useState } from "react";
import LEOPARDS_CITY_LIST from "../esync/CITY_LIST";
import Link from "next/link";
import axios from "axios";
import { PDFDocument, copyStringIntoBuffer } from "pdf-lib";

import download from "downloadjs";

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
  setFilterData,
  filterData: SelectedOrders,
  setShowBookedOrdersModal,
}) {
  const [bookedOrdersData, setBookedOrdersData] = useState([]);
  const [shipmentType, setShipmentType] = useState({
    leopards: ["Overnight", "Overland", "Detain"],
    tcs: ["Overnight", "Overland", "Detain"],
  });
  const orderOptionRef = useRef(null);
  const [undo, setUndo] = useState(false);

  const [options, setOptions] = useState({
    courier: "",
    serviceType: "",
  });

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  // Edit Modal Order Id
  const [orderToBeEditedId, setOrderToBeEditedId] = useState(null);

  // Edited Orders
  const [editedOrders, setEditedOrders] = useState([]);

  const modal = useRef(null);

  useEffect(() => {
    // iterate through every order options and set selected to true on overnight if user changes courier
    if (options.courier === "Leopards") {
      orderOptionRef.current[1].selected = true;
    } else if (options.courier === "TCS") {
      orderOptionRef.current[1].selected = true;
    }
  }, [options]);

  // Whenever the service type is changed, editedOrders should be updated
  useEffect(() => {
    if (options.serviceType === "") {
      const newOrders = editedOrders.map((order) => {
        return {
          ...order,
          service_type: "",
          courier_type: "",
          selected: true,
          correct_city: undefined,
        };
      });
      setEditedOrders(newOrders);
      return;
    }

    const newOrders = editedOrders.map((order) => {
      return {
        ...order,
        courier_type: options.courier,
        service_type: options.serviceType,
        selected: true,
        correct_city: LEOPARDS_CITY_LIST
          ? LEOPARDS_CITY_LIST.filter(
              (city) =>
                removeSpecialCharacter(city.name).toLowerCase() ===
                removeSpecialCharacter(order.billing_address.city).toLowerCase()
            )[0]
          : "",
      };
    });
    setEditedOrders(newOrders);
  }, [options]);

  // UseEffect htmlFor animation

  useEffect(() => {
    // setEditedOrders({SelectedOrders});
    // Add default property
    let newOrders = SelectedOrders.map((order) => {
      return { ...order, service_type: "", courier_type: "", selected: true };
    });

    // // add correct_city property
    // newOrders = newOrders.map((order) => {
    //   if (order.billing_address.city) {
    //     return {
    //       ...order,
    //       correct_city:
    //     };
    //   }
    // });
    let a = LEOPARDS_CITY_LIST.find(
      (city) => city.name.toLowerCase() === "lahore"
    );
    console.log(a);

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

  const closeModal = () => {
    // Unselect all the orders

    const newOrders = editedOrders.map((order) => {
      return { ...order, selected: false };
    });
    setEditedOrders(newOrders);

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
    console.log(ul, li);

    ul.classList.add("scale-0");
    // ul.classList.add("h-[1px]")
    setTimeout(() => {
      ul.classList.add("opacity-0");
    }, 100);
    setTimeout(() => {
      ul.classList.add("hidden");
    }, 200);
  };

  const removeSpecialCharacter = (str) => str.replace(/[^a-zA-Z]/g, "");

  const bookOrder = async (e) => {
    e.preventDefault();

    if (options.courier === "") {
      alert("Select Courier");
      return;
    }

    // axios.post("http://localhost:4000/cancel", [1, 2, 3]).then((res) => {
    //   console.log("Res",res)
    // });
    // return;

    axios.post("http://localhost:4000/cancel", [1, 2, 3, 3]).then((res) => {
      setBookedOrdersData(res.data);
      let pdfBytes = Object.values(res.data.pdfBytes);
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-slip.pdf"; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

    return 1;

    console.log("BOOKED");
    // send req to backened to book orders

    // send only those orders which are selected and have correct_city
    const selectedOrders = editedOrders.filter(
      (order) => order.selected && order.correct_city != undefined
    );
    console.log("s", selectedOrders);

    // // if selected orders exceed 10 then use a loop to send 10 orders at a time
    // if (selectedOrders.length > 100) {
    //   let i = 0;
    //   while (i < selectedOrders.length) {
    //     const req = await axios
    //       .post("http://localhost:4000/orders", {
    //         orders: selectedOrders.slice(i, i + 100),
    //       })
    //       .then((res) => {
    //         setBookedOrdersData(res.data);
    //         let pdfBytes = Object.values(res.data.pdfBytes);
    //         const blob = new Blob([new Uint8Array(pdfBytes)], {
    //           type: "application/pdf",
    //         });
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = `NEW-${i}-${
    //           i + selectedOrders.slice(i, i + 100).length
    //         }.pdf`; // Set the desired file name
    //         document.body.appendChild(a);
    //         a.click();
    //         document.body.removeChild(a);
    //         window.URL.revokeObjectURL(url);
    //       });
    //     i += 100;
    //   }
    //   return;
    // }

    await axios
      .post("http://localhost:4000/orders", {
        orders: selectedOrders,
      })
      .then((res) => {
        setBookedOrdersData(res.data);
        let pdfBytes = Object.values(res.data.pdfBytes);
        const blob = new Blob([new Uint8Array(pdfBytes)], {
          type: "application/pdf",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated-slip.pdf"; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // window.URL.revokeObjectURL(url);
      });
  };

  return (
    <>
      <div
        ref={modal}
        className={`absolute transition-all left-24 -mt-14 opacity-0 duration-700 top-6 -translate-y-1 -translate-x-5  z-50 mx-auto  h-[90vh] w-[30rem] overflow-auto rounded-sm border-slate-700 bg-black md:w-11/12
        border-[1px] overflow-hidden
        `}
      >
        <form
          className={`${
            showEditModal ? ["blur-xl", "pointer-events-none"].join(" ") : ""
          } m-4 flex flex-row transition-all duration-700 justify-around gap-2 border-b-[1px] border-slate-500 px-3 py-3`}
        >
          <div className="flex flex-row gap-5 ">
            <select
              onChange={(e) => {
                setOptions({
                  courier: e.target.value,
                  serviceType: e.target.value === "" ? "" : "Overnight",
                });
              }}
              className="mt-1 h-10 rounded-lg border-2 border-slate-500 bg-black px-3 text-white"
            >
              <option className="bg-black text-blue-500" value="">
                Select Courier
              </option>
              <option
                defaultChecked
                className="bg-black text-blue-500"
                value="Leopards"
              >
                Leopards
              </option>
              <option className="bg-black text-blue-500" value="TCS">
                TCS
              </option>
            </select>

            {/* Serivce Type (Overland, Detain etc) */}

            <select
              ref={orderOptionRef}
              disabled={options.courier === ""}
              onChange={(e) => {
                setOptions({
                  ...options,
                  serviceType: e.target.value,
                });
              }}
              value={
                editedOrders.every(
                  (order) => order.service_type === options.serviceType
                )
                  ? options.serviceType
                  : "Customized"
              }
              className="mt-1 h-10 rounded-lg border-2 border-slate-500 bg-black px-3 text-white"
            >
              <option disabled className="bg-black text-slate-500" value="">
                --
              </option>
              <option
                disabled={editedOrders.every(
                  (ord) => ord.service_type === options.serviceType
                )}
                className="bg-black text-slate-500"
                value="customized"
              >
                Customized
              </option>
              {shipmentType.leopards.map((type, index) => {
                return (
                  <option
                    key={type}
                    className="bg-black text-blue-500"
                    value={type}
                  >
                    {type}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            onClick={(e) => bookOrder(e)}
            className="rounded-md bg-blue-700 px-4 py-2 text-slate-100 hover:bg-blue-700"
          >
            Book Orders
          </button>
        </form>
        <svg
          onClick={() => closeModal()}
          className={` ${
            showEditModal ? ["blur-xl", "pointer-events-none"].join(" ") : ""
          } absolute transition-all duration-700 right-0 top-0 z-50 h-9 text-red-700 hover:text-red-800 cursor-pointer`}
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
            editedOrders.filter(
              (order) => order.selected && order.correct_city !== undefined
            ).length
          }
        </p>

        <div
          className={`${
            showEditModal ? ["blur-xl", "pointer-events-none"].join(" ") : ""
          } m-4 transition-all duration-700 translate-y-5 py-4  h-2/3  overflow-y-auto scroll-smooth`}
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

          <ul className="grid w-[60rem] grid-cols-13 font-bold text-slate-400 md:h-10 md:w-auto text-sm ">
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
                } mt-5 grid w-[65rem] transition-all duration-300 grid-cols-13 rounded-lg bg-zinc-900 pb-2 text-slate-300 md:w-auto h-14 text-sm  scroll-smooth `}
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
                  {order.shipping_address.phone
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

                  {options.courier === "" && (
                    <select
                      disabled
                      className="mt-1 h-10 w-32 rounded-lg border-slate-500 bg-zinc-800 outline-none border-0 px-3"
                      defaultValue="---"
                      name=""
                      id=""
                    >
                      <option value="---">---</option>
                    </select>
                  )}

                  {options.courier === "Leopards" && (
                    <select
                      onChange={(e) => {
                        let a = LEOPARDS_CITY_LIST.find(
                          (city) =>
                            removeSpecialCharacter(city.name).toLowerCase() ===
                            e.target.value.toLowerCase()
                        );
                        setEditedOrders((prevOrders) => {
                          return prevOrders.map((ord) => {
                            if (ord.id === order.id) {
                              return {
                                ...ord,
                                correct_city: a,
                              };
                            } else {
                              return ord;
                            }
                          });
                        });
                      }}
                      disabled={options.courier === "" ? true : false}
                      defaultValue={
                        // for every CITY_LIST
                        // if removeSpecialCharacter(city.name).toLowerCase() === order.billing_address.city.toLowerCase()
                        // make it selected
                        options.courier === "Leopards"
                          ? removeSpecialCharacter(
                              order.billing_address.city
                            ).toLowerCase()
                          : "---"
                      }
                      className="mt-1 h-10 w-32 rounded-lg border-slate-500 bg-zinc-800 outline-none border-0 px-3"
                    >
                      <option value="---">---</option>

                      {
                        options.courier === "Leopards" &&
                          LEOPARDS_CITY_LIST.map((city) => {
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
                          })
                        // if no courier is selected, dont show cities
                      }
                    </select>
                  )}
                  {/* 
                  / <select
                  //   disabled={options.courier === "" ? true : false}
                  //   defaultValue={
                      // for every CITY_LIST
                  //     // if removeSpecialCharacter(city.name).toLowerCase() === order.billing_address.city.toLowerCase()
                  //     // make it selected
                  //     options.courier === "Leopards" ?
                  //     removeSpecialCharacter(
                  //       order.billing_address.city
                  //     ).toLowerCase() : "---"
                    
                  //   }
                  //   className="mt-1 h-10 w-32 rounded-lg border-slate-500 bg-zinc-800 outline-none border-0 px-3"
                  // >
                  //   <option value="---">---</option>

                  //   {
                  //     options.courier === "Leopards" &&
                  //       LEOPARDS_CITY_LIST.map((city) => {
                  //         return (
                  //           <option
                  //             key={city.id}
                  //             id={city.id}
                  //             value={removeSpecialCharacter(
                  //               city.name
                  //             ).toLowerCase()}
                  //           >
                  //             {city.name}
                  //           </option>
                  //         );
                  //       })
                  //     // if no courier is selected, dont show cities
                  //   }
                  // </select> */}
                </li>
                <li className="flex items-center col-span-2 justify-center transition-all text-slate-300">
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

                      setEditedOrders(newOrders);
                    }}
                    disabled={options.serviceType === "" ? true : false}
                    defaultValue={options.serviceType === "" && "---"}
                    className="mt-1 h-10 w-32 rounded-lg border-slate-500 bg-zinc-800 outline-none border-0 px-3"
                  >
                    <option
                      disabled={options.serviceType !== "" ? true : false}
                      value="---"
                      className="bg-zinc-800 outline-none border-0"
                    >
                      --
                    </option>
                    {shipmentType.leopards.map((type) => {
                      if (type === order.service_type) {
                        return (
                          <option
                            key={type}
                            className="bg-zinc-800 outline-none border-0"
                            value={type}
                            selected
                          >
                            {type}
                          </option>
                        );
                      } else {
                        return (
                          <option
                            key={type}
                            className="bg-zinc-800 outline-none border-0"
                            value={type}
                          >
                            {type}
                          </option>
                        );
                      }
                    })}

                    {/* {leopardsShipmentType.map((type) => {
                      if (type === options.serviceType) {
                        return null;
                      } else {
                        return (
                          <option
                            key={type}
                            className="bg-zinc-800 outline-none border-0"
                            value={type}
                          >
                            {type}
                          </option>
                        );
                      }
                    })} */}
                  </select>
                </li>
                <li className="flex items-center justify-center">
                  {order.total_outstanding} PKR
                </li>
                <li
                  className={` ${
                    options.courier === "" ? "pointer-events-none" : ""
                  }  flex items-center justify-center`}
                >
                  <svg
                    onClick={() => openEditModal(order.id)}
                    className={`flex h-7 cursor-pointer items-center justify-center text-blue-400 hover:text-blue-700 ${
                      options.courier === "" &&
                      ["text-slate-700", "hover:text-slate-900"].join(" ")
                    } `}
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
        </div>

        <div
          className={`${
            showEditModal ? ["blur-xl", "pointer-events-none"].join(" ") : ""
          } absolute transition-all duration-700 top-16  z-50 hidden h-[60vh] w-[45rem] rounded-md border-[1px] border-violet-800 px-2 py-8 md:translate-x-2/4`}
        >
          <ul className="mt-2 grid h-5/6 grid-cols-2 gap-8 py-4 pl-16 text-slate-200">
            <li className="flex flex-col gap-2 text-xl">
              <label htmlFor="">City: </label>
              <input
                className="h-9 w-40 bg-slate-800 px-3 text-base outline-none ring-0"
                type="text"
              />
            </li>
            <li className="flex flex-col gap-2 text-xl">
              <label htmlFor="">COD Amount:</label>
              <input
                className="h-9 w-40 bg-slate-800 px-3 text-base outline-none ring-0"
                type="text"
              />
            </li>
            <li className="flex flex-col gap-2 text-xl">
              <label htmlFor="">Address: </label>
              <textarea
                className="h-24 w-52 resize-none bg-slate-800 py-1 text-base outline-none"
                cols="30"
                rows="10"
              ></textarea>
            </li>
            <li className="flex flex-col gap-2 text-xl">
              <label htmlFor="">Service Type: </label>

              {/* <input
                className="h-9 w-40 bg-slate-800 px-3 text-base outline-none ring-0"
                type="text"
              /> */}
            </li>

            <li>
              <button className="absolute right-12 rounded-md bg-blue-700 px-6 py-3 text-slate-100 hover:bg-blue-800">
                Save
              </button>
            </li>
          </ul>
          <svg
            className="absolute right-4 top-4 z-50 h-9 cursor-pointer text-red-700 hover:text-red-800"
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
      </div>
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
