import React from "react";

const NewsLetter = () => {
  return (
    <div className="bg-[#FFCF2E] py-4 flex flex-col justify-around h-56">
      <h1 className="text-lg font-bold text-center w-full sm:text-xl md:text-4xl">
        Connect with US
      </h1>
      <p className="text-center font-semibold">
        Stay informed about the happenings at WWBG. Sign up now
      </p>
      <div className="flex w-full justify-center h-14 flex-col sm:flex-row">
        <input
          type="text"
          name="newsletter"
          placeholder="Enter Your Email"
          className="h-full px-4 outline-none"
        />
        <button className="bg-black h-full flex justify-center items-center  text-white px-8 w-36 py-2 sm:mt-0 sm:py-3 md:py-4">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
