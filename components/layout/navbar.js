import React, { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from "./dropdown";
import { useRouter } from "next/router";
import { MobileMenu } from "./MobileMenu";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [navHeight, setNavHeight] = useState("80px");

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
    <nav
      className="flex top-0 items-center bg-black text-white md:justify-around justify-end px-16 sticky z-20"
      style={{ height: navHeight }}
    >
      <div className="hidden md:block md:h-full">
        <ul className="flex h-full space-x-10 cursor-pointer">
          {nav.map((item) => {
            return (
              <li
                key={item.title}
                className="h-full flex items-center group border-b-4 hover:border-b-4 border-black hover:border-dropdown-item-color"
              >
                <div className="flex items-start space-x-1">
                  <Link href={item.link}>
                    <span
                      className={`${
                        router.pathname === item.link && "text-blue-400"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                  {/* <i className="fa-solid fa-caret-down text-dropdown-item-color"></i> */}
                </div>
                {/* <Dropdown list={item.dropdown} /> */}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="hidden md:flex items-center justify-between px-3 md:w-[20%] w-[70%] py-[5px] rounded-full bg-white">
        <input
          type="text"
          className="  h-full text-black w-[80%] outline-none"
          placeholder="Search..."
        />
        <SearchIcon className="text-black" />
      </div>
      <div className="hidden md:flex md:cursor-pointer md:text-xl md:space-x-5 md:text-dropdown-item-color">
        <i className="fa-brands fa-facebook-f"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-twitter"></i>
      </div>
      <MobileMenu isOpen={mobileMenu} setIsOpen={setMobileMenu} />
    </nav>
  );
};

export default Navbar;
