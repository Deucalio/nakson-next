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

  const handleClickScroll = (service) => {
    const element = sectionRefs[service];
    if (element.current) {
      // 👇 Will scroll smoothly to the top of the next section
      element.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Nav handleClickScroll={handleClickScroll} />
      <MainSection />
      <TeamSection />
      <ServicesSection sectionRefs={sectionRefs} />
      <Clients sectionRefs={sectionRefs} />
      <FAQ sectionRefs={sectionRefs} />
      <Footer />
    </>
  );
}
