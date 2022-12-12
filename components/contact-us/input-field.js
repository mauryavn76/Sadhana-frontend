import React from 'react';

const Input = ({
  max,
  onChange,
  value,
  type,
  name,
  placeHolder,
  reference,
}) => {
  return (
    <input
      value={value}
      ref={reference}
      onChange={e => onChange(e.target.value)}
      type={type}
      name={name}
      placeholder={placeHolder}
      maxLength={max}
      className="block w-full mr-4 outline-0 border-b-[1px] text-gray-400 border-gray-300"
    />
  );
};

export default Input;
// sm:my-1 sm:py-2 text-black md:my-4 md:py-3 md:text-sm
// className="block border-none outline-1 outline outline-gray-400 mt-2 text-black  outline-none w-full px-3 text-xxs py-2 sm:text-xs md:text-sm"
