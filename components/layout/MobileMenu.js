import Link from "next/link";
import React from "react";
export const MobileMenu = ({ isOpen, setIsOpen }) => {
  const nav = [
    {
      title: "Home",
      // dropdown: ['item1', 'item2'],
      link: "/",
    },
    {
      title: "About Us",
      // dropdown: ['item1', 'item2'],
      link: "/about-us",
    },
    {
      title: "Diagnose Disease",
      link: "/appv3",
    },
    {
      title: "Awareness",
      link: "/awareness",
    },
    {
      title: "Blog",
      // dropdown: ['item1', 'item2'],
      link: "/blogs",
    },
    {
      title: "Contact Us",
      // dropdown: ['item1', 'item2'],
      link: "/contact-us",
    },
  ];
  return (
    <>
      {!isOpen ? (
        <i
          className="lg:hidden fa-solid fa-bars float-right"
          onClick={() => setIsOpen(!isOpen)}
        ></i>
      ) : null}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-500 h-screen fixed top-0 right-0 z-30  bg-dropdown-bg text-white`}
      >
        <div className="h-20 search flex  bg-dropdown-bg text-md">
          <input
            className="outline-none relative bg-dropdown-bg my-2 mx-4 p-4 border-white text-xs"
            type="text"
            placeholder="SEARCH"
          />
          <span>
            <i className="absolute top-8 right-24 fa-solid fa-magnifying-glass cursor-pointer"></i>
          </span>
          <span className="flex justify-center items-center p-6 border-l border-gray-500">
            <i
              className="fa-solid fa-xmark"
              onClick={() => setIsOpen(!isOpen)}
            />
          </span>
        </div>
        <div className="px-7">
          <ul className="space-y-10 mt-4 cursor-pointer">
            {nav.map((item, i) => {
              return (
                <Link key={i} href={item.link}>
                  <li>{item.title}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
