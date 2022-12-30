import React from "react";
import { AboutData } from "../data/aboutData";

function About() {
  return (
    <>
      <div className="h-full w-full flex justify-center items-center flex-col">
        <img
          className="w-full h-[calc(100vh-80px)] hidden md:block "
          src="/images/about.png"
        />
        {/* <p className="underline text-3xl font-semibold">About Us</p> */}
        <div className="flex flex-col items-center w-[90%] xl:w-[90%] ">
          {AboutData.map((data) => {
            return (
              <div
                id="about-main"
                className={`${data.background} flex flex-col lg:grid grid-cols-[50%_50%]  h-full xl:h-[calc(100vh-80px)] px-2 text-black my-3`}
              >
                <div className="text-sm px-4  md:py-5">
                  <p className="font-semibold text-3xl  text-gray-800 mb-3 mt-3">
                    {data.title}
                  </p>
                  <div className="h-96 my-2 md:h-[60vh] overflow-y-auto">
                    {data.paras.map((p) => {
                      return <p className="text-base my-0">{p}</p>;
                    })}
                  </div>
                </div>
                <div id="about" className="px-2 flex ">
                  <img
                    className="h-72 lg:h-full w-full my-2 md:my-0 flex justify-center items-center "
                    src="/images/about.svg"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default About;
