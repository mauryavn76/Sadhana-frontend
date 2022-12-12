import Image from 'next/image';
const Section = ({ img, title, para, isRight }) => {
  return isRight ? (
    <div className=" flex flex-col justify-center bg-white text-blue-400 px-10 lg:px-25  py-10 lg:flex-row text-2xl">
      <div className="flex-1 flex flex-col items-start lg:px-28">
        <h1 className="text-2xl font-bold mb-4 lg:text-5xl">{title}</h1>
        <p className=" text-lg  text-blue-400 mb-2 md:text-xl lg:text-2xl">
          {para}
        </p>
      </div>
      <div className=" flex md:justify-center">
        <Image height={600} width={500} src={img} alt="" />
      </div>
    </div>
  ) : (
    <div className=" flex flex-col justify-center bg-white text-blue-400 px-10 lg:px-25  py-10 lg:flex-row text-2xl">
      <div className=" flex md:justify-center">
        <Image height={600} width={500} src={img} alt="" />
      </div>
      <div className="flex-1 flex flex-col items-start lg:px-28">
        <h1 className="text-2xl font-bold mb-4 lg:text-5xl">{title}</h1>
        <p className=" text-lg  text-blue-400 mb-2 md:text-xl lg:text-2xl">
          {para}
        </p>
      </div>
    </div>
  );
};

export default Section;
