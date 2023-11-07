"use client";
import React, { useEffect, useRef, useState } from "react";

const FAQ = ({sectionRefs}) => {
  const [accordion, setAccordion] = useState(false);
  const [accordionAnswerElement, setAccordionAnswerElement] = useState(null);
  const [accordionButtonElement, seAccordionButtonElement] = useState(null);

  const handleAccordion = (e) => {
    setAccordion(!accordion);
    setAccordionAnswerElement(e.target.nextElementSibling);
    // seAccordionButtonElement(e.target);
    e.target.parentElement.classList.toggle("min-h-[10rem]");
    e.target.nextElementSibling.classList.toggle("opacity-0");
    e.target.children[1].children[0].classList.toggle("rotate-180");
  };

  // useEffect(() => {
  //   if (accordion) {
  //     accordionButtonElement.parentElement.classList.add("min-h-[10rem]");
  //   } else {
  //   }
  //   // accordionButtonElement.children[1].classList.toggle("rotate-180");
  // }, [accordion]);

  return (
    <section ref={sectionRefs.faq} className="flex flex-col gap-6 px-6 pb-32 pt-72">
      <button className="mx-auto block rounded-2xl bg-rose-600 px-3 py-2 text-slate-100 transition-all hover:scale-105 hover:bg-rose-700 hover:text-slate-200">
        Have Questions ?
      </button>

      <p className="py-6 text-center text-2xl lg:text-3xl">
        Frequently Ask Questions
      </p>

      <main className="hidden h-96 grid-cols-2 md:grid">
        <div className="flex flex-col gap-4 border-sky-400 px-4 py-6">
          <section className="mx-auto h-14 w-full rounded-lg bg-[#1B1A17] px-3 py-4 text-xs lg:text-base transition-all duration-300 min-h-0">
            <button
              onClick={(e) => handleAccordion(e)}
              className="flex w-full flex-row justify-between gap-2"
            >
              <p className="pointer-events-none">
                What services does Nakson offer?
              </p>
              <span className="pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 rotate-180 transition-all duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </span>
            </button>
            <p className="lg:text-sm py-2 pr-6 text-zinc-400 transition-all  duration-300 opacity-0 pointer-events-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              adipisci fuga eveniet quaerat dolor possimus praesentium repellat!
              Aspernatur, voluptas? Tempore neque temporibus necessitatibus
              quam. Blanditiis recusandae ipsa vero tenetur sapiente!
            </p>
          </section>

          <section className="mx-auto h-14 w-full rounded-lg bg-[#1B1A17] px-3 py-4 text-xs transition-all duration-300 min-h-0">
            <button
              onClick={(e) => handleAccordion(e)}
              className="flex w-full flex-row justify-between gap-2 lg:text-base"
            >
              <p className="pointer-events-none">
                What services does Nakson offer?
              </p>
              <span className="pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 rotate-180 transition-all duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </span>
            </button>
            <p className="lg:text-sm py-2 pr-6 text-zinc-400 transition-all  duration-300 opacity-0 pointer-events-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              adipisci fuga eveniet quaerat dolor possimus praesentium repellat!
              Aspernatur, voluptas? Tempore neque temporibus necessitatibus
              quam. Blanditiis recusandae ipsa vero tenetur sapiente!
            </p>
          </section>
        </div>
        <div className="flex flex-col gap-4 border-rose-400 px-4 py-6">
          <section className="mx-auto h-14 w-full rounded-lg bg-[#1B1A17] px-3 py-4 text-xs transition-all duration-300 min-h-0">
            <button
              onClick={(e) => handleAccordion(e)}
              className="flex w-full flex-row justify-between gap-2 lg:text-base"
            >
              <p className="pointer-events-none">
                What services does Nakson offer?
              </p>
              <span className="pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 rotate-180 transition-all duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </span>
            </button>
            <p className="lg:text-sm py-2 pr-6 text-zinc-400 transition-all  duration-300 opacity-0 pointer-events-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              adipisci fuga eveniet quaerat dolor possimus praesentium repellat!
              Aspernatur, voluptas? Tempore neque temporibus necessitatibus
              quam. Blanditiis recusandae ipsa vero tenetur sapiente!
            </p>
          </section>

          <section className="mx-auto h-14 w-full rounded-lg bg-[#1B1A17] px-3 py-4 text-xs transition-all duration-300 min-h-0">
            <button
              onClick={(e) => handleAccordion(e)}
              className="flex w-full flex-row justify-between gap-2 lg:text-base"
            >
              <p className="pointer-events-none">
                What services does Nakson offer?
              </p>
              <span className="pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 rotate-180 transition-all duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </span>
            </button>
            <p className="lg:text-sm py-2 pr-6 text-zinc-400 transition-all  duration-300 opacity-0 pointer-events-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              adipisci fuga eveniet quaerat dolor possimus praesentium repellat!
              Aspernatur, voluptas? Tempore neque temporibus necessitatibus
              quam. Blanditiis recusandae ipsa vero tenetur sapiente!
            </p>
          </section>
        </div>
      </main>

      <section className="relative mx-auto rounded-lg bg-[#1B1A17] px-3 py-4 text-xs md:hidden transition-all duration-[400ms] min-h-0">
        <button
          onClick={(e) => handleAccordion(e)}
          className="flex w-full flex-row justify-between gap-2"
        >
          <p className="pointer-events-none">
            What services does Nakson offer?
          </p>
          <span className="pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rotate-180 transition-all duration-300 -translate-y-[2px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </span>
        </button>
        <p className="py-2 pr-6 text-zinc-400 transition-all absolute duration-300 opacity-0 pointer-events-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dicta
          deleniti dolore beatae corporis. Consectetur dolorem unde vero
          provident optio necessitatibus voluptate ipsam, consequuntur
        </p>
      </section>

      <section className="relative mx-auto h-14 rounded-lg bg-[#1B1A17] px-3 py-4 text-xs md:hidden transition-all duration-[400ms] min-h-0">
        <button
          onClick={(e) => handleAccordion(e)}
          className="relative z-30 flex w-full flex-row justify-between gap-2"
        >
          <p className="pointer-events-none">
            How can Nakson help me scale business ?
          </p>
          <span className="pointer-events-none transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rotate-180 transition-all duration-300 -translate-y-[2px]"
            >
              <path
                className="transition-all"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </span>
        </button>

        <p className="py-2 pr-6 text-zinc-400 transition-all absolute duration-300 opacity-0 pointer-events-none">
          I have no idea how nakson can help you achive that although you could
          ask someone else for that.
        </p>

        <div className="absolute inset-0 bg-zinc-500 bg-opacity-10"></div>
      </section>

      <section className="relative mx-auto h-14 rounded-lg bg-[#1B1A17] px-3 py-4 text-xs md:hidden transition-all duration-[400ms] min-h-0">
        <button
          onClick={(e) => handleAccordion(e)}
          className="relative z-30 flex w-full flex-row justify-between gap-2"
        >
          <p className="pointer-events-none">
            What services does Nakson offer ?
          </p>
          <span className="pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rotate-180 transition-all duration-300 -translate-y-[2px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </span>
        </button>
        <p className="py-2 pr-6 text-zinc-400 transition-all absolute duration-300 opacity-0 pointer-events-none">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore sunt
          voluptatem optio, minima consequatur eaque impedit ad quod atque sequi
          ea maxime vel, libero eligendi voluptas quaerat distinctio!
          Praesentium, maiores!
        </p>
      </section>

      <section className="w-72 relative mx-auto rounded-lg bg-[#1B1A17] px-3 py-4 text-xs md:hidden md:h-28 md:w-96 transition-all duration-[400ms] min-h-0">
        <button
          onClick={(e) => handleAccordion(e)}
          className="relative z-30 flex w-full flex-row justify-between gap-2"
        >
          {" "}
          <p className="pointer-events-none">Ag lava majboori nu ???</p>
          <span className="pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rotate-180 transition-all duration-300 -translate-y-[2px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </span>
        </button>

        <p className="py-2 pr-6 text-zinc-400 transition-all absolute duration-300 opacity-0 pointer-events-none">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Exercitationem eaque fugiat maiores, excepturi tempora . Lorem ipsum
          dolor sit amet.
        </p>

        <div className="absolute inset-0 bg-zinc-500 bg-opacity-10"></div>
      </section>
    </section>
  );
};

export default FAQ;
