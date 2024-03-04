"use client";
import { useEffect, useRef, useState } from "react";
const Notification = ({ label, showNotification, setShowNotification }) => {
  const notificationRef = useRef(null);
  useEffect(() => {
    let time = setTimeout(() => {
      if (notificationRef.current) {
        notificationRef.current.classList.add("opacity-0");
      }
    }, 7000); // 7 seconds
    let timeout = setTimeout(() => {
      setShowNotification("");
    }, 9000); // 9 seconds
    return () => {
      clearTimeout(time);
      clearTimeout(timeout);
    };
  }, [showNotification]);

  return (
    <div
      ref={notificationRef}
      className={`${
        label === "Success" && ["text-green-500", "border-green-700"].join(" ")
      }
      ${label === "Error" && ["text-red-600", "border-red-700"].join(" ")}
      
      transition-all duration-500 text-base border-2  font-semibold absolute flex flex-row items-center gap-2 bottom-12  right-4 py-2 px-6 rounded-lg pointer-events-none
        ${showNotification ? "opacity-1" : "opacity-0"}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p className="">{showNotification}</p>
    </div>
  );
};

export default Notification;
