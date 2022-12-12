import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Tag = ({ isSelected, label, onTap, onCancel }) => {
  return (
    <span
      className={`${
        isSelected && 'bg-cyan-300'
      } border-1 h-8 cursor-pointer flex justify-around items-center px-2 mr-2 mb-2 rounded-2xl text-black font-normal border-cyan-300
        `}
    >
      <span onClick={onTap} className="font-semibold">
        {label}
      </span>
      <CloseOutlinedIcon
        style={{ height: '20px' }}
        className="cursor-pointer"
        onClick={onCancel}
      />
    </span>
  );
};

export default Tag;
