import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
export const MobileMenu = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
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
        <div className="flex flex-col justify-end w-full">
          <i
            className="lg:hidden fa-solid fa-bars w-fit"
            onClick={() => setIsOpen(!isOpen)}
          ></i>
        </div>
      ) : null}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-500 h-screen fixed top-0 right-0 z-30  bg-black text-white`}
      >
        {/* <div className="h-20 search flex  bg-dropdown-bg text-md">
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
        </div> */}
        <div className="px-7 my-4">
          <span>
            <i
              className="fa-solid fa-xmark"
              onClick={() => setIsOpen(!isOpen)}
            />
          </span>
          <ul className="space-y-10 p-0 mt-4 cursor-pointer">
            {nav.map((item, i) => {
              return (
                <div
                  onClick={() => {
                    router.push(item.link);
                    setIsOpen(!isOpen);
                  }}
                  key={i}
                  // href={item.link}
                >
                  <li className="list-none">{item.title}</li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
