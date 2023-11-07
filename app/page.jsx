"use client";
import Nav from "./components/Nav";
import MainSection from "./components/MainSection";
import TeamSection from "./components/TeamSection";
import ServicesSection from "./components/ServicesSection";
import Clients from "./components/Clients";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const sectionRefs = {
    services: useRef(null),
    clients: useRef(null),
    faq: useRef(null),
  };

  const [nav, setNav] = useState(false);

  const handleClickScroll = (service) => {
    const element = sectionRefs[service];
    if (element.current) {
      // 👇 Will scroll smoothly to the top of the next section
      element.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    // if (isLeftSwipe || isRightSwipe)
    //   console.log("swipe", isLeftSwipe ? "left" : "right");
    // // add your conditional logic here

    if (isRightSwipe) {
      setNav(false);
    }
  };

  return (
    <>
      <Nav onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart} nav={nav} setNav={setNav} handleClickScroll={handleClickScroll} />
      <MainSection onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart} nav={nav} setNav={setNav} />
      <TeamSection onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart} nav={nav} setNav={setNav} />
      <ServicesSection onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart} nav={nav} setNav={setNav} sectionRefs={sectionRefs} />
      <Clients onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart} nav={nav} setNav={setNav} sectionRefs={sectionRefs} />
      <FAQ onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart} nav={nav} setNav={setNav} sectionRefs={sectionRefs} />
      <Footer onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchStart={onTouchStart} nav={nav} setNav={setNav} />

      {/* Overlay */}
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
    </>
  );
}
