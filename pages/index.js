import AboutSection from '../components/home/about-section';
import InfoSection from '../components/home/info-section';
import Banner from '../components/multiusable/banner';
import NewsLetter from '../components/multiusable/news-letter';
import AboutUs from '../components/home/about-us';
import MidSection from '../components/home/mid-section';
import UpperFooter from '../components/layout/upper-footer';
import DiagnoseDisease from './diagnose-disease';
import AwarenessHome from '../components/home/awareness-home';

export default function Home() {
  return (
    <div>
      <div>
        <Banner image="/images/home-images/homebanner1.jpg" />
        <div className="absolute top-[70px] h-24 w-full bg-[#FFCF2E] flex items-center text-center">
          <p className="text-black font-sans m-0 p-0 font-semibold text-xl md:text-3xl">
            HUMAN BODY IS THE MOST SOPHISTICATED MACHINE GIFTED BY THE ALMIGHTY
            TO HUMANKIND
          </p>
        </div>
        {/* <div className="absolute h-[38vh] flex top-24 left-5 w-1/4 space-y-2">
          <div className="h-44 bg-red-600 bg-gradient-to-b from-red-600 via-pink-500 to-pink-600 sm:h-72 md:h-72"></div>
          <div className="bg-gray-400 bg-opacity-50 border-l-4 border-red-400 lg:h-max sm:h-max md:h-max text-lg h-[75%]">
            <h1 className="text-sm pl-4 font-medium text-red-600 sm:text-3xl md:text-3xl lg:text-3xl sm:pl-8 md:pl-8 lg:pl-8 md:font-bold">
              Human Body
            </h1>
            <h1 className="text-sm pl-4 text-white flex justify-start font-medium sm:text-3xl md:text-3xl lg:text-3xl sm:pl-8 md:pl-8 lg:pl-8 sm:font-bold md:font-bold lg:font-bold sm:justify-center md:justify-center lg:justify-center ">
              is the most sophisticated machine gifted by the almighty to
              humankind
            </h1>
          </div>
        </div> */}
      </div>
      <div>
        <AboutUs />
        {/* <MidSection /> */}
        <DiagnoseDisease />
        <AwarenessHome />
        {/* <InfoSection /> */}
        {/* <AboutSection /> */}
        {/* <UpperFooter /> */}
        <NewsLetter />
      </div>
    </div>
  );
}
