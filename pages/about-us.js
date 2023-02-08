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
        <div className="flex flex-col items-center w-full xl:w-full ">
          {data.aboutpage.aboutSection.map((ind, i) => {
            return (
              <div
                key={i}
                id="about-main"
                style={{ background: `${ind.background.hex}` }}
                className="flex flex-col justify-center items-center lg:grid grid-cols-[50%_50%]  h-full xl:h-[calc(100vh-80px)] px-2 text-black"
              >
                <div className="text-sm px-4 md:py-5">
                  <p className="font-semibold text-3xl  text-gray-800 mb-3 mt-3">
                    {ind.title}
                  </p>
                  <div className="h-96 my-2 md:h-[60vh] flex items-center overflow-y-auto">
                    <div
                      className="text-base  my-0 text-justify"
                      dangerouslySetInnerHTML={{
                        __html: ind.content,
                      }}
                    />
                  </div>
                </div>
                <div
                  id="about"
                  className="px-2 flex md:flex md:justify-center md:items-center py-14"
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
      </div>
    </>
    // <div>
    //   {/* {JSON.stringify(data, null, 2)} */}
    //   <div className="h-full w-full flex justify-center items-center flex-col">
    //     <img
    //       className="w-full h-full hidden md:block "
    //       src={data.aboutpage.mainImage.url}
    //     />
    //     <div className="flex flex-col items-center w-full xl:w-full ">
    //       {data.aboutpage.aboutSection.map((ind) => {
    //         return (
    //           <div
    //             id="about-main"
    //             style={{ background: `${ind.background.hex}` }}
    //             className="flex flex-col lg:grid grid-cols-[50%_50%] h-full md:h-full lg:h-full px-2 text-black"
    //           >
    //             <div className="text-sm px-4 py-3 md:py-10">
    //               <h3 className="text-bold underline">{ind.title}</h3>
    //               <div className="h-full my-2 md:h-[71%] overflow-y-auto">
    //                 <div ref={parent} className="text-base my-0 text-black">
    //                   <p className="md:text-sm lg:text-lg text-base font-medium text-gray-800 mb-3 mt-3 text-justify">
    //                     <div
    //                       dangerouslySetInnerHTML={{
    //                         __html: ind.content,
    //                       }}
    //                     />
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div
    //               id="about"
    //               className="px-2 lg:py-10 py-3 lg:flex flex justify-center"
    //             >
    //               <img src={ind.image?.url} />
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
  );
}
