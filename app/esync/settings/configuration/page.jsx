"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import ImageCropper from "../../actions/ImageCropper";
import { getUser } from "../../actions/getUser";
import shopifyLogo from "../../../images/shopify-logo.png";
import ConnectStoreModal from "../../components/shopify/ConnectStoreModal"; // Fixed the casing of the import

import Nav from "../../components/Nav";
import { generateStockChecklist } from "../generateStockChecklist";
import { saveInsideCookies } from "../saveInsideCookies";
import LEOPARDS_CITIES from "../../LEOPARDS_CITIES";
import Notification from "../../components/Notification";

export default function Page() {
  // Show Notification
  const [showNotification, setShowNotification] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShowNotification(false);
    }, 6000); // 6 seconds
    return () => clearTimeout(timeout);
  }, [showNotification]);

  // waiting for api Call
  const [waiting, setWaiting] = useState(true);

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

  const [user, setUser] = useState(null);
  const [page, setPage] = useState("configuration");

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds
    return () => clearTimeout(timeout);
  }, [isLoading]);

  const spanRef = useRef(null);

  const saveUser = async () => {
    const user = await getUser();
    setUser(user);
  };

  // TCS State and Refs
  const [openTCSModal, setOpenTCSModal] = useState(false);
  const [tcsInfo, setTCSInfo] = useState({
    userName: "",
    password: "",
    accountNumber: "",
  });

  const [showConnectedTCSAccount, setShowConnectedTCSAccount] = useState(false);
  const [tcsAccounts, setTCSAccounts] = useState(null);

  // Leopards State and Refs
  const [openLeopardsModal, setOpenLeopardsModal] = useState(false);
  const [leopardsInfo, setLeopardsInfo] = useState({
    apiKey: "",
    password: "",
  });
  const [showConnectedLeopardsAccount, setShowConnectedLeopardsAccount] =
    useState(false);

  const [leopardsAccounts, setLeopardsAccounts] = useState(null);

  const leopardsSpanRef = useRef(null);

  // ______

  // Configuration for Shopify Store
  const searchParams = useSearchParams();

  const accesstoken = searchParams.get("accesstoken") || "";
  const shop = searchParams.get("shop") || "";

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
  const [showConnectedStores, setShowConnectedStores] = useState(false);
  const [connectStoreModal, setConnectStoreModal] = useState(false);

  // Stores user added to the database
  const [stores, setStores] = useState(null);

  // Daraz States
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showConnectedStoresDaraz, setShowConnectedStoresDaraz] =
    useState(false);
  const [storesDaraz, setStoresDaraz] = useState(null);

  useEffect(() => {
    saveUser();

    if (accesstoken && shop) {
      setConnectStoreModal(true);
    }
  }, []);

  const getStores = async () => {
    console.log("stores: ", stores);

    if (!user) {
      return;
    }
    setShowConnectedStores(!showConnectedStores);

    if (stores) {
      return;
    }

    setWaiting(true);

    // If the stores array is empty, make a request to the server to get the stores
    try {
      const res = await axios.get("/api/server-url");
      const { serverURL } = res.data;
      const response = await axios.post(`${serverURL}/shopify/get-stores`, {
        email: user.user.email,
      });
      setStores(response.data.stores);
    } catch {
      alert("Error Fetching Stores");
    }
    setWaiting(false);
  };

  const handlePageClick = (e) => {
    const pageToBeViewed = e.target.getAttribute("name");
    setPage(pageToBeViewed);
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
      spanRef.current.textContent = "You can't leave any fields empty";
      setDisplayError(true);
      return;
    }
    setIsLoading(true);

    // 1. Save the Token in the User Database by sending a POST request to the server
    const res = await axios.get("/api/server-url");
    const { serverURL } = res.data;

    try {
      const response = await axios.post(`${serverURL}/shopify/validate-name`, {
        shopName: shopifyInfo.shopName,
      });
      // setShowTokenModal(true);
      // const token = randomString(6);
      // setCopiedText(token);
      // setShopifyToken(token);
      setDisplayError(false);

      // Save the Image to the Cloudinary API
      const formData = new FormData();
      formData.append("file", shopifyInfo.shopLogo);
      formData.append("upload_preset", "g2yc1e2e");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dvksijeuj/upload",
        formData
      );
      const { secure_url: imageURL, public_id: publicID } = res.data;

      try {
        const finalRes = await axios.post(`${serverURL}/shopify/save-store`, {
          email: user.user.email,
          storeName: shopifyInfo.shopName,
          imageURL,
          publicID,
          accesstoken,
          shop,
        });
        setShopifyInfo({ shopName: "", shopLogo: "" });
        console.log("finalRes", finalRes);
        // Close the modal
        setConnectStoreModal(false);
      } catch (e) {
        console.log(e);
        alert("ERROR ADDING TO DATABASE");
        return;
      }
    } catch (e) {
      if (e.response.status === 400) {
        spanRef.current.textContent = "Name Already Taken";
        setDisplayError(true);
      }
      console.log(e);
      return;
    }

    // const response = await axios.post(`${serverURL}/shopify/save-token`, {
    //   email: user.user.email,
    //   token: token,
    // });
  };

  const connectDarazStore = async () => {
    const url = `https://api.daraz.pk/oauth/authorize?response_type=code&force_auth=true&redirect_uri=https://nakson.services/Setting/darazcallback&client_id=501634`;

    // Save the userInfo inside cookies
    saveInsideCookies(userInfo);

    // Redirect to the daraz store
    window.open(url, "_blank");

    // Close the Daraz Modal
    setShowEmailModal(false);
    setUserInfo({ name: "", email: "" });
  };

  const getStoresDaraz = async () => {
    setShowConnectedStoresDaraz(!showConnectedStoresDaraz);
    if (!user) {
      return;
    }

    if (storesDaraz) {
      return;
    }

    setWaiting(true);

    // If the stores array is empty, make a request to the server to get the stores
    try {
      const res = await axios.get("/api/server-url");
      const { serverURL } = res.data;
      const response = await axios.post(`${serverURL}/daraz/get-stores`, {
        email: user.user.email,
      });
      setStoresDaraz(response.data.stores);
    } catch {
      alert("Error Fetching Stores");
    }
    setWaiting(false);
  };

  const showLeopardsModal = async () => {
    showError("", leopardsSpanRef);
    setOpenLeopardsModal(true);
    return 1;
  };

  const connectLeopardsAccount = async () => {
    console.log("info: ", leopardsInfo);
    if (!leopardsInfo.apiKey || !leopardsInfo.password) {
      setShowNotification("Incorrect Field");
      setLabel("Error");
      return;
    }

    setIsLoading(true);

    // Send response to the server
    const res = await axios.get("/api/server-url");
    const { serverURL } = res.data;

    try {
      const response = await axios.post(`${serverURL}/leopards/add-account`, {
        ...leopardsInfo,
        email: user.user.email,
      });

      setIsLoading(false);

      setLeopardsInfo({
        apiKey: "",
        password: "",
      });
      setOpenLeopardsModal(false);
      setShowNotification("Success");
      setLabel("Success");
    } catch (e) {
      // showError(e.response.data.message, leopardsSpanRef);
      setShowNotification(e.response.data.message);
      setLabel("Error");
      return;
    }
  };

  const connectTCSAccount = async () => {
    if (!tcsInfo.userName || !tcsInfo.password || !tcsInfo.accountNumber) {
      setShowNotification("Incorrect Field");
      setLabel("Error");
      return;
    }
    setIsLoading(true);
    console.log("tcsAccounts: ", tcsInfo);

    const res = await axios.get("/api/server-url");
    const { serverURL } = res.data;

    try {
      const tcsRes = await axios.post(`${serverURL}/tcs/add-account`, {
        ...tcsInfo,
        email: user.user.email,
      });
      console.log("tcsRes: ", tcsRes.data);
      setIsLoading(false);
      setTCSInfo({
        userName: "",
        password: "",
        accountNumber: "",
      });
      setShowNotification("TCS Account Added");
      setLabel("Success");
      setOpenTCSModal(false);
    } catch (e) {
      console.log("Error adding TCS Account: ", e);
      setShowNotification(e.response.data.message);
      setLabel("Error");
    }
  };

  const getTCSAccounts = async () => {
    setShowConnectedTCSAccount(true);
    setTCSAccounts(null);
    if (!user) {
      return;
    }

    setWaiting(true);

    // If the stores array is empty, make a request to the server to get the stores
    try {
      const res = await axios.get("/api/server-url");
      const { serverURL } = res.data;
      const response = await axios.post(`${serverURL}/tcs/get-accounts`, {
        email: user.user.email,
      });
      console.log("response: ", response);
      setTCSAccounts(
        response.data.accounts.filter((acc) => acc.name === "TCS")
      );
    } catch (e) {
      if (e.response.status === 409) {
        console.log("e:", e);

        alert("Error Fetching Stores");
      }
    }
    setWaiting(false);
  };

  const getLeopardsAccount = async () => {
    setShowConnectedLeopardsAccount(!showConnectedLeopardsAccount);
    setLeopardsAccounts(null);
    if (!user) {
      return;
    }

    setWaiting(true);

    // If the stores array is empty, make a request to the server to get the stores
    try {
      const res = await axios.get("/api/server-url");
      const { serverURL } = res.data;
      const response = await axios.post(`${serverURL}/leopards/get-accounts`, {
        email: user.user.email,
      });
      console.log("response: ", response);

      setLeopardsAccounts(response.data.accounts);
    } catch (e) {
      if (e.response.status === 409) {
        console.log("e:", e);

        alert("Error Fetching Stores");
      }
    }
    setWaiting(false);
  };

  async function showError(text, spanRef) {
    spanRef.current.textContent = text;
  }

  if (!user) {
    // Display a loading spinner
    return (
      <span className="loader absolute left-1/2 -translate-x-48 top-40 "></span>
    );
  }

  return (
    <>
      <section
        className={`grid md:h-screen grid-cols-6 bg-black relative  transition-all duration-1000 ${
          showTokenModal ||
          showConnectedStores ||
          connectStoreModal ||
          showEmailModal ||
          showConnectedStoresDaraz ||
          openLeopardsModal ||
          showConnectedLeopardsAccount ||
          openTCSModal ||
          showConnectedTCSAccount
            ? ["blur-sm", "pointer-events-none"].join(" ")
            : ""
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
          className={`col-span-5  px-20 text-white transition-all duration-1000 `}
        >
          <ul className="mx-auto my-8 flex h-12 flex-row items-center justify-center gap-12 rounded-3xl text-xs">
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
              <li name="shippers" className="cursor-pointer relative">
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
              <li
                name="configuration"
                className="cursor-pointer bg-zinc-800  text-gray-400 rounded-md p-2"
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
            </Link>
          </ul>

          <p className="mb-3 border-b border-blue-900 py-2 text-base font-semibold tracking-wide">
            Configuration
          </p>

          {page === "configuration" && (
            <>
              <section className="grid grid-cols-8 gap-8  ">
                <div className="col-span-4 flex flex-col  gap-1   border-slate-700 pb-5">
                  <ul className="flex flex-col  gap-2  py-2 w-full  ">
                    <li className="flex flex-row gap-3 items-center">
                      <Image
                        className="h-[75px] w-[75px]"
                        width={75}
                        height={75}
                        src={shopifyLogo}
                        alt="Shopify Logo"
                      />
                      <button
                        onClick={getStores}
                        className="bg-green-600 hover:bg-green-700 transition-all text-xs px-2 py-2 rounded-md h-8 self-center"
                      >
                        Show Connected Stores
                      </button>

                      <button
                        onClick={generateStockChecklist}
                        className="bg-indigo-600 hover:bg-green-800 transition-all text-xs px-2 py-2 rounded-md h-8 self-center pointer-events-none opacity-30"
                      >
                        Generate Stockchecklist
                      </button>
                    </li>
                    <li className="text-sm text-gray-100 flex flex-col items-center gap-2">
                      <p>
                        To connect your store please visit our shopify app{" "}
                        <span className="   border-opacity-25 py-2  text-green-500 transition-all hover:text-green-600 cursor-pointer">
                          Click Here
                        </span>
                      </p>
                    </li>
                    <ul className="relative rounded-lg py-2 hidden ">
                      <span
                        ref={spanRef}
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
                        <button
                          disabled={isLoading}
                          className="disabled:bg-opacity-50 rounded-md bg-violet-700 px-4 py-2 text-slate-100 hover:bg-violet-800 mt-8"
                        >
                          {isLoading ? "Connecting..." : "Connect"}
                        </button>
                      </li>
                    </ul>
                  </ul>
                  <ul className="flex flex-col  gap-2  py-2  ">
                    <li className="flex flex-row gap-3 items-center">
                      <Image
                        className="h-full"
                        width={105}
                        height={110}
                        src="https://i.imgur.com/bK6ZSYI.png"
                        alt="Shopify Logo"
                      />
                      <button
                        onClick={getStoresDaraz}
                        className="bg-orange-700 hover:bg-orange-800 transition-all text-xs px-2 py-2 rounded-md h-8 self-center"
                      >
                        Show Connected Stores
                      </button>
                    </li>
                    <li className="text-sm text-gray-100 flex flex-col items-center gap-2">
                      <p>
                        To connect your Daraz store, log in to your seller
                        center account then{" "}
                        <span
                          onClick={() => setShowEmailModal(true)}
                          className="   border-opacity-25 py-2  text-orange-500 transition-all hover:text-orange-600 cursor-pointer"
                        >
                          Click Here
                        </span>
                      </p>
                    </li>
                    <ul className="relative rounded-lg  px-6 py-2 hidden ">
                      <span
                        ref={spanRef}
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
                        <button
                          disabled={isLoading}
                          className="disabled:bg-opacity-50 rounded-md bg-violet-700 px-4 py-2 text-slate-100 hover:bg-violet-800 mt-8"
                        >
                          {isLoading ? "Connecting..." : "Connect"}
                        </button>
                      </li>
                    </ul>
                  </ul>
                </div>

                <div className=" p-4 border-gray-700 bg-slate-900 rounded-2xl col-span-4">
                  <ul className="flex flex-col  gap-2  py-2 w-full items-center ">
                    <li className="flex flex-row gap-3 items-center">
                      <Image
                        className="h-full rounded-lg"
                        width={75}
                        height={75}
                        src={"https://i.imgur.com/m0coPha.jpeg"}
                        alt="Leopards Logo"
                      />
                      <button
                        onClick={() => getLeopardsAccount()}
                        className="bg-amber-400 hover:bg-amber-500 transition-all text-xs p-2 rounded-md h-8 self-center text-black font-semibold"
                      >
                        Show Connected Accounts
                      </button>
                    </li>
                    <li className="text-sm text-gray-100 flex flex-col items-center gap-2">
                      <p>
                        To connect your Leopards Account,{" "}
                        <span
                          onClick={() => showLeopardsModal()}
                          className="   border-opacity-25 py-2  text-amber-500 transition-all hover:text-amber-600 cursor-pointer"
                        >
                          Click Here
                        </span>
                      </p>
                    </li>
                  </ul>
                  <ul className="flex flex-col  gap-2  py-2 w-full items-center ">
                    <li className="flex flex-row gap-3 items-center">
                      <Image
                        className="h-full rounded-lg"
                        width={75}
                        height={75}
                        src="https://i.imgur.com/ph59e96.png"
                        alt="TCS Logo"
                      />

                      <button
                        onClick={() => getTCSAccounts()}
                        className="bg-red-700 hover:bg-red-800 transition-all text-xs p-2 rounded-md h-8 self-center  "
                      >
                        Show Connected Accounts
                      </button>
                    </li>
                    <li className="text-sm text-gray-100 flex flex-col items-center gap-2">
                      <p>
                        To connect your TCS Account,{" "}
                        <span
                          onClick={() => {
                            setOpenTCSModal(true);
                          }}
                          className="   border-opacity-25 py-2  text-red-700 transition-all hover:text-red-800 cursor-pointer"
                        >
                          Click Here
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
            </>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2">
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
          </div>
        </div>
      </section>
      <ConnectStoreModal
        spanRef={spanRef}
        handleConnect={handleConnect}
        isLoading={isLoading}
        shopifyInfo={shopifyInfo}
        setShopifyInfo={setShopifyInfo}
        handleFileChange={handleFileChange}
        displayError={displayError}
        connectStoreModal={connectStoreModal}
        setConnectStoreModal={setConnectStoreModal}
      />

      {/* LEOPARDS MODAL */}
      <div
        className={`absolute overflow-y-auto top-24 z-10 flex h-[23rem] items-center w-[40rem] flex-col  rounded-md border border-amber-300 border-opacity-40 bg-black p-2 text-white transition-all duration-300 md:left-1/3 
      md:-translate-x-11 ${
        openLeopardsModal ? "" : ["opacity-0", "pointer-events-none"].join(" ")
      }   `}
      >
        <svg
          onClick={() => {
            setDisplayError(false);
            showError("", leopardsSpanRef);
            setLeopardsInfo({ apiKey: "", password: "" });
            setOpenLeopardsModal(false);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`h-9 ${isLoading && "pointer-events-none"} 
           cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <ul className="mx-auto mt-10 flex h-fit w-[36rem] flex-col gap-3 px-3 py-6">
          <li className="my-4 gap-8 p-2 text-sm flex flex-col items-center ">
            <input
              className="w-2/4 bg-black text-slate-200 py-2 border-amber-300 border-opacity-40 border px-3 rounded-md outline-none outline placeholder:opacity-50 focus:outline-0"
              placeholder="API Key: "
              type="text"
              name="key"
              value={leopardsInfo.apiKey}
              onChange={(e) =>
                setLeopardsInfo({ ...leopardsInfo, apiKey: e.target.value })
              }
            />
            <input
              name="password"
              value={leopardsInfo.password}
              onChange={(e) =>
                setLeopardsInfo({ ...leopardsInfo, password: e.target.value })
              }
              className="w-2/4 bg-black text-slate-200 py-2 border-amber-300 border-opacity-40 border px-3 rounded-md outline-none outline placeholder:opacity-50 focus:outline-0"
              placeholder="API Password: "
              type="password"
            />

            <button
              disabled={isLoading}
              onClick={connectLeopardsAccount}
              className="py-3 px-8 disabled:opacity-50 disabled:pointer-events-none rounded-lg bg-amber-600 transition-all hover:bg-amber-800"
            >
              {isLoading ? "Adding your Account..." : "Add Account"}
            </button>
            <span
              ref={leopardsSpanRef}
              className={`absolute text-sm text-red-700 bottom-8 transition-all duration-500 left-52"
              }`}
            ></span>
          </li>
        </ul>
      </div>

      {/* TCS MODAL */}
      <div
        className={`absolute overflow-y-auto top-24 z-10 flex h-[26rem] items-center w-[40rem] flex-col  rounded-md border border-red-700 border-opacity-40 bg-black p-2 text-white transition-all duration-300 md:left-1/3 
      md:-translate-x-11 ${
        openTCSModal ? "" : ["opacity-0", "pointer-events-none"].join(" ")
      }   `}
      >
        <svg
          onClick={() => {
            setTCSInfo({ userName: "", password: "", accountNumber: "" });
            setOpenTCSModal(false);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`h-9 ${isLoading && "pointer-events-none"} 
           cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <ul className="mx-auto mt-10 flex h-fit w-[36rem] flex-col gap-2 px-3 py-6">
          <li className="my-4 gap-8 p-2 text-sm flex flex-col items-center ">
            <input
              className="w-2/4 bg-black text-slate-200 py-2 border-red-800 border-opacity-40 border px-3 rounded-md outline-none outline placeholder:opacity-60 focus:outline-0"
              placeholder="Username: "
              type="text"
              name="userName"
              value={tcsInfo.userName}
              onChange={(e) =>
                setTCSInfo({ ...tcsInfo, userName: e.target.value })
              }
            />
            <input
              className="w-2/4 bg-black text-slate-200 py-2 border-red-800 border-opacity-40 border px-3 rounded-md outline-none outline placeholder:opacity-60 focus:outline-0"
              placeholder="Accout Number: "
              type="text"
              name="accountNumber"
              value={tcsInfo.accountNumber}
              onChange={(e) =>
                setTCSInfo({ ...tcsInfo, accountNumber: e.target.value })
              }
            />

            <input
              name="password"
              value={tcsInfo.password}
              onChange={(e) =>
                setTCSInfo({ ...tcsInfo, password: e.target.value })
              }
              className="w-2/4 bg-black text-slate-200 py-2 border-red-800 border-opacity-40 border px-3 rounded-md outline-none outline placeholder:opacity-60 focus:outline-0"
              placeholder="Password: "
              type="password"
            />
            <button
              disabled={isLoading}
              onClick={connectTCSAccount}
              className="py-3 px-8 disabled:opacity-50 disabled:pointer-events-none rounded-lg bg-rose-700 transition-all hover:bg-rose-800"
            >
              {isLoading ? "Adding your Account..." : "Add Account"}
            </button>
          </li>
        </ul>
      </div>

      {/* ____________ */}

      {/* DARAZ EMAIL MODAL */}

      <div
        className={`absolute overflow-y-auto top-24 z-10 flex h-[23rem] items-center w-[40rem] flex-col  rounded-md border-2 border-indigo-950 bg-black p-2 text-white transition-all duration-700 md:left-1/3 
      md:-translate-x-11 ${
        showEmailModal ? "" : ["opacity-0", "pointer-events-none"].join(" ")
      }   `}
      >
        <svg
          onClick={() => setShowEmailModal(false)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-9 cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <ul className="mx-auto mt-10 flex h-fit w-[36rem] flex-col gap-3 px-3 py-6">
          <li className="my-4 gap-8 p-2 text-sm flex flex-col items-center ">
            <input
              className="w-2/4 bg-black text-slate-200 py-2 border-2 border-blue-900 px-3 rounded-md outline-none outline placeholder:opacity-50 focus:outline-0"
              placeholder="Store Name: "
              type="text"
              name="name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
            <input
              name="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="w-2/4 bg-black text-slate-200 py-2 border-2 border-blue-900 px-3 rounded-md outline-none outline placeholder:opacity-50 focus:outline-0"
              placeholder="Email: "
              type="text"
            />

            <button
              onClick={() => connectDarazStore()}
              className="py-3 px-8 rounded-lg bg-orange-700 transition-all hover:bg-orange-800"
            >
              Authorize
            </button>
          </li>
        </ul>
      </div>

      {/* ______ */}

      {/* CONNECTED STORES SHOPIFY */}

      <div
        className={`absolute overflow-y-auto overflow-x-hidden top-24 z-10 flex h-[23rem] w-[40rem] flex-col border border-green-900 bg-black p-2 text-white transition-all duration-700 md:left-1/3 
      md:-translate-x-11 ${
        showConnectedStores
          ? ""
          : ["opacity-0", "pointer-events-none"].join(" ")
      }   `}
      >
        {waiting && (
          <>
            <svg
              onClick={() => setShowConnectedStores(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <span className="loader absolute left-1/2 -translate-x-48 top-40 "></span>
          </>
        )}

        {stores?.length === 0 && (
          <>
            <p>No Store Connected</p>
            <svg
              onClick={() => setShowConnectedStores(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </>
        )}

        {stores?.length !== 0 &&
          stores?.map((store, index) => (
            <ul
              key={store.id}
              className="ml-8 mt-10 flex h-fit w-[36rem] flex-col gap-3 border-b border-slate-500 px-3 py-6"
            >
              <li
                onClick={() => setShowConnectedStores(false)}
                className={`
                ${index > 0 ? "hidden" : ""}
                absolute right-3 top-2 cursor-pointer rounded-2xl border-2 border-red-700 text-red-700 transition-all hover:border-red-800 hover:text-red-800`}
              >
                <svg
                  onClick={() => setShowConnectedStores(false)}
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
              <li className="flex flex-row items-center gap-3 relative h-24">
                <Image
                  className=" rounded-md border border-gray-50 bg-gray-50"
                  src={store.image_url}
                  width={100}
                  height={100}
                  alt="Store Logo"
                ></Image>
                <p className="ml-2">{store.name}</p>

                <div className="absolute items-center flex flex-row justify-center gap-10 text-xs -top-1 -right-4  w-60  h-24  ">
                  <button className="bg-blue-800 rounded-md px-2 py-2 hover:bg-blue-900 transition-all">
                    Update
                  </button>
                  <button
                    onClick={async () => {
                      setIsLoading(true);
                      // Remove the store from the database
                      const res = await axios.get("/api/server-url");
                      const { serverURL } = res.data;
                      const response = await axios.delete(
                        `${serverURL}/shopify/delete-store/${store.name}`
                      );
                      if (response.status === 200) {
                        // Send user to esync/settings and reload the page
                        window.location.href = "/esync/settings/configuration";
                        // win
                      }
                    }}
                    disabled={isLoading}
                    className={`bg-red-800 rounded-md px-2 py-2 hover:bg-red-900 transition-all disabled:bg-opacity-50 `}
                  >
                    Remove
                  </button>
                </div>
              </li>
              <li className="my-4 grid grid-cols-7 gap-8 border-l-2 border-indigo-600 p-2 text-sm ">
                <p className="col-span-2 text-gray-300">Access Token</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {store.store_info.accessToken}
                </p>
                <p className="col-span-2 text-gray-300">Shop Domain</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {store.store_info.shop}
                </p>
              </li>
            </ul>
          ))}

        {/* for adding second Store */}
        {/* <ul class="ml-10 mt-10 flex h-fit w-[30rem] flex-col gap-3 border-b border-slate-500 px-3 py-6">
          <li class="flex flex-row items-center gap-3 relative">
            <img
              class="h-16 rounded-md bg-gray-50"
              src="https://res.cloudinary.com/dvksijeuj/image/upload/v1707228492/esyncStoreLogos/ujstf4bfjtp29gswbxrs"
            />
            <p class="ml-2">Nakson</p>

            <div class="absolute items-center flex flex-row justify-center gap-10 text-sm -top-4 -right-4  w-52 h-24  ">
              <button class="bg-blue-800 rounded-md px-2 py-2 hover:bg-blue-900 transition-all">
                Update
              </button>
              <button class="bg-red-800 rounded-md px-2 py-2 hover:bg-red-900 transition-all">
                Remove
              </button>
            </div>
          </li>
          <li class="my-2 flex flex-row gap-8 border-l-2 border-slate-800 bg-slate-900 rounded-md p-2 text-sm">
            <p>Access Token</p>
            <p class="font-bold">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</p>
          </li>
          <li class="my-2 flex flex-row gap-[5.5rem] border-l-2 border-slate-800 bg-slate-900 rounded-md p-2 text-sm">
            <p>Token</p>
            <p class="font-bold ">7xWus4</p>
          </li>
        </ul> */}
      </div>

      {/* CONNECTED STORES DARAZ */}

      <div
        className={`absolute overflow-y-auto  top-24 z-10 flex h-[23rem] w-[40rem] flex-col  rounded-md border-2 border-orange-950 bg-black p-2 text-white transition-all duration-700 md:left-1/3 
      md:-translate-x-11 ${
        showConnectedStoresDaraz
          ? ""
          : ["opacity-0", "pointer-events-none"].join(" ")
      }   `}
      >
        {waiting && (
          <>
            <svg
              onClick={() => setShowConnectedStoresDaraz(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <span className="loader absolute left-1/2 -translate-x-48 top-40 "></span>
          </>
        )}

        {storesDaraz?.length === 0 && (
          <>
            <p>No Store Connected</p>
            <svg
              onClick={() => setShowConnectedStoresDaraz(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </>
        )}

        {storesDaraz?.length !== 0 &&
          storesDaraz?.map((store, index) => (
            <ul
              key={store.id}
              className="ml-8 mt-10 flex h-fit w-[36rem] flex-col gap-3 border-b border-slate-500 px-3 py-6"
            >
              <li
                onClick={() => setShowConnectedStoresDaraz(false)}
                className={`
                ${index > 0 ? "hidden" : ""}
                absolute right-3 top-2 cursor-pointer rounded-2xl border-2 border-red-700 text-red-700 transition-all hover:border-red-800 hover:text-red-800`}
              >
                <svg
                  onClick={() => setShowConnectedStoresDaraz(false)}
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
              <li className="flex flex-row items-center gap-3 relative h-24">
                <Image
                  className=" rounded-md border border-gray-50 bg-gray-50"
                  src={
                    store.image_url !== "none"
                      ? store.image_url
                      : "https://i.imgur.com/bK6ZSYI.png"
                  }
                  width={100}
                  height={100}
                  alt="Store Logo"
                ></Image>
                <p className="ml-2">{store.name}</p>

                <div className="absolute items-center flex flex-row justify-center gap-10 text-xs -top-1 -right-4  w-60  h-24  ">
                  <button className="bg-blue-800 rounded-md px-2 py-2 hover:bg-blue-900 transition-all">
                    Update
                  </button>
                  <button
                    onClick={async () => {
                      setIsLoading(true);
                      // Remove the store from the database
                      const res = await axios.get("/api/server-url");
                      const { serverURL } = res.data;
                      const response = await axios.delete(
                        `${serverURL}/daraz/delete-store/${store.name}`
                      );
                      if (response.status === 200) {
                        // Send user to esync/settings and reload the page
                        window.location.href = "/esync/settings/configu";
                        // win
                      }
                    }}
                    disabled={isLoading}
                    className={`bg-red-800 rounded-md px-2 py-2 hover:bg-red-900 transition-all disabled:bg-opacity-50 `}
                  >
                    Remove
                  </button>
                </div>
              </li>
              <li className="my-4 grid grid-cols-7 gap-8 border-l-2 border-indigo-600 p-2 text-sm ">
                <p className="col-span-2 text-gray-300">Access Token</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {store.store_info.access_token}
                </p>
                <p className="col-span-2 text-gray-300">Account</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {store.store_info.account}
                </p>
              </li>
            </ul>
          ))}
      </div>

      {/* CONNECTED LEOPARDS ACCOUNT */}

      <div
        className={`absolute overflow-y-auto  top-24 z-10 flex h-[23rem] w-[40rem] flex-col  rounded-md border-2 border-yellow-800 bg-black p-2 text-white transition-all duration-700 md:left-1/3 
      md:-translate-x-11 ${
        showConnectedLeopardsAccount
          ? ""
          : ["opacity-0", "pointer-events-none"].join(" ")
      }   `}
      >
        {waiting && (
          <>
            <svg
              onClick={() => setShowConnectedLeopardsAccount(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <span className="loader absolute left-1/2 -translate-x-48 top-40 "></span>
          </>
        )}

        {leopardsAccounts?.length === 0 && (
          <>
            <p>No Accounts Connected</p>
            <svg
              onClick={() => setShowConnectedLeopardsAccount(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </>
        )}

        {leopardsAccounts?.length !== 0 &&
          leopardsAccounts?.map((account, index) => (
            <ul
              key={account.id}
              className="ml-8 mt-10 flex h-fit w-[36rem] flex-col gap-3 border-b border-slate-500 px-3 py-6"
            >
              <li
                onClick={() => setShowConnectedLeopardsAccount(false)}
                className={`
                ${index > 0 ? "hidden" : ""}
                absolute right-3 top-2 cursor-pointer rounded-2xl border-2 border-red-700 text-red-700 transition-all hover:border-red-800 hover:text-red-800`}
              >
                <svg
                  onClick={() => setShowConnectedLeopardsAccount(false)}
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
              <li className="flex flex-row items-center gap-3 relative h-24">
                <Image
                  className="rounded-lg"
                  src={"https://i.imgur.com/m0coPha.jpeg"}
                  alt="Leopards Logo"
                  width={100}
                  height={100}
                ></Image>
                <p className="ml-2">{account.name}</p>

                <div className="absolute items-center flex flex-row justify-center gap-10 text-xs -top-1 -right-4  w-60  h-24  ">
                  <button
                    onClick={async () => {
                      console.log("id: ", account.id);
                      setIsLoading(true);
                      // Remove the store from the database
                      const res = await axios.get("/api/server-url");
                      const { serverURL } = res.data;
                      const response = await axios.delete(
                        `${serverURL}/leopards/delete-account/${account.id}`
                      );
                      if (response.status === 200) {
                        // Send user to esync/settings and reload the page
                        window.location.href = "/esync/settings/configu";
                        // win
                      }
                    }}
                    disabled={isLoading}
                    className={`bg-red-800 rounded-md px-2 py-2 hover:bg-red-900 transition-all disabled:bg-opacity-50 `}
                  >
                    Remove
                  </button>
                </div>
              </li>
              <li className="my-4 grid grid-cols-7 gap-6 border-l-2 border-indigo-600 px-2 text-sm ">
                <p className="col-span-2 text-gray-300">Account ID</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {account.id}
                </p>

                <p className="col-span-2 text-gray-300">API Key</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {account.data.apiKey}
                </p>
                <p className="col-span-2 text-gray-300">API Password</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {account.data.password}
                </p>

                <p className="col-span-2 text-gray-300">Shippers</p>
                {account.shippers !== "null" && (
                  <div className="col-span-5 text-gray-500 font-bold overflow-y-auto h-32  border-slate-500 border-2 border-opacity-50 pb-2 text-xs">
                    {account.shippers.map((shipper) => (
                      <ul
                        key={shipper.id}
                        className="grid grid-cols-5 items-center justify-center gap-2 border-b-2 border-slate-700 border-opacity-60 p-2 relative"
                      >
                        <button
                          disabled={isLoading}
                          onClick={async () => {
                            // Only deletes the shipper from database not from LEOPARDS PORATL !!
                            setIsLoading(true);
                            const res = await axios.get("/api/server-url");
                            const { serverURL } = res.data;

                            const response = await axios.delete(
                              `${serverURL}/delete-shipper/${shipper.id}?accountID=${account.id}`
                            );
                            if (response.status === 200) {
                              // Reload the page
                              window.location.href =
                                "/esync/settings/configuration";
                            }
                          }}
                          className="bg-red-800 transition-all disabled:bg-opacity-40 hover:bg-red-900 rounded-md p-2 top-2  text-white font-normal absolute right-4"
                        >
                          Delete
                        </button>
                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">Shop:</p>
                          <p key={shipper.id}>{shipper.shop}</p>
                        </li>
                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">
                            Special Instructions:
                          </p>
                          <p key={shipper.id}>{shipper.specialInstructions}</p>
                        </li>

                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">Name:</p>
                          <p key={shipper.id}>
                            {shipper.response.shipment_name}
                          </p>
                        </li>
                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">Shipper ID:</p>
                          <p key={shipper.id}>{shipper.response.shipment_id}</p>
                        </li>

                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">City:</p>
                          <p key={shipper.id}>
                            {
                              LEOPARDS_CITIES.find(
                                (city) =>
                                  city.id === String(shipper.response.city_id)
                              ).name
                            }
                          </p>
                        </li>
                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">Phone:</p>
                          <p key={shipper.id}>
                            {shipper.response.shipment_phone}
                          </p>
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          ))}
      </div>

      {/* _______________ */}

      {/* CONNECTED TCS ACCOUNT */}

      <div
        className={`absolute overflow-y-auto  top-24 z-10 flex h-[23rem] w-[40rem] flex-col  rounded-md border-2 border-rose-800 bg-black p-2 text-white transition-all duration-700 md:left-1/3 
      md:-translate-x-11 ${
        showConnectedTCSAccount
          ? ""
          : ["opacity-0", "pointer-events-none"].join(" ")
      }   `}
      >
        {waiting && (
          <>
            <svg
              onClick={() => setShowConnectedTCSAccount(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <span className="loader absolute left-1/2 -translate-x-48 top-40 "></span>
          </>
        )}

        {tcsAccounts?.length === 0 && (
          <>
            <p>No Accounts Connected</p>
            <svg
              onClick={() => setShowConnectedTCSAccount(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-9 cursor-pointer w-9 bg-black text-red-600 hover:text-red-800 transition-all absolute right-3 top-2 rounded-md "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </>
        )}

        {tcsAccounts?.length !== 0 &&
          tcsAccounts?.map((account, index) => (
            <ul
              key={account.id}
              className="ml-8 mt-10 flex h-fit w-[36rem] flex-col gap-3 border-b border-slate-500 px-3 py-6"
            >
              <li
                onClick={() => setShowConnectedTCSAccount(false)}
                className={`
                ${index > 0 ? "hidden" : ""}
                absolute right-3 top-2 cursor-pointer rounded-2xl border-2 border-red-700 text-red-700 transition-all hover:border-red-800 hover:text-red-800`}
              >
                <svg
                  onClick={() => setShowConnectedTCSAccount(false)}
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
              <li className="flex flex-row items-center gap-3 relative h-24">
                <Image
                  className="rounded-lg"
                  src={"https://i.imgur.com/ph59e96.png"}
                  alt="TSC Logo"
                  width={100}
                  height={100}
                ></Image>
                <p className="ml-2">{account.name}</p>

                <div className="absolute items-center flex flex-row justify-center gap-10 text-xs -top-1 -right-4  w-60  h-24  ">
                  <button
                    onClick={async () => {
                      console.log("id: ", account.id);
                      setIsLoading(true);
                      // Remove the store from the database
                      const res = await axios.get("/api/server-url");
                      const { serverURL } = res.data;
                      const response = await axios.delete(
                        `${serverURL}/tcs/delete-account/${account.id}`
                      );
                      if (response.status === 200) {
                        // Send user to esync/settings and reload the page
                        window.location.href = "/esync/settings/configuration";
                        // win
                      }
                    }}
                    disabled={isLoading}
                    className={`bg-red-800 rounded-md px-2 py-2 hover:bg-red-900 transition-all disabled:bg-opacity-50 `}
                  >
                    Remove
                  </button>
                </div>
              </li>
              <li className="my-4 grid grid-cols-7 gap-6 border-l-2 border-indigo-600 px-2 text-sm ">
                <p className="col-span-2 text-gray-300">Account Number</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {account.data.accountNumber}
                </p>

                <p className="col-span-2 text-gray-300">Username</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {account.data.userName}
                </p>
                <p className="col-span-2 text-gray-300">Password</p>
                <p className="col-span-5 text-gray-500 font-bold">
                  {account.data.password}
                </p>

                <p className="col-span-2 text-gray-300">Cost Centers</p>
                {account.shippers !== "null" && (
                  <div className="col-span-5 text-gray-500 font-bold overflow-y-auto h-32  border-slate-500 border-2 border-opacity-50 pb-2 text-xs">
                    {account.shippers.map((shipper) => (
                      <ul
                        key={shipper.id}
                        className="grid grid-cols-5 items-center justify-center gap-2 border-b-2 border-slate-700 border-opacity-60 p-2 relative"
                      >
                        <button
                          disabled={isLoading}
                          onClick={async () => {
                            // Only deletes the shipper from database not from LEOPARDS PORATL !!
                            setIsLoading(true);
                            const res = await axios.get("/api/server-url");
                            const { serverURL } = res.data;

                            const response = await axios.delete(
                              `${serverURL}/delete-shipper/${shipper.id}?accountID=${account.id}`
                            );
                            if (response.status === 200) {
                              // Reload the page
                              window.location.href =
                                "/esync/settings/configuration";
                            }
                          }}
                          className="bg-red-800 transition-all disabled:bg-opacity-40 hover:bg-red-900 rounded-md p-2 top-2  text-white font-normal absolute right-4"
                        >
                          Delete
                        </button>
                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">Shop:</p>
                          <p key={shipper.id}>{shipper.shop}</p>
                        </li>
                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">
                            Special Instructions:
                          </p>
                          <p key={shipper.id}>{shipper.specialInstructions}</p>
                        </li>

                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">Name:</p>
                          <p key={shipper.id}>
                            {shipper.response.shipment_name}
                          </p>
                        </li>
                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">Shipper ID:</p>
                          <p key={shipper.id}>{shipper.response.shipment_id}</p>
                        </li>

                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">City:</p>
                          <p key={shipper.id}>
                            {
                              LEOPARDS_CITIES.find(
                                (city) =>
                                  city.id === String(shipper.response.city_id)
                              ).name
                            }
                          </p>
                        </li>
                        <li className="flex flex-row gap-2 col-span-5">
                          <p className=" text-gray-600">Phone:</p>
                          <p key={shipper.id}>
                            {shipper.response.shipment_phone}
                          </p>
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          ))}
      </div>

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

      {/* MODAL FOR BLACK */}
      <div
        className={`bg-black absolute pointer-events-none inset-0 ${
          showTokenModal || showConnectedStores || connectStoreModal
            ? "opacity-10"
            : "opacity-0"
        }`}
      ></div>

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

      <Notification
        label={label}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />

      {/* Display Notification */}
    </>
  );
}
