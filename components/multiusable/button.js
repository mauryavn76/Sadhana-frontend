import React from 'react';

const Button = ({ onTap, color, label, selected, isDisabled }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onTap}
      className={`
      ${isDisabled ? 'bg-gray-300' : null}
      ${
        selected == label ? 'bg-[#FFCF2E]' : color
      } border-[1px] w-32 h-8 font-bold`}
    >
      {label}
    </button>
  );
};
export default Button;
