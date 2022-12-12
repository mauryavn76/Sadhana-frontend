const AboutItem = () => {
  const info = (
    <p className="text-sm text-center lg:text-left xl:text-base"></p>
  );

  return (
    // <div className="w-full py-3 flex justify-center items-center flex-col border-b-[0.5px] md:py-10 border-none space-y-5">
    //   <div className="bg-transparent space-x-2 md:flex-cols-6">
    //     <i className="fa-solid fa-user-astronaut text-2xl"></i>
    //   </div>
    //   <div className="bg-transparent w-full">
    // <span className="text-md lg:text-lg xl:text-lg font-bold bg-sky-900">
    //   Ashtang Yoga Sutra
    // </span>
    // <p className="text-sm text-center lg:text-left xl:text-base">
    //   Pure knowledge of ashtang yoga leads you to prevent sufferings in all
    //   aspects of life and to attain enlightenment.
    //     </p>
    //   </div>
    // </div>
    <div className="w-[90%] flex gap-3">
      <div className="flex flex-row justify-center items-center">
        <i className="fa-solid fa-user-astronaut lg:mb-36 text-3xl"></i>
      </div>
      <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-2">
        <span className="font-bold">Ashtang Yoga Sutra</span>
        <p className="text-sm">
          Pure knowledge of ashtang yoga leads you to prevent sufferings in all
          aspects of life and to attain enlightenment.
        </p>
      </div>
    </div>
  );
};
export default AboutItem;
