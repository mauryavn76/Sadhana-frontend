import BackgroundImg from './backgroundimg';
import Step1 from '../app/step1';

// const [stepOne, setStepOne] = useState('');

function ProgressBar({ stepNumber }) {
  return (
    <div className="w-full h-20">
      <div
        className={`bg-[#00D5FF]/30 h-full z-10 ${
          stepNumber === 1 && 'w-1/4'
        } ${stepNumber === 2 && 'w-2/4'} ${stepNumber === 3 && 'w-3/4'} ${
          stepNumber === 4 && 'w-full'
        }`}
      ></div>
    </div>
  );
}

export default ProgressBar;
