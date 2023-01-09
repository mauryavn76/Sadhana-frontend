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
      content
      image{
        url
      }
    }
  }
}`;
export async function getStaticProps() {
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
      {isReadMore ? text.slice(0, 750) : text}
      <span ref={parent} onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
};

export default function About({ data }) {
  // console.log(data, 'ffffffffffff');
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  return (
    <div>
      {/* {JSON.stringify(data, null, 2)} */}
      <div className="h-full w-full flex justify-center items-center flex-col">
        <img
          className="w-full h-full hidden md:block "
          src={data.aboutpage.mainImage.url}
        />
        <div className="flex flex-col items-center w-full xl:w-full ">
          {data.aboutpage.aboutSection.map((ind) => {
            return (
              <div
                id="about-main"
                style={{ background: `${ind.background.hex}` }}
                className="flex flex-col lg:grid grid-cols-[50%_50%] h-full xl:h-[calc(100vh-80px)] px-2 text-blackp"
              >
                <div className="text-sm px-4 md:py-5">
                  <h3>{ind.title}</h3>
                  <div className="h-96 my-2 md:h-[60vh]">
                    <div ref={parent} className="text-base my-0 text-black">
                      <p className="font-semibold text-base text-gray-800 mb-3 mt-3 text-justify">
                        <ReadMore>{ind.content}</ReadMore>
                      </p>
                    </div>
                  </div>
                </div>
                <div id="abou" className="px-2 flex ">
                  <img src={ind.image?.url} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
