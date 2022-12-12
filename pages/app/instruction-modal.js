import { motion, AnimatePresence } from 'framer-motion';
import Instructions from './instructions';

const InstructionModal = ({ setModal, setShowApp }) => {
  const dropIn = {
    hidden: {
      y: '-100vh',

      opacity: 1,
    },
    visible: {
      y: '0vh',

      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 100,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };

  return (
    <div className="">
      <motion.div
        className="w-full"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Instructions setModal={setModal} />;
      </motion.div>
    </div>
  );
};

export default InstructionModal;
