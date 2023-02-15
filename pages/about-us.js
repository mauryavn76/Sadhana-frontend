// import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { request } from '../utils/request';
import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const ABOUT_QUERY = `query MyQuery {
  aboutpage {
    mainImage {
      url
    }
    aboutSection {
      background {
        hex
      }
      title
      content(markdown: true)
      image{
        url
      }
    }
  }
}`;
export async function getServerSideProps() {
  const data = await request({
    query: ABOUT_QUERY,
    variables: { limit: 10 },
  });
  return {
    props: { data },
  };
}

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 575) : text}
      <span onClick={toggleReadMore} className="read-or-hide" id="read-more">
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
};

export default function About({ data }) {
  return (
    <>
      <div className="h-full w-full flex justify-center items-center flex-col">
        <img
          className="w-full h-full hidden md:block "
          src={data.aboutpage.mainImage.url}
        />
        <div className="hidden md:block  md:flex-col items-center w-full xl:w-full ">
          {data.aboutpage.aboutSection.map((ind, i) => {
            return (
              <div
                key={i}
                id="about-main"
                style={{ background: `${ind.background.hex}` }}
                className="flex flex-col justify-center items-center lg:grid grid-cols-[50%_50%]  h-full xl:h-[calc(100vh-80px)] px-2 text-black"
              >
                <div className="text-sm px-4 md:py-5">
                  <p className="font-semibold text-3xl text-gray-800 mb-3 mt-3">
                    {ind.title}
                  </p>
                  <div className="flex flex-col justify-center text-justify items-center overflow-y-auto" dangerouslySetInnerHTML={{
                        __html: ind.content,
                      }}>
                  </div>
                </div>
                <div
                  id="about"
                  className="px-2 flex md:flex md:justify-center md:items-center py-4"
                >
                  <img
                    className="h-72 lg:h-full w-full md:my-0 border-none"
                    src={ind.image?.url}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {/* MOBILE */}
        <div className="flex md:hidden flex-col items-center w-full xl:w-full ">
          {data.aboutpage.aboutSection.map((ind, i) => {
            return (
              <div
                key={i}
                id="about-main"
                style={{ background: `${ind.background.hex}` }}
                className="flex flex-col justify-center items-center lg:grid grid-cols-[50%_50%] h-[calc(100vh-80px)] px-2 text-black"
              >
                <div className="text-sm px-4 md:py-5">
                  <p className="font-semibold text-3xl text-gray-800 mb-3 mt-3">
                    {ind.title}
                  </p>
                  <div
                  id="about"
                  className="px-2 flex md:flex md:justify-center md:items-center py-4"
                >
                  <img
                    className="h-[40%] lg:h-full w-full md:my-0 border-none"
                    src={ind.image?.url}
                  />
                </div>
                  <div className="h-[35vh] flex text-justify flex-col items-cener overflow-y-auto" dangerouslySetInnerHTML={{
                        __html: ind.content,
                      }}>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
      
    </>
   
  );
}
