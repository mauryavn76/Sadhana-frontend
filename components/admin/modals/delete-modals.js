import React from 'react';

const Deletemodals = () => {
  return (
    <div
      className="absolute p-10 border-2 text-center right-[25%] w-[40%] h-[20%] 
    top-[30%] bg-white bg-opacity-60 space-y-5"
    >
      <div>
        <h1>Are you sure you want to Delete</h1>
      </div>
      <div className="space-x-2">
        <button className="border-2 px-4">Yes</button>
        <button className="border-2 px-4">No</button>
      </div>
    </div>
  );
};

export default Deletemodals;
