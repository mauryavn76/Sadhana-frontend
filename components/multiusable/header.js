const Header = ({ title }) => {
  return (
    <div className="flex sticky-top bg-gradient-to-r -z-10 from-[#E2E2E2] to-[#8FECFF] h-[52px]">
      <span className="p-3 float-left text-black text-base font-bold">
        {title}
      </span>
    </div>
  );
};

export default Header;
