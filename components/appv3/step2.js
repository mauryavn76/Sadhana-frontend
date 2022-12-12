import BASE_URL from '../../utils/base-url';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"

const Step2 = ({ selectedSymptoms }) => {

  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [bodyPartSymptoms, setBodyPartSymptoms] = useState([]);
  // const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  // const [index, setIndex] = useState(0);
  // const [show, setShow] = useState(false);
  const [s, setS] = useState(false);
  const [show, setShow] = useState(true);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const [loading, setIsLoading] = useState(false)

  console.log('1111', selectedSymptoms);

  const handleSelectBodyParts = (e, bodyPart) => {
    const exists = selectedBodyParts.some(
      (part) => part.name === bodyPart.name
    );
    if (e.target.checked) {
      setSelectedBodyParts((prev) => [...prev, bodyPart]);
    } else {
      setSelectedBodyParts(
        selectedBodyParts.filter((part) => part.name !== bodyPart.name)
      );
    }
  };

  const hanldeSelectSymptoms = (e, symptom) => {
    if (e.target.checked) {
      setSelectedSymptoms((prev) => [...prev, symptom]);
    } else {
      setSelectedSymptoms(
        selectedSymptoms.filter((part) => part.name !== symptom.name)
      );
    }
  };

  const getBodyParts = async () => {
    try {
      const res = await BASE_URL.get('/bodyparts');
      setBodyParts(res.data.data);
    } catch (err) {
      console.log(err);
      setBodyParts([]);
    }
  };

  const handleSymptomExists = (symptom) => {
    return selectedSymptoms.some((sym) => sym._id === symptom._id);
  };

  useEffect(() => {
    getBodyParts();
  }, []);

  const [reconfirmSymptoms, setReconfirmSymptoms] = useState([]);

  const getReconfirmSymptoms = async () => {
    const bodyPartIds = selectedBodyParts.map((part) => part._id);
    const symptomIds = selectedSymptoms.map((sym) => sym._id);

    // const details = {
    const details = {
      s_ids: symptomIds,
      // };
    };
    const res = await BASE_URL.post('/reconfirm-symptoms-disease', details);
    setReconfirmSymptoms(res.data.data);
    console.log(res);
  };
  useEffect(() => {
    getReconfirmSymptoms();
  }, []);

  return (
    <>
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0}} className="flex justify-center items-center">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-[#00000036] px-7 py-3 text-black">
                FOR BETTER DIAGNOSYS- PLEASE SELECT FROM BELOW
                SYMPTOMS IF ANY
              </th>
            </tr>
          </thead>
          <tbody className="block h-[calc(100vh-350px)] overflow-y-auto">
            {reconfirmSymptoms.length > 0 &&
              reconfirmSymptoms.map((symptom, i) => {
                return (
                  //  <div key={i} onClick={() => selectSymptom(symptom)}>
                  <div className='px-2 flex gap-2 justify-between text-black border-b-2 border-black py-1 border-dotted' key={i} >
                    {/* <div className="flex h-max bg-blue-200 p-2 items-center justify-center cursor-pointer rounded-xl"> */}
                    {symptom.name}
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      onChange={(e) => handleSelectBodyParts(e, symptom)}
                    />
                    {/* </div> */}
                    {/* ) : (
                          <div className="flex h-max bg-gray-200 p-2 items-center justify-center cursor-pointer rounded-xl">
                            {symptom.name}
                          </div>
                        )} */}
                  </div>
                );
              })}
          </tbody>
        </table>
      </motion.div>
    </>
  );
}

export default Step2;