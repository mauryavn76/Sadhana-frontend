const InfoItem = ({ img }) => {
  return (
    <div className="h-[100%] w-[100%] sm:w-full lg:w-full border-b-[0.5px] border-none flex flex-col items-center text-black px-2 shadow-lg">
      {/* <div className="bg-white :bg-home-info-icon-bg lg:border-8 border-white w-10 h-10 md:w-20 md:h-20 rounded-full flex justify-center items-center">
        {/* <i className="fa-solid fa-file text-lg sm:text-2xl text-gray-400 group-hover:text-white" /> */}
      {/* </div> */}
      <div className="flex flex-col h-full items-center">
        <div className="cursor-pointer h-[50%] hover:animate-pulse">
          <img src={img} alt="app" className="h-full" />
        </div>
        <div className="border-l-red-600 border-l-4 flex flex-col justify-between gap-2 px-3">
          <div>
            <h1 className="text-start text-xl sm:text-lg font-semibold lg:text-2xl xl:text-lg">
              Diagnostic App
            </h1>
          </div>
          <p className="m-0 text- lg:text-base sm:text-sm xl:text-base">
            Helps to find out possible diseases, guides to natural cure. This AI
            based app evaluates life patterns, symptoms, genes and medical
            history.
          </p>
        </div>
        <button className="mt-7 text-blue-500 m-5 p-3 hover:bg-blue-500 hover:text-white rounded-lg duration-200 lg:mx-3">
          Read More
        </button>
      </div>
    </div>
  );
};
export default InfoItem;
