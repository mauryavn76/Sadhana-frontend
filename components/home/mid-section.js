import Image from 'next/image';

const MidSection = () => {
  return (
    <div className="bg-[#023c5b] flex-1 flex justify-center h-2/4 lg:h-[calc(100vh-50px)] lg:px-20 lg:justify-end md:h-[calc(100vh-50px)]">
      <Image
        src="/images/home-images/widget.png"
        // layout="responsive"
        width={500}
        height={468}
      />
    </div>
  );
};

export default MidSection;
