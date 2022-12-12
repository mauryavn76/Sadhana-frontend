const Textarea = ({ width, placeholder, value, onChange, error }) => {
  return (
    <textarea
      className={`${
        error ? 'border-[#E50000]' : 'border-black'
      } w-full border-[0.8px] h-14 outline-none pl-2 text-sm`}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
export default Textarea;
