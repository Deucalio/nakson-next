"use client";

import Nav from "../../components/esync/Nav";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import ImageCropper from "../actions/ImageCropper";
import { getUser } from "../../esync/actions/getUser";

const Shippers = () => {
  return (
    <>
      <section className="grid h-screen grid-cols-6 bg-black">
        <div className="col-span-1 bg-slate-900"></div>
        <div className="col-span-5 border-sky-500 px-20 text-white">
          <ul className="mx-auto my-8 flex h-12 flex-row items-center justify-center gap-12 rounded-3xl">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-slate-50"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li className="relative">
              <button className="flex h-8 w-32 flex-row items-center justify-center gap-2 rounded-2xl border-2 bg-white font-bold text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
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
                className="h-6 w-6 text-slate-50"
              >
                <path
                  fillRule="evenodd"
                  d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          </ul>

          <div className="flex flex-row w-96 py-1 px-2 gap-3">
            <select className="bg-black border-[1px] py-2 px-3" name="" id="">
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
              className="w-8 h-8 mt-1"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <p className="w-/ mb-5 border-b border-blue-900 py-5 text-2xl font-semibold tracking-wide">
            Shipping Details
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <ul className="flex w-2/3 flex-col gap-8 px-1 py-4 md:w-2/4">
              <li className="flex w-96 flex-row gap-3 px-2 py-1">
                <label htmlFor="">Name</label>
                <input
                  className="ml-auto border-[1px] bg-black opacity-60"
                  type="text"
                />
              </li>
              <li className="flex w-96 flex-row gap-3 px-2 py-1">
                <label htmlFor="">Email</label>
                <input
                  className="ml-auto border-[1px] bg-black opacity-60"
                  type="text"
                />
              </li>
              <li className="flex w-96 flex-row gap-3 px-2 py-1">
                <label htmlFor="">Phone</label>
                <input
                  className="ml-auto border-[1px] bg-black opacity-60"
                  type="text"
                />
              </li>
              <li className="flex w-96 flex-row gap-3 px-2 py-1">
                <label className="" htmlFor="">
                  Address
                </label>
                <textarea
                  className="h-28 ml-auto border-[1px] border-white-400 opacity-60 bg-black px-2 text-slate-300 resize-none"
                  name=""
                  id=""
                ></textarea>
              </li>
            </ul>

            <ul className="flex w-2/3 flex-col gap-8 px-1 py-4 md:w-2/4">
              <li className="flex w-96 flex-row gap-3 px-2 py-1">
                <label className="" htmlFor="">
                  Special Instructions
                </label>
                <select
                  className="ml-14 h-10 -translate-y-2 border-[1px] border-blue-400 bg-black px-2 text-slate-300 "
                  name=""
                  id=""
                >
                  <option value="">SKU + Quantity</option>
                  <option value="">Customer Notes</option>
                  <option value="">Custom</option>
                </select>
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
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("configuration");

  const saveUser = async () => {
    const user = await getUser();
    setUser(user);
  };

  useEffect(() => {
    saveUser();
  }, []);

  // Configuration for Shopify Store
  const [shopifyInfo, setShopifyInfo] = useState({
    shopName: "",
    shopLogo: "",
  });
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [shopifyToken, setShopifyToken] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [copiedText, setCopiedText] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handlePageClick = (e) => {
    const pageToBeViewed = e.target.getAttribute("name");
    setPage(pageToBeViewed);
  };

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setShopifyInfo({ ...shopifyInfo, shopLogo: file });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCrop = (croppedImageData) => {
    setCroppedImage(croppedImageData);
  };

  const randomString = (length) => {
    const result = [];
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  };

  // Write a function for RSA Encryption with the public key
  const RSA = (data, publicKey) => {
    const encryptedData = CryptoJS.AES.encrypt(data, publicKey).toString();
    return encryptedData;
  };

  const handleCopy = async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText(copiedText);
    setIsCopied(true);
    console.log("sad", copiedText);
  };

  const handleConnect = async (e) => {
    e.preventDefault();

    if (!shopifyInfo.shopName || !shopifyInfo.shopLogo) {
      // alert("sad ");
      setDisplayError(true);
      return;
    }

    // Connect Shopify Store

    setShowTokenModal(true);
    const token = randomString(6);
    setCopiedText(token);
    setShopifyToken(token);

    // 1. Save the Token in the User Database by sending a POST request to the server
    // const res = await axios.post(`${process.env.}/shopify/save-token`, {
    // const res = sendRequest("sad");
    console.log(
      "res",
      process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL
    );
  };

  return (
    <>
      <section
        className={`grid md:h-screen grid-cols-6 bg-black relative  transition-all duration-1000 ${
          showTokenModal ? ["blur-3xl", "pointer-events-none"].join(" ") : ""
        }`}
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

            <li
              name="shippers"
              onClick={(e) => handlePageClick(e)}
              className="cursor-pointer relative"
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

            <li
              name="configuration"
              onClick={(e) => handlePageClick(e)}
              className="cursor-pointer bg-slate-500 bg-opacity-60 rounded-md p-1"
            >
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
          </ul>

          {page === "shippers" && (
            <div className="flex w-96 flex-row gap-3 px-2 py-1 text-sm">
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
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          )}

          <p className="mb-3 border-b border-blue-900 py-2 text-base font-semibold tracking-wide">
            {
              {
                "personal-info": "Personal Information",
                shippers: "Shippers",
                configuration: "Configuration",
              }[page]
            }
          </p>

          {page === "configuration" && (
            <div className="flex flex-col  gap-1   border-slate-700 pb-5">
              <ul className="flex flex-col  gap-2  py-2 w-[30rem]  ">
                <li>
                  <Image
                    width={75}
                    height={75}
                    src="
                  https://i.imgur.com/MJGrMHP.png"
                    alt="Shopify Logo"
                  />
                </li>
                <ul className="relative rounded-lg  px-6 py-2">
                  <span
                    className={`absolute text-xs text-red-700 -top-2 transition-all duration-500 left-32 ${
                      displayError ? "" : "opacity-0"
                    }`}
                  >
                    You can't leave any fields empty
                  </span>
                  <li className=" flex flex-row mt-3 items-center gap-5  py-1 text-sm text-slate-500 font-semibold tracking-normal transition-all duration-200">
                    <p className="text-slate-300">Shop Name</p>
                    <input
                      placeholder="Enter Your Shop Name"
                      className="transition-all duration-300 h-10 w-44 rounded-md text-slate-300 placeholder:text-slate-400 placeholder:text-xs placeholder:text-opacity-35 placeholder:font-normal    bg-slate-900   px-3 py-1 outline-none outline-2 placeholder:opacity-50 focus:outline-indigo-800"
                      type="text"
                      value={shopifyInfo.shopName}
                      onChange={(e) =>
                        setShopifyInfo({
                          ...shopifyInfo,
                          shopName: e.target.value,
                        })
                      }
                    />
                  </li>
                  <li className=" flex flex-row gap-3  py-1 mt-3 text-sm font-semibold tracking-normal lg:flex-col transition-all duration-200  self-center"></li>
                  <li className=" relative flex flex-row gap-8 items-center first-letter:rounded-md ">
                    <p className="text-sm">Shop Logo</p>
                    <div
                      className={`border-2 border-blue-500 rounded-sm h-[130px] w-[130px] ${
                        shopifyInfo.shopLogo ? "bg-white" : "bg-black"
                      }`}
                    >
                      {" "}
                      {shopifyInfo.shopLogo && (
                        <Image
                          width={130}
                          height={130}
                          className="w-24 rounded-sm bg-cover bg-center"
                          src={URL.createObjectURL(shopifyInfo.shopLogo)}
                          alt="Uploaded Preview"
                        ></Image>
                      )}
                      <button>
                        <input
                          onChange={handleFileChange}
                          accept="image/*"
                          type="file"
                          id="img"
                          className="hidden"
                        />
                      </button>
                    </div>
                    <label
                      className="bg-blue-700 hover:bg-blue-800 transition-all duration-300 p-2 rounded-md cursor-pointer  text-xs  text-center"
                      htmlFor="img"
                    >
                      {shopifyInfo.shopLogo
                        ? shopifyInfo.shopLogo.name
                        : "Upload Logo"}
                    </label>
                  </li>

                  <li
                    onClick={handleConnect}
                    className=" flex flex-row -mt-1 gap-3 px-2 py-1 text-sm font-semibold tracking-normal items-center justify-center ml-[90px] w-40"
                  >
                    <button className="rounded-md bg-violet-700 px-4 py-2 text-slate-100 hover:bg-violet-800 mt-8">
                      Connect Shop
                    </button>
                  </li>
                </ul>
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
                <li className="flex w-96 flex-row gap-3 px-2 py-1">
                  <p className="" htmlFor="">
                    Address{" "}
                  </p>
                  <textarea
                    className="border-white-400 ml-auto h-28 resize-none border-[1px] bg-black px-2 text-slate-300 opacity-60"
                    name=""
                    id=""
                  ></textarea>
                </li>
              )}
            </ul>
            {page === "personal-info" && (
              <ul className="flex w-2/3 flex-col gap-8 px-1 py-4 text-sm md:w-2/4 lg:ml-11 xl:-ml-7">
                <li className="flex w-96 flex-col sm:flex-row gap-3 px-2 py-1">
                  {/* <label htmlFor=""></label> */}
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
              <ul className="flex w-2/3 flex-col gap-8 px-1 py-4 md:w-2/4 text-sm">
                <li className="flex w-96 flex-row gap-3 px-2 py-1">
                  <p className="" htmlFor="">
                    {" "}
                    Special Instructions{" "}
                  </p>
                  <select
                    className="ml-14 h-10 -translate-y-2 border-[1px] border-blue-400 bg-black px-2 text-slate-300"
                    name=""
                    id=""
                  >
                    <option value="">SKU + Quantity</option>
                    <option value="">Customer Notes</option>
                    <option value="">Custom</option>
                  </select>
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
            )}
          </div>
        </div>
      </section>

      {/* TOKEN DIV */}
      <div
        className={`absolute bg-black left-1/3 top-24 z-10 h-[19rem] w-[28rem] transition-all duration-700 rounded-md border-2 border-indigo-950 ${
          showTokenModal ? "" : ["opacity-0", "pointer-events-none"].join(" ")
        }`}
      >
        <ul className="relative flex h-full flex-col items-center py-6 text-slate-100">
          <li
            onClick={() => {
              setIsCopied(false);
              setShowTokenModal(false);
            }}
            className="absolute right-3 top-2 text-red-700 border-2 border-red-700 rounded-2xl cursor-pointer hover:text-red-800 hover:border-red-800 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </li>
          <li className="">
            <p>Your Shopify Token is</p>
          </li>
          <li className="my-6">
            <div className="relative h-[1.9rem] w-52 rounded-lg border-2 border-blue-600 bg-gray-950 px-2 text-lg text-white">
              {shopifyToken}
              <button
                onClick={handleCopy}
                className="absolute right-0 overflow-hidden rounded-md bg-blue-600 px-4 text-white"
              >
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>
          </li>
          <li className="mt-3 text-base p-2 w-72 ml-16">
            <p>You'll need this token on your Shopify App.</p>
          </li>
          <li className="translate-y-6">
            <button className="rounded-md bg-green-700 px-4 py-2 transition-all hover:bg-green-800 ml-2">
              Click to Proceed
            </button>
          </li>
        </ul>
      </div>

      {/* _____________ */}

      <div className="absolute z-10 border-2 border-indigo-700 top-16 left-1/3 h-[28rem] w-[35rem] hidden ">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleCrop(URL.createObjectURL(e.target.files[0]))}
          />

          {croppedImage && (
            <button onClick={() => setCroppedImage(null)}>
              Clear Cropped Image
            </button>
          )}
          {croppedImage && (
            <ImageCropper imageSrc={croppedImage} onCrop={handleCrop} />
          )}

          <div className="p-4">
            {croppedImage && (
              <div className="h-36 w-36 bg-white border-2 rounded-md">
                <img
                  className="h-32 w-32"
                  src={croppedImage}
                  alt="Cropped Image"
                />
              </div>
            )}
            {croppedImage && <p>Cropped Image Preview</p>}
          </div>
        </div>
      </div>
    </>
  );
}
