import React from 'react';

const Input = ({ type, name, placeHolder }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeHolder}
      className="block border-none text-black  outline-none w-full px-3 text-xxs py-2 sm:text-xs md:text-sm"
    />
  );
};

export default Input;
// sm:my-1 sm:py-2 text-black md:my-4 md:py-3 md:text-sm
