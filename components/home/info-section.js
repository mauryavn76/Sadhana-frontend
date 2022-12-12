import InfoItem from './info-item.';

const InfoSection = () => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row items-center lg:h-[calc(100vh-50px)] lg:px-20 px-10 py-2 lg:py-10">
      <InfoItem img="/images/home-images/About-img-1.png" />
      <InfoItem img="/images/home-images/About-img-2.png" />
      <InfoItem img="/images/home-images/About-img-3.png" />
    </div>
  );
};
export default InfoSection;
