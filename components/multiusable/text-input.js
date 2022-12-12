const TextInput = ({ placeholder, type, value, onChange, error }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${
        error ? 'border-[#E50000]' : 'border-black'
      } w-full border-[0.8px] h-8 outline-none pl-2 text-sm`}
    />
  );
};
export default TextInput;
