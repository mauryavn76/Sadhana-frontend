import AboutItem from './about-item';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <>
      <div className="bg-dropdown lg:hidden px-20 bg-sky-900 flex flex-col lg:flex-row text-white lg:h-screen">
        <div className="flex flex-col h-max w-full space-x-10 items-center lg:flex-row lg:justify-start">
          <h1 className="border-b-2 h-12 border-red-600 text-xl pl-2 pt-3 lg:border-l-4 lg:border-red-600 lg:text-2xl lg:border-b-0 ">
            Our Platform
          </h1>
          <div className="mt-10">
            <Image
              src="/images/home-images/our-platform.png"
              height={400}
              width={400}
            />
          </div>
          <div
            className="grid row-span-4 gap-x-10 lg:gap-y-10 flex-1 justify-center items-center
       lg:grid-cols-2 lg:justify-start md:justify-center md:items-center lg:flex-row"
          >
            <AboutItem />
            <AboutItem />
            <AboutItem />
            <AboutItem />
          </div>
        </div>
      </div>

      <div className="bg-dropdown py-2 px-20 hidden bg-sky-900 text-white lg:flex flex-col lg:flex-row h-[calc(100vh-50px)] md:flex-row">
        <div className="flex gap-5 flex-col h-max w-full  items-center lg:justify-start">
          <div className="w-full">
            <h1 className="border-b-2 h-12 border-red-600 text-xl pl-2 pt-3 lg:border-l-4 lg:border-red-600 lg:text-2xl lg:border-b-0 ">
              Our Platform
            </h1>
          </div>
          <div className="flex">
            <div
              className="grid row-span-4 gap-x-8 lg:gap-y-10 flex-1 justify-center
       lg:grid-cols-2 lg:justify-start lg:flex-row"
            >
              <AboutItem />
              <AboutItem />
              <AboutItem />
              <AboutItem />
            </div>
            <div className="">
              <Image
                src="/images/home-images/our-platform.png"
                height={400}
                width={400}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutSection;
