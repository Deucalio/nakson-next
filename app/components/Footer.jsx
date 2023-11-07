import Image from "next/image";
import React from "react";

const Footer = ({ nav, setNav, onTouchEnd, onTouchMove, onTouchStart }) => {
  return (
    <footer className="pb-16 pt-4 relative">
      <p className="px-6 py-4 text-lg text-slate-200">Links</p>
      <div className="border-b-2 border-slate-500 opacity-40"></div>

      <ul className="grid grid-cols-2  gap-2 px-6 py-4 text-sm text-[#e9ecef]">
        <li>Menu</li>
        <li className="pb-3">Websites</li>

        <li className="w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          Who are we
        </li>
        <li className="w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          Nakson
        </li>

        <li className="w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          Services
        </li>
        <li className="w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          MomDaughts
        </li>

        <li className="h-fit w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          Clients' feedbacks
        </li>
        <li className="w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          DeepSea Life Sciences
        </li>
      </ul>

      <p class="flex  gap-2 px-6 py-4 text-sm text-[#e9ecef]">Socials</p>

      <ul className="flex flex-row px-6 gap-2 text-sm">
        <li className="h-fit w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          <Image src="/icon-tiktok.png" height={25} width={25} />
        </li>
        <li className="h-fit w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          <Image src="/icon-facebook.png" height={25} width={25} />
        </li>
        <li className="h-fit w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          <Image src="/icon-insta.png" height={25} width={25} />
        </li>
        <li className="h-fit w-fit cursor-pointer border-b-[1px] border-slate-500 border-opacity-0 text-[#868e96] transition-all hover:border-opacity-100">
          <Image src="/icon-pinterest.png" height={25} width={25} />
        </li>
      </ul>
      <p className="px-6 pt-4 text-xs text-slate-100 opacity-50">
        Icons by &nbsp;
        <a
          className="border-b-[1px]  text-left"
          target="_blank"
          href="https://icons8.com"
        >
          &nbsp; Icons8
        </a>
      </p>

      {nav && (
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={() => setNav(false)}
          className={`transition-all duration-150 ease-linear overlay  absolute inset-0 z-30 ${
            nav && "backdrop-blur-sm"
          } md:hidden `}
        ></div>
      )}
    </footer>
  );
};

export default Footer;
