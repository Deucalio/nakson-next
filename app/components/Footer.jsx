import React from "react";

const Footer = () => {
  return (
    <footer className="pb-16 pt-4">
      <p className="px-6 py-4 text-lg text-slate-200">Links</p>
      <div className="border-b-2 border-slate-500 opacity-40"></div>

      <ul className="grid grid-cols-2 gap-2 px-6 py-4 text-sm text-[#e9ecef]">
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
    </footer>
  );
};

export default Footer;
