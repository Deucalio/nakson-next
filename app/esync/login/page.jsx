"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { signUserIn } from "../actions/signUserIn";
import { useSearchParams } from "next/navigation";
const Page = () => {
  const searchParams = useSearchParams();

  const accesstoken = searchParams.get("accesstoken") || "";
  const shop = searchParams.get("shop") || "";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // set isLoading to false after 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  });

  const errorSpanElement = useRef(null);
  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res_first = await axios.get("/api/server-url");
      const { serverURL } = res_first.data;

      const res = await axios.post(`${serverURL}/login`, formData);
      const response = await signUserIn(res.data.user);
      if (response.success) {
        if (accesstoken && shop) {
          window.location.href = `/esync/settings?accesstoken=${accesstoken}&shop=${shop}`;
          return;
        }
        window.location.href = `/esync`;
      }
    } catch (e) {
      if (e.response.status === 400) {
        errorSpanElement.current.classList.remove("scale-0");
        errorSpanElement.current.textContent = e.response.data.errorMessage;
        return;
      }
      if (e.response.status === 401) {
        errorSpanElement.current.classList.remove("scale-0");
        errorSpanElement.current.textContent = e.response.data.errorMessage;
        return;
      }
      if (e.response.status === 404) {
        errorSpanElement.current.classList.remove("scale-0");
        errorSpanElement.current.textContent = e.response.data.errorMessage;
        return;
      }
    }
    return;
  };

  return (
    <main id="main-login" className=" relative h-screen ">
      <section className="relative z-10 mx-auto grid h-5/6 translate-y-11 grid-cols-8 rounded-3xl border-indigo-950 bg-transparent shadow-sm border-2 border-b-violet-900 shadow-violet-900 md:w-2/4  ">
        <div className="col-span-3 overflow-hidden rounded-lg">
          <Image
            height={500}
            width={500}
            className="h-full rounded-3xl bg-cover"
            src="https://i.imgur.com/ddnB1HA.jpeg"
            alt="e sync logo"
          />
        </div>
        <div className="col-span-5 overflow-scroll rounded-3xl border-fuchsia-400 py-8 pl-24 md:pl-8 lg:overflow-hidden">
          <ul className="mx-auto -ml-10 flex flex-col items-center gap-7 border-fuchsia-900 text-xl text-slate-200">
            <li className="flex flex-col gap-2">
              <p className="text-md font-semibold mt-4">Login</p>
            </li>
            <li>
              <form className="grid border-teal-700 text-xs mt-10" action="">
                <ul className="">
                  <li className="relative flex flex-col gap-6 ">
                    <input
                      placeholder="Email"
                      className="h-10 w-56 rounded-md bg-slate-900 px-3 py-1 outline-none outline-2 transition-all placeholder:opacity-80 focus:outline-indigo-900"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <input
                      placeholder="Password"
                      className="h-10 w-56 rounded-md bg-slate-900 px-3 py-1 outline-none outline-2 placeholder:opacity-80 focus:outline-indigo-900"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <span
                      ref={errorSpanElement}
                      className="absolute bottom-12 text-xs text-red-700 scale-0 transition-all"
                    ></span>
                    {accesstoken && shop ? null : null}
                    <button
                      disabled={isLoading}
                      onClick={handleLogin}
                      className="relative disabled:pointer-events-none disabled:opacity-75  mx-auto text-sm mt-4 w-32 rounded-md bg-gradient-to-l from-indigo-600 to-violet-700 px-3 py-2 hover:bg-indigo-800 hover:from-indigo-700 hover:to-violet-800"
                    >
                      Login
                    </button>
                  </li>
                  <li className="mt-4 ml-3">
                    <p>
                      Don't have an account?
                      {accesstoken && shop ? (
                        <Link
                          href={`/esync/register?accesstoken=${accesstoken}&shop=${shop}`}
                        >
                          <span className="cursor-pointer font-semibold text-indigo-500 transition-all hover:text-indigo-700 hover:underline">
                            {" "}
                            Register{" "}
                          </span>
                        </Link>
                      ) : (
                        <Link href={"/esync/register"}>
                          <span className="cursor-pointer font-semibold text-indigo-500 transition-all hover:text-indigo-700 hover:underline">
                            {" "}
                            Register{" "}
                          </span>
                        </Link>
                      )}
                    </p>
                  </li>
                </ul>
              </form>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Page;
