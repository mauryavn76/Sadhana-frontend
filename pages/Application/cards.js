import React, { useState } from 'react';

const Cards = ({ image, title, desc }) => {
  const [data, setData] = useState(false);

  return (
    <div className="cursor-pointer border-2 shadow-2xl w-full space-y-2">
      <div className="w-full">
        <img src={image} alt="" />
      </div>
      <div className="w-full p-3">
        <div className="text-cyan-700 text-2xl">{title}</div>
        <div>
          <p className=" text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
