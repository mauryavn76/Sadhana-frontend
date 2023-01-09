import Image from "next/image";

const Banner = ({ image }) => {
  return (
    <div className="w-full relative">
      <img
        src={image}
        // height="100%"
        // width="100%"
        // layout="fill"
        // fill
        // objectFit="cover"
        // width={1200}
        // height={500}
        // layout="responsive"
      />
    </div>
  );
};

export default Banner;
