import React, { useState } from 'react';
import Button from '../../multiusable/button';

const Tost = ({ setSuccess, text }) => {
  return (
    <>
      <div className="fixed left-0 top-0 w-full h-screen ">
        <div className="relative w-1/3 mx-auto mt-[15%] bg-white h-[25%]">
          <div className="px-14 py-8">
            <h1 className="font-bold text-2xl text-center">{text}</h1>
            <div className="float-right mt-14">
              <Button
                label="Close"
                color="bg-[#8FECFF]"
                onTap={() => setSuccess(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tost;
