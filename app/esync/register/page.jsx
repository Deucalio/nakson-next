"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const Success = () => {
  const searchParams = useSearchParams();

  const accesstoken = searchParams.get("accesstoken") || "";
  const shop = searchParams.get("shop") || "";
  return (
    <div className="col-span-5 overflow-scroll rounded-3xl border-fuchsia-400 py-12 pl-24 md:pl-8 lg:overflow-hidden">
      <ul className="mx-auto -ml-10 flex flex-col items-center gap-4 border-fuchsia-900 text-lg text-slate-200 ">
        <li className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Success</p>
          <div className="flex flex-row gap-3">
            <span className="h-2 w-14 rounded-3xl bg-indigo-950"></span>
            <span className="h-2 w-14 rounded-3xl bg-indigo-950"></span>
            <span className="h-2 w-14 rounded-3xl bg-indigo-700"></span>
          </div>
        </li>
        <li>
          <form className="grid border-teal-700 text-xs " action="">
            <ul className="">
              <li className="w-72 mt-2 md:w-64">
                <p>
                  Welcome Onboard! To continue, click the button below to
                  proceed to your account settings.
                </p>
              </li>
              <li className="flex mt-7 justify-center">
                {accesstoken && shop ? (
                  <Link
                    href={`/esync/login?accesstoken=${accesstoken}&shop=${shop}`}
                  >
                    <button className="bg-green-700 hover:bg-green-800 transition-all  text-white  py-3 px-6 rounded">
                      Finish Registration
                    </button>
                  </Link>
                ) : (
                  <Link href={"/esync/login"}>
                    <button className="bg-green-700 hover:bg-green-800 transition-all  text-white  py-3 px-6 rounded">
                      Finish Registration
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </form>
        </li>
      </ul>
    </div>
  );
};

const OTPVerification = ({
  setSuccess,
  userInfo,
  otp,
  setOtp,
  validEmail,
  email,
  setUserInfo,
}) => {
  const [resendTimer, setResendTimer] = useState(60);
  const inputRef = useRef(null);
  const codeInputElement = useRef(null);

  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    // Enable Button after 5 seconds
    let timeout = setTimeout(() => {
      setDisableBtn(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [disableBtn]);

  const invalidOTPSpan = useRef(null);

  const handleChangeEmail = (e) => {
    setUserInfo({ ...setUserInfo, email: e.target.value });
  };

  // FINAL FUNCTIONS
  const resendCode = async (e) => {
    e.preventDefault();

    const res_first = await axios.get("/api/server-url");
    const { serverURL } = res_first.data;

    // reset the timer
    setResendTimer(60);
    // send the otp again to the user
    const res = await axios.post(`${serverURL}/otp`, email);
    setOtp(res.data);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    console.log("registering user");

    const OTPUserEntered = Number(codeInputElement.current.value);

    if (OTPUserEntered === otp) {
      const res_first = await axios.get("/api/server-url");
      const { serverURL } = res_first.data;

      // Register the User into our DB
      // Send request to backend
      const res = await axios.post(`${serverURL}/register`, userInfo);
      setSuccess(true);
      console.log("res: ", res.data);

      return;
    }
    invalidOTPSpan.current.classList.remove("opacity-0");
    codeInputElement.current.classList.add("border-red-700", "border-2");
    return;
  };

  useEffect(() => {
    // change resend button to timer
    if (resendTimer > 0) {
      setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
  });

  return (
    <div className=" transition-all duration-200 col-span-5 overflow-scroll rounded-3xl border-fuchsia-400 py-12 pl-24 md:pl-8 lg:overflow-hidden">
      <ul className="mx-auto -ml-10 flex flex-col items-center gap-4 border-fuchsia-900 text-lg text-slate-200">
        <li className="flex flex-col gap-2">
          <p className="text-md font-semibold">Verification</p>
          <div className="flex flex-row gap-3">
            <span className="h-2 w-14 rounded-3xl bg-indigo-950"></span>
            <span className="h-2 w-14 rounded-3xl bg-indigo-700"></span>
            <span className="h-2 w-14 rounded-3xl bg-slate-800"></span>
          </div>
        </li>
        <li>
          <form className="grid border-teal-700 text-xs" action="">
            <ul className="">
              <li className="text-xs">
                <p>Code sent to</p>
              </li>
              <li className="flex flex-col gap-1">
                <input
                  disabled
                  ref={inputRef}
                  placeholder={email}
                  className="h-10 w-60 rounded-md  bg-gray-900 px-3 py-1 outline-none outline-2 placeholder:opacity-80 focus:outline-indigo-900"
                  type="text"
                  onChange={handleChangeEmail}
                  // value={changeEmail ? email : ""}
                />
                <span
                  className={`opacity-0 transition-all duration-300 absolute top-[10.5rem]  text-xs text-red-600`}
                >
                  Invalid Email Address
                </span>

                <span
                  onClick={() => setOtp("")}
                  className="text-right text-xs 
                 underline text-rose-800 font-semibold -translate-x-1 cursor-pointer hover:text-red-900 transition-all duration-300"
                >
                  Change Email
                </span>

                <div className="flex flex-row items-center justify-center gap-3 relative ">
                  <input
                    ref={codeInputElement}
                    placeholder="Code"
                    className="mt-4 h-10 w-32 rounded-md  bg-slate-900 px-3 py-1 outline-none outline-2 placeholder:opacity-80 focus:outline-indigo-900 transition-all"
                    type="number"
                  />
                  <span
                    ref={invalidOTPSpan}
                    className="text-red-500 text-xs absolute left-2 top-16 opacity-0 transition-all"
                  >
                    Invalid OTP
                  </span>
                  <button
                    type="button"
                    disabled={resendTimer > 0}
                    onClick={resendCode}
                    className={`mt-4 h-10 w-24 rounded-md ${
                      resendTimer > 0 ? "bg-blue-950" : "bg-blue-800"
                    } text-xs transition-all duration-500 hover:bg-blue-950
                  `}
                  >
                    Resend {resendTimer}
                  </button>
                </div>

                <button
                  disabled={disableBtn}
                  onClick={registerUser}
                  className={`mx-auto mt-10 w-32 px-3 py-2 rounded-md bg-gradient-to-l from-indigo-600 to-violet-700  ${[
                    "hover:bg-indigo-800, hover:from-indigo-700, hover:to-violet-800 text-sm",
                  ].join(" ")} disabled:opacity-50`}
                >
                  Register
                </button>
              </li>
            </ul>
          </form>
        </li>
      </ul>
    </div>
  );
};

const Register = ({
  redirectToLogin,
  buttonDisabled,
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
  spanRef,
  proceedToOTP,
  userInfo,
  setUserInfo,
}) => {
  const searchParams = useSearchParams();

  const accesstoken = searchParams.get("accesstoken") || "";
  const shop = searchParams.get("shop") || "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  return (
    <div className="col-span-5 overflow-scroll rounded-3xl border-fuchsia-400 py-8 pl-24 md:pl-8 lg:overflow-hidden">
      <ul className="mx-auto -ml-10 flex flex-col items-center gap-4 border-fuchsia-900 text-lg text-slate-200">
        <li className="flex flex-col gap-2">
          <p className="text-md font-semibold">Register</p>
          <div className="flex flex-row gap-3">
            <span className="h-2 w-14 rounded-3xl bg-indigo-700"></span>
            <span className="h-2 w-14 rounded-3xl bg-slate-800"></span>
            <span className="h-2 w-14 rounded-3xl bg-slate-800"></span>
          </div>
        </li>
        <li>
          <form className="grid border-teal-700 text-xs " action="">
            <ul className="">
              <li className="relative flex flex-col gap-6">
                <input
                  placeholder="First Name"
                  autoComplete="off"
                  className="transition-all duration-300 h-10 w-56 rounded-md  bg-slate-900 px-3 py-1 outline-none outline-2 placeholder:opacity-80 focus:outline-indigo-900"
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleChange}
                  ref={firstNameRef}
                />
                <input
                  placeholder="Last Name"
                  className="transition-all duration-300 h-10 w-56 rounded-md  bg-slate-900 px-3 py-1 outline-none outline-2 placeholder:opacity-80 focus:outline-indigo-900"
                  type="text"
                  name="lastName"
                  autoComplete="off"
                  value={userInfo.lastName}
                  onChange={handleChange}
                  ref={lastNameRef}
                />
                {/* border-2 border-rose-700  */}
                <input
                  placeholder="Email"
                  className="transition-all duration-300 h-10 w-56 rounded-md  bg-slate-900 px-3 py-1 outline-none outline-2  placeholder:opacity-80 focus:outline-indigo-900"
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  ref={emailRef}
                />
                <input
                  placeholder="Password"
                  className="transition-all duration-300 h-10 w-56 rounded-md  bg-slate-900 px-3 py-1 outline-none outline-2 placeholder:opacity-80 focus:outline-indigo-900"
                  type="password"
                  name="password"
                  autoComplete="on"
                  value={userInfo.password}
                  onChange={handleChange}
                  ref={passwordRef}
                />
                <p
                  ref={spanRef}
                  className="opacity-0  transition-all duration-300 absolute  text-xs text-red-600"
                >
                  Error Message
                </p>

                <button
                  onClick={proceedToOTP}
                  disabled={buttonDisabled}
                  className="relative mx-auto text-sm mt-1 w-32 rounded-md bg-gradient-to-l from-indigo-600 to-violet-700 px-3 py-2 hover:bg-indigo-800 hover:from-indigo-700 hover:to-violet-800"
                >
                  Next
                  <div className="loader absolute top-[10px] right-4 opacity-0 "></div>
                </button>
              </li>
              <li className="md:mt-4 ml-4 flex flex-row gap-1">
                <p>Already have an account? </p>
                {accesstoken && shop ? (
                  <Link
                    href={`/esync/login?accesstoken=${accesstoken}&shop=${shop}`}
                  >
                    <span className="cursor-pointer font-semibold text-indigo-500 transition-all hover:text-indigo-700 hover:underline">
                      {" "}
                      Login{" "}
                    </span>
                  </Link>
                ) : (
                  <Link href={"/esync/login"}>
                    <span className="cursor-pointer font-semibold text-indigo-500 transition-all hover:text-indigo-700 hover:underline">
                      {" "}
                      Login{" "}
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </form>
        </li>
      </ul>
    </div>
  );
};

const Page = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const searchParams = useSearchParams();

  const accesstoken = searchParams.get("accesstoken") || "";
  const shop = searchParams.get("shop") || "";

  console.log("accesstoken : ", accesstoken);
  console.log("shop : ", shop);

  const [otp, setOtp] = useState("");
  const [lastErrorInput, setLastErrorInput] = useState(null);
  const [lastSpanPosition, setLastSpanPosition] = useState("");
  const [success, setSuccess] = useState(false);

  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (otp === "") {
      setBtnDisabled(false);
    }
  }, [otp]);

  const spanRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const proceedToOTP = async (e) => {
    e.preventDefault();

    // Disable button

    if (lastErrorInput !== null && lastSpanPosition !== "") {
      // Remove error message
      lastErrorInput.current.classList.remove("border-2");
      lastErrorInput.current.classList.remove("border-rose-700");
      lastErrorInput.current.classList.add("focus:outline-indigo-900");
      spanRef.current.classList.add("opacity-0");
      spanRef.current.classList.remove(lastSpanPosition);
    }

    // Validate user input
    const { firstName, lastName, email, password } = userInfo;
    if (firstName === "") {
      setLastErrorInput(firstNameRef);
      setLastSpanPosition("top-[2.7rem]");
      //   spanRef.current.classList.add("opacity-100");
      spanRef.current.textContent = "First Name is required";
      spanRef.current.classList.remove("opacity-0");
      spanRef.current.classList.add("top-[2.7rem]");

      firstNameRef.current.focus();
      firstNameRef.current.classList.add("border-2");
      firstNameRef.current.classList.add("border-rose-700");
      firstNameRef.current.classList.remove("focus:outline-indigo-900");
      return;
    } else if (lastName === "") {
      setLastErrorInput(lastNameRef);
      setLastSpanPosition("top-[6.7rem]");
      spanRef.current.textContent = "Last Name is required";
      spanRef.current.classList.remove("opacity-0");
      spanRef.current.classList.add("top-[6.7rem]");
      lastNameRef.current.focus();
      lastNameRef.current.classList.add("border-2");
      lastNameRef.current.classList.add("border-rose-700");
      lastNameRef.current.classList.remove("focus:outline-indigo-900");
      return;
    } else if (email === "" || !validEmail(email)) {
      setLastErrorInput(emailRef);
      setLastSpanPosition("top-[10.7rem]");
      spanRef.current.textContent = "Invalid Email Address";
      spanRef.current.classList.remove("opacity-0");
      spanRef.current.classList.add("top-[10.7rem]");
      emailRef.current.focus();
      emailRef.current.classList.add("border-2");
      emailRef.current.classList.add("border-rose-700");
      emailRef.current.classList.remove("focus:outline-indigo-900");
      return;
    } else if (password === "") {
      setLastErrorInput(passwordRef);
      setLastSpanPosition("top-[14.7rem]");
      spanRef.current.textContent = "Password is required";
      spanRef.current.classList.remove("opacity-0");
      spanRef.current.classList.add("top-[14.7rem]");
      passwordRef.current.focus();
      passwordRef.current.classList.add("border-2");
      passwordRef.current.classList.add("border-rose-700");
      passwordRef.current.classList.remove("focus:outline-indigo-900");
      return;
    }
    setBtnDisabled(true);

    // Send request to server and check if email is already registered
    try {
      const res_first = await axios.get("/api/server-url");
      const { serverURL } = res_first.data;

      const res = await axios.post(`${serverURL}/otp`, userInfo);
      setOtp(res.data);
    } catch (e) {
      if (e.request.status === 409) {
        setLastErrorInput(emailRef);
        setLastSpanPosition("top-[10.7rem]");
        spanRef.current.textContent = "Email Already Registered";
        spanRef.current.classList.remove("opacity-0");
        spanRef.current.classList.add("top-[10.7rem]");
        emailRef.current.focus();
        emailRef.current.classList.add("border-2");
        emailRef.current.classList.add("border-rose-700");
        emailRef.current.classList.remove("focus:outline-indigo-900");
        setBtnDisabled(false);
      }
      return;
    }
  };

  return (
    <main id="main-register" className="register-route relative h-screen">
      <section className="relative z-10 mx-auto grid h-5/6 translate-y-11 grid-cols-8 rounded-3xl border-indigo-950 bg-transparent shadow-sm border-2 border-b-violet-900 shadow-violet-900 md:w-2/4">
        <div className="col-span-3 overflow-hidden rounded-lg">
          <Image
            src="https://i.imgur.com/ddnB1HA.jpeg"
            alt="eSync Image"
            width={500}
            height={500}
            className="h-full rounded-3xl bg-cover"
          ></Image>
        </div>
        {otp === "" && (
          <Register
            buttonDisabled={btnDisabled}
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            spanRef={spanRef}
            proceedToOTP={proceedToOTP}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
        {otp !== "" && success === false && (
          <OTPVerification
            setSuccess={setSuccess}
            userInfo={userInfo}
            otp={otp}
            setOtp={setOtp}
            validEmail={validEmail}
            email={userInfo.email}
            setUserInfo={setUserInfo}
          />
        )}
        {success && <Success />}
      </section>
    </main>
  );
};

export default Page;
