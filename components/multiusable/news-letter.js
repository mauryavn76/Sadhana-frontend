import React from 'react';

const NewsLetter = () => {
  return (
    <div
      className="py-14 lg:py-32 h-96 flex flex-col items-center lg:items-start lg:pl-20 space-y-5"
      style={{
        backgroundImage: `url(${'http://divineurja.com/wp-content/uploads/2022/03/Car-Repairbg_1_.png'})`,
      }}
    >
      <h1 className="text-white text-lg font-bold sm:text-xl md:text-2xl">
        Connect with US
      </h1>
      <div className="flex w-full items-center lg:justify-start mt-2 flex-col sm:flex-row">
        <input
          type="text"
          name="newsletter"
          placeholder="Enter Your Email"
          className="w-4/5 px-5 py-2 sm:py-3 md:py-4 sm:w-1/3"
        />
        <button className="bg-dropdown-item-color flex justify-center items-center mt-4 text-white px-8 w-28 py-2 sm:mt-0 sm:py-3 md:py-4">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
