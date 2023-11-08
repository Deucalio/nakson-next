"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "./styles.css";
import Link from "next/link";

const services = [
  "Graphics Design",
  "UI/UX Design",
  "Web Development",
  "Digital Marketing",
];

const Service = ({ ServiceName }) => {
  // format UI/UX Design to ui-ux-design
  const formatServiceName = ServiceName.includes("/") ? "ui-ux-design" : ServiceName.replace(/\s/g, "-").toLowerCase();
  return (
    <article className="w-full h-full rounded-2xl bg-[#1B1C25] md:mx-auto text-sm">
      <ul className="flex h-full flex-col items-center justify-between p-8">
        <li className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8 text-slate-300 opacity-70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
            />
          </svg>
        </li>
        <li className="text-center leading-5">{ServiceName}</li>
        <li>
          <Link href={`/${formatServiceName}`}>
            <button className="flex w-40 flex-row items-center gap-1 rounded-xl bg-gradient-to-l from-indigo-400 to-purple-800 px-7 py-3 transition-all hover:scale-105">
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-3 w-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
          </Link>
        </li>
      </ul>
    </article>
  );
};

export default function ServicesSection({
  nav,
  setNav,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
  sectionRefs,
}) {
  return (
    <section ref={sectionRefs.services} className="py-16 md:py-36 relative">
      <button className="mx-auto block rounded-2xl bg-rose-600 px-3 py-2 text-slate-100 transition-all hover:scale-105 hover:bg-rose-700 hover:text-slate-200">
        Select a Service
      </button>

      <div
        className="relative flex  flex-col items-center gap-5 px-6 py-4 md:mx-auto md:grid md:w-2/3 md:grid-cols-2 lg:grid-cols-3 lg:gap-0   lg:py-16 lg:px-0  2xl:w-2/3 2xl:mx-auto 2xl:items-center
      h-96"
      >
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          style={{ position: "absolute" }}
          className="mySwiper -translate-x-32 left-1/2 absolute z-10"
        >
          {services.map((service, index) => (
            <SwiperSlide>
              <Service key={index} ServiceName={service} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {nav && (
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={() => setNav(false)}
          className={`transition-all duration-150 ease-linear overlay  absolute inset-0 z-20 ${
            nav && "backdrop-blur-sm"
          } md:hidden `}
        ></div>
      )}
    </section>
  );
}
