// import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { request } from '../utils/request';

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

export default function About({ data }) {
  console.log(data, 'ffffffffffff');
  return (
    <div>
      {/* {JSON.stringify(data, null, 2)} */}
      <div className="h-full w-full flex justify-center items-center flex-col">
        <img
          className="w-full h-[calc(100vh-80px)] hidden md:block "
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
                  <div className="h-96 my-2 md:h-[60vh] overflow-y-auto">
                    <h3>{ind.title}</h3>
                    <div className="text-base my-0 text-black">
                      <p className="font-semibold text-base text-gray-600 mb-3 mt-3">
                        {ind.content}
                      </p>
                    </div>
                  </div>
                </div>
                <div id="abou" className="px-2 flex ">
                  <img src={ind.image.url} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
