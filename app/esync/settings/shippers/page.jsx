"use client";
import Link from "next/link";
import Nav from "../../components/Nav";
import { useEffect, useRef, useState } from "react";
import { getUser } from "../../actions/getUser";
import axios from "axios";
import LEOPARDS_CITIES from "../../LEOPARDS_CITIES";
import Notification from "../../components/Notification";

export default function Page() {
  const [showNotification, setShowNotification] = useState("");
  const [label, setLabel] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

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

  // User State
  const [user, setUser] = useState(null);

  //   Input Fields States
  const [showCustomInputBox, setShowCustomInputBox] = useState(false);
  const [shipperInfo, setShipperInfo] = useState({
    courierAccount: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    specialInstructions: "sku,quantity",
    shop: "",
    courierServices: [],
  });

  const inputRef = useRef(null);

  const [openShipperForm, setOpenShipperForm] = useState(false);

  const saveUser = async () => {
    const user = await getUser();

    const res = await axios.get("/api/server-url");
    const { serverURL } = res.data;

    const userRes = await axios.post(`${serverURL}/user`, {
      email: user.user.email,
    });

    setUser(userRes.data);
  };

  useEffect(() => {
    saveUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipperInfo({ ...shipperInfo, [name]: value });
  };

  const addShipper = async () => {
    if (
      !shipperInfo.courierAccount ||
      !shipperInfo.name ||
      !shipperInfo.email ||
      !shipperInfo.phone ||
      !shipperInfo.city ||
      !shipperInfo.address ||
      !shipperInfo.specialInstructions ||
      !shipperInfo.shop ||
      !shipperInfo.courierServices
    ) {
      setShowNotification("Incorrect Field");
      setLabel("Error");
      return;
    }
    setIsWaiting(true);

    console.log(shipperInfo);
    const selectedCourierAccount = user.Courier.find(
      (account) => account.id === Number(shipperInfo.courierAccount)
    );

    const { apiKey, password } = selectedCourierAccount.data;

    const res = await axios.get("/api/server-url");
    const { serverURL } = res.data;
    try {
      const response = await axios.post(`${serverURL}/add-shipper`, {
        userEmail: user.email,
        ...shipperInfo,
        apiKey,
        password,
      });
      console.log("res", response.data);
      if (response.status === 200) {
        setShowNotification("Shipper Added Successfully");
        setLabel("Success");
      }
    } catch (e) {
      console.log(e);
      setShowNotification(e.response.data.message);
      setLabel("Error");
    }
    setIsWaiting(false);
  };

  return (
    <main
      className={`grid md:h-screen grid-cols-6 bg-black relative  transition-all duration-1000  overflow-y-hidden`}
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
        className={`col-span-5  px-20 text-white transition-all duration-1000 overflow-y-auto`}
      >
        <ul className="mx-auto my-8 flex h-12 flex-row items-center justify-center gap-10 rounded-3xl text-xs">
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
        <div className=" border-rose-600 w-full 2xl:w-full grid grid-cols-2 gap-3 px-2 py-1 text-base">
          <ul className="flex flex-col gap-6">
            <li className="relative flex flex-row gap-2">
              {/* <select
                onChange={(e) => {
                  setShipperInfo({
                    ...shipperInfo,
                    courierAccount: e.target.value,
                  });
                }}
                disabled={!user}
                className="border-[1px] border-gray-700 bg-black px-3 py-2"
                name="courierAccount"
                defaultValue={"-"}
              >
                <option value="-">
                  {!user ? "Loading Accounts" : "Select Courier Account"}
                </option>
                {user &&
                  user.Courier.map((account) => {
                    return (
                      <option key={account.name} value={account.name}>
                        {account.name} ({account.id})
                      </option>
                    );
                  })}
              </select> */}
              <select
                disabled={!user}
                className="border-[1px] border-gray-700 bg-black px-3 py-2"
                name=""
                defaultValue={""}
              >
                <option disabled value="">
                  {!user ? "Loading Shippers" : "Add a new Shipper"}
                </option>
              </select>
              <svg
                onClick={() => {
                  setOpenShipperForm(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                data-slot="icon"
                className="mt-1 h-8 w-8 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
              </svg>{" "}
            </li>
            <li
              className={` transition-all duration-300  flex w-96 flex-col sm:flex-row gap-3 px ${
                openShipperForm ? "" : "scale-0"
              } mt-4 `}
            >
              <p>Name</p>
              <input
                ref={inputRef}
                onChange={handleChange}
                value={shipperInfo.name}
                className=" w-40 h-7 p-1 sm:w-auto sm:ml-auto border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900 "
                type="text"
                name="name"
              />
            </li>
            <li
              className={` transition-all duration-300  flex w-96 flex-col sm:flex-row gap-3 px ${
                openShipperForm ? "" : "scale-0"
              } `}
            >
              <p>Email</p>
              <input
                onChange={handleChange}
                value={shipperInfo.email}
                className="w-40 h-7 p-1 sm:w-auto sm:ml-auto  border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900 "
                type="text"
                name="email"
              />
            </li>
            <li
              className={` transition-all duration-300  flex w-96 flex-col sm:flex-row gap-3 px ${
                openShipperForm ? "" : "scale-0"
              } `}
            >
              <p>Phone</p>
              <input
                onChange={handleChange}
                value={shipperInfo.phone}
                className="w-40 h-7 p-1 sm:w-auto sm:ml-auto  border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900 "
                type="text"
                name="phone"
              />
            </li>
            <li
              className={` transition-all duration-300 -translate-x-2 flex w-96  flex-row gap-3 px-2 py-1 ${
                openShipperForm ? "" : "scale-0"
              } `}
            >
              <p className="" htmlFor="">
                City{" "}
              </p>
              <select
                onChange={(e) => {
                  setShipperInfo({
                    ...shipperInfo,
                    city: e.target.value,
                  });
                }}
                className="h-10 border-[1px] border-blue-400 bg-black px-2 text-slate-300 ml-auto"
                defaultValue={""}
                name=""
                id=""
              >
                <option value="">Select City</option>
                {LEOPARDS_CITIES.map((city) => {
                  return (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  );
                })}
              </select>
            </li>
            <li
              className={` transition-all duration-300 -translate-x-2 flex w-96  flex-row gap-3 px-2 py-1 ${
                openShipperForm ? "" : "scale-0"
              } `}
            >
              <p className="" htmlFor="">
                Address{" "}
              </p>
              <textarea
                onChange={handleChange}
                value={shipperInfo.address}
                className="border-white-400 ml-auto w-52 h-28 resize-none border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900"
                name="address"
              ></textarea>
            </li>
          </ul>
          <ul className="mt-[4.4rem] border-pink-400 flex flex-col gap-8">
            <li
              className={` transition-all duration-300  flex w-96 items-center flex-row gap-3 px-2 ${
                openShipperForm ? "" : "scale-0"
              } `}
            >
              <p className="" htmlFor="">
                {" "}
                Special Instructions{" "}
              </p>
              <select
                onChange={(e) => {
                  setShipperInfo({
                    ...shipperInfo,
                    specialInstructions: e.target.value,
                  });
                  if (e.target.value === "custom") {
                    setShowCustomInputBox(true);
                    setShipperInfo({
                      ...shipperInfo,
                      specialInstructions: "",
                    });
                  } else {
                    setShowCustomInputBox(false);
                  }
                }}
                className="h-10 border-[1px] border-blue-400 bg-black px-2 text-slate-300 ml-auto"
              >
                <option value="sku,quantity">SKU + Quantity</option>
                <option value="customer-notes">Customer Notes</option>
                <option value="custom">Custom</option>
              </select>
            </li>
            {showCustomInputBox && (
              <li className="">
                <p>Remarks for shipments: </p>
                <input
                  onChange={handleChange}
                  value={
                    shipperInfo.specialInstructions === "custom"
                      ? ""
                      : shipperInfo.specialInstructions
                  }
                  maxLength={60}
                  className="w-96 h-7 p-1 border-[1px] bg-black border-gray-700 outline-none  focus:border-0 focus:outline-1 focus:outline-blue-900"
                  type="text"
                  name="specialInstructions"
                />
              </li>
            )}
            <li
              className={` ${
                openShipperForm ? "" : "scale-0"
              } transition-all duration-300 flex w-60 flex-row gap-3 items-center px-2 py-1 lg:w-96`}
            >
              <p className="" htmlFor="">
                {" "}
                Shop{" "}
              </p>
              <select
                disabled={!user}
                onChange={handleChange}
                className="h-10 border-[1px] border-blue-400 bg-black px-2 text-slate-300 ml-auto"
                id=""
                defaultValue=""
                name="shop"
              >
                <option value="">Select Shop</option>
                {user &&
                  user.stores.map((shop) => {
                    if (shop.store_info.platform === "shopify") {
                      return (
                        <option key={shop.name} value={shop.name}>
                          {shop.name} ({"shopify"})
                        </option>
                      );
                    }
                  })}
              </select>
            </li>
            <li
              className={`flex w-96 flex-row gap-3 items-center px-2 py-1 lg:w-96
            ${openShipperForm ? "" : "scale-0"} transition-all duration-300
            `}
            >
              <p>Select Courier Services</p>
            </li>
            <li
              className={`flex flex-row items-center   gap-4 -mt-6 text-base w-96
                        ${
                          openShipperForm ? "" : "scale-0"
                        } transition-all duration-300
            `}
            >
              <input
                onChange={(e) => {
                  if (!e.target.checked) {
                    const courierServices = shipperInfo.courierServices.filter(
                      (service) => service !== e.target.value
                    );
                    setShipperInfo({
                      ...shipperInfo,
                      courierServices,
                      courierAccount: "",
                    });
                  } else {
                    setShipperInfo({
                      ...shipperInfo,
                      courierServices: [
                        ...shipperInfo.courierServices,
                        e.target.value,
                      ],
                      courierAccount: String(user.Courier[0].id),
                    });
                  }
                }}
                className="h-4 w-4"
                type="checkbox"
                disabled={!user}
                id="Leopards"
                name="Leopards"
                value="Leopards"
              />
              <label htmlFor="Leopards">Leopards</label>
              <input
                onChange={(e) => {
                  // remove the value from the array if the checkbox is unchecked

                  if (!e.target.checked) {
                    const courierServices = shipperInfo.courierServices.filter(
                      (service) => service !== e.target.value
                    );
                    setShipperInfo({
                      ...shipperInfo,
                      courierServices,
                    });
                  } else {
                    setShipperInfo({
                      ...shipperInfo,
                      courierServices: [
                        ...shipperInfo.courierServices,
                        e.target.value,
                      ],
                    });
                  }
                }}
                className="h-4 w-4"
                type="checkbox"
                disabled={!user}
                id="TCS"
                name="TCS"
                value="TCS"
              />
              <label htmlFor="TCS">TCS</label>
              <input
                onChange={(e) => {
                  if (!e.target.checked) {
                    const courierServices = shipperInfo.courierServices.filter(
                      (service) => service !== e.target.value
                    );
                    setShipperInfo({
                      ...shipperInfo,
                      courierServices,
                    });
                  } else {
                    setShipperInfo({
                      ...shipperInfo,
                      courierServices: [
                        ...shipperInfo.courierServices,
                        e.target.value,
                      ],
                    });
                  }
                }}
                className="h-4 w-4"
                type="checkbox"
                disabled={!user}
                id="DeepBlue"
                name="DeepBlue"
                value="DeepBlue"
              />
              <label htmlFor="DeepBlue">DeepBlue</label>
            </li>

            {shipperInfo.courierServices.includes("Leopards") && (
              <li className="flex w-96 flex-row gap-3 items-center px-2 py-1 lg:w-96">
                <p>Select your Leopards Account</p>
                <select
                  className="h-10 border-[1px] border-blue-400 bg-black px-2 text-slate-300 ml-auto"
                  name="courierAccount"
                  defaultValue={`${user.Courier[0].id}`}
                  onChange={(e) => {
                    setShipperInfo({
                      ...shipperInfo,
                      courierAccount: e.target.value,
                    });
                  }}
                >
                  {user.Courier.map((account) => {
                    if (account.name === "Leopards") {
                      return (
                        <option key={account.id} value={account.id}>
                          {account.name} ({account.id})
                        </option>
                      );
                    }
                  })}
                </select>
              </li>
            )}

            <button
              disabled={isWaiting}
              onClick={addShipper}
              className={`bg-green-700 disabled:pointer-events-none disabled:opacity-50 transition-all hover:bg-green-800 text-white py-2 px-3 w-32 rounded-md
              ${openShipperForm ? "" : "scale-0"} transition-all duration-300
              `}
            >
              Add Shipper
            </button>
          </ul>
        </div>
      </section>
      <Notification
        label={label}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </main>
  );
}
