import React from 'react';
export const MobileMenu = ({ isOpen, setIsOpen }) => {
  const nav = [
    {
      title: 'HOME',
      dropdown: ['item1', 'item2'],
      link: '/',
    },
    {
      title: 'CONTACT-US',
      dropdown: ['item1', 'item2'],
      link: '/contact-us',
    },
    {
      title: 'ABOUT US',
      dropdown: ['item1', 'item2'],
      link: '/about-us',
    },
  ];
  return (
    <>
      {!isOpen ? (
        <i
          className="sm:hidden fa-solid fa-bars"
          onClick={() => setIsOpen(!isOpen)}
        ></i>
      ) : (
        <div></div>
      )}
      <div
        className={`${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ease-in-out duration-500 h-screen fixed top-0 right-0 z-30  bg-dropdown-bg text-white`}
      >
        <div className=" h-20 search flex  bg-dropdown-bg text-md">
          <input
            className="relative bg-dropdown-bg my-2 mx-4 p-4 border-white text-xs"
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
          <h3 className="text-dropdown-item-color pt-10 pb-4 cursor-pointer">
            MEMBERSHIP
          </h3>
          <ul className="space-y-10 cursor-pointer">
            {nav.map((item) => {
              return (
                <li key={item.title} className="border-t border-gray-600 pt-3">
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
