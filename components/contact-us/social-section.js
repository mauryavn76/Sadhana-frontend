import Image from 'next/image';
const Social = () => {
  return (
    <div className="text-contact-us-main w-full flex flex-col py-5 items-center md:py-8 md:justify-center sm:w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl ">FOLLOW US</h1>
        <p className="text-sm sm:text-base">
          Even the smallest support counts!
        </p>
      </div>
      <div className="flex items-center justify-center w-full mt-5">
        <span>
          <i className="px-2 fa-brands fa-facebook-f text-4xl sm:text-5xl md:text-6xl md:pr-7 lg:text-7xl lg:pr-10"></i>
        </span>
        <span>
          <i className="px-2 fa-brands fa-instagram text-4xl sm:text-5xl md:text-6xl md:pr-7 lg:text-7xl lg:pr-10"></i>
        </span>
        <span>
          <i className="px-2 fa-brands fa-linkedin-in text-4xl sm:text-5xl md:text-6xl md:pr-7 lg:text-7xl lg:pr-10"></i>
        </span>
        <span>
          <i className="px-2 fa-brands fa-twitter text-4xl sm:text-5xl md:text-6xl lg:text-7xl"></i>
        </span>
      </div>
    </div>
  );
};

export default Social;
