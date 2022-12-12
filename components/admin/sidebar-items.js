import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarItems = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  return (
    <div className="mx-8 my-4 text-sm">
      <div
        onClick={() => setDropdown(!dropdown)}
        className={`${
          router.pathname == item.link ? "bg-[#d2f3fa] hover:bg-[#d2f3fa]" : ""
        } py-2 px-4 rounded-full flex items-center  w-full justify-center hover:bg-gray-200 hover:rounded-full hover:px-2  h-8 my-2`}
      >
        <div className="w-[10%]">
          {/* <i className={item.icon}></i> */}
          {item.icon}
        </div>
        <div className="flex justify-start  py-1 ml-4 flex-1">
          {item.dropdown ? (
            <span>{item.title}</span>
          ) : (
            <Link href={item.link}>
              <span>{item.title}</span>
            </Link>
          )}
        </div>
        <div className="w-[10%]">
          {item.dropdown && (
            <i
              className={`${
                !dropdown ? "fa-solid fa-caret-down" : "fa-solid fa-caret-up"
              } ml-1`}
            ></i>
          )}
        </div>
      </div>
      <div className="ml-3">
        {dropdown &&
          item.dropdown &&
          item.dropdown.map((i, index) => {
            return (
              <li
                className={`${
                  router.pathname == i.link
                    ? "bg-[#d2f3fa] hover:bg-[#d2f3fa]"
                    : ""
                } py-2 px-4 rounded-full flex items-center hover:bg-gray-200`}
                key={index}
              >
                {i.icon}
                <Link href={i.link}>
                  <p className={`my-0 py-0 ml-2`}>{i.title}</p>
                </Link>
              </li>
            );
          })}
      </div>
    </div>
  );
};
export default SidebarItems;
