const TransparantButton = ({
  onTap,
  border,
  color,
  label,
  selected,
  isDisabled,
}) => {
  return (
    <button
      onClick={onTap}
      className={`${color} ${border} border-[1px] w-32 h-8 font-bold bg-transparent`}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};
export default TransparantButton;
