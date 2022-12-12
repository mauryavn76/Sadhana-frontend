const StepButtons = ({ title, onTap, selected, color, onSelect, index }) => {
  return (
    <button
      onClick={() => {
        onTap(title);
        onSelect(index);
      }}
      className={`h-12 w-[30%] rounded-sm ${
        selected === title && 'bg-cyan-500'
      }`}
      style={{ background: color }}
    >
      {title}
    </button>
  );
};
export default StepButtons;
