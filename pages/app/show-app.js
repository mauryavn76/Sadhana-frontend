import { useState } from 'react';
import App from './app';
import Image from 'next/image';

// const animate = () => {
//   <motion.div
//   initial={{ scale: 0 }}
//   animate={{ rotate: 180, scale: 1 }}
//   transition={{
//     type: 'spring',
//     stiffness: 260,
//     damping: 20,
//   }}
// />
// }

const HandleApp = ({ setShowApp }) => {
  return (
    <div className="h-[calc(100vh-80px)] flex justify-between">
      <div className="w-1/2 h-4/5 px-5 flex flex-1 flex-col justify-start items-start">
        <div
          id="showapp"
          className="flex flex-1 flex-row justify-center items-center"
        >
          <span className="text-3xl text-teal-500 font-bold font-sans mb-2">
            Sadhana
          </span>
          <img className="w-20 h-20" src="images/app/applogo.jpg" />
        </div>
        {/* <div className="flex flex-1 flex-row justify-center items-center">
          <p className="text-3xl text-emerald-500 font-bold font-sans">
            Sadhana
          </p>
          <div className="w-20 h-20">
            <img src="images/app/applogo.jpg" />
          </div>
        </div> */}
        {/* <p className="text-3xl text-emerald-500 font-bold font-sans">Sadhana</p>
        <div className="w-20 h-20">
          <img src="images/app/applogo.jpg" />
        </div> */}
        <p className="font-sans text-lg font-semibold text-zinc-500">
          Feeling under the weather? Check out what are you suffering from in
          our Application.
        </p>
        <button
          onClick={() => {
            setShowApp(true);
          }}
          className="homepage-button"
        >
          Start Your Analysis
        </button>
      </div>
      <div>
        <Image src="/images/app/app-bg.gif" height={569} width={850} />
      </div>
    </div>
  );
};

export default HandleApp;
