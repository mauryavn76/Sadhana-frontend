import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { AboutData } from '../data/aboutData';
import {motion, useAnimation} from 'framer-motion'

function About() {

  const controls = useAnimation();
  const rootRef = useRef();
  const onScreen = useOnScreen(rootRef);

 useEffect(() => {
    if (onScreen) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          ease: "easeOut"
        }
      });
    }
  }, [onScreen, controls]);

  function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return isIntersecting;
}
  return (
    <>
      <div className="h-full w-full flex justify-center items-center flex-col">
        <img
          className="w-full h-[calc(100vh-80px)] hidden md:block "
          src="/images/new-about.jpg"
        />
        {/* <p className="underline text-3xl font-semibold">About Us</p> */}
        <motion.div
             ref={rootRef}
            initial={{ opacity: 0, x: -5 }}
             animate={controls}
         className="flex flex-col items-center w-full xl:w-full ">
          {AboutData.map((data, a) => {
            return (
              <div
                key={a}
                id="about-main"
                style={{ background: `${data.background}` }}
                className="flex flex-col lg:grid grid-cols-[50%_50%]  h-full xl:h-[calc(100vh-80px)] px-2 text-blackp"
              >
                <div className="text-sm px-4 md:py-5">
                  <p className="font-semibold text-3xl  text-gray-800 mb-3 mt-3">
                    {data.title}
                  </p>
                  <motion.div
                     ref={rootRef}
                     initial={{ opacity: 0, x: -10 }}
                     animate={controls}
                   className="h-96 my-2 md:h-[60vh] overflow-y-auto">
                    {data.paras.map((p, d) => {
                      return (
                        <motion.div
                            key={d} className="text-base my-0">
                            {p}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
                <motion.div
                     ref={rootRef}
                            initial={{ opacity: 0, x: -5 }}
                            animate={controls}
                 id="about" className="px-2 flex ">
                  <img
                    className="h-72 lg:h-full w-full md:my-0 flex justify-center items-center border-none"
                    src={data.img}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
}

export default About;
