import React, { useEffect, useState } from 'react';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import BASE_URL from '../../utils/base-url';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Step3 = () => {
    const [bodyParts, setBodyParts] = useState([]);
    const [selectedBodyParts, setSelectedBodyParts] = useState([]);
    const [bodyPartSymptoms, setBodyPartSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [show, setShow] = useState(true);
    const [s1, setS1] = useState(false);
    const [showModal, setShowModal] = useState(false);
  
    console.log('selectedBodyParts', selectedBodyParts);

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
    
      const getSymptomsByBodyParts = async () => {
        let bodyPartIds = selectedBodyParts.map((bodyPart) => {
          return bodyPart._id;
        });
    
        const res = await BASE_URL.post('/symptomsByBodyPart', {
          b_ids: bodyPartIds,
        });
        setBodyPartSymptoms(res.data.data);
      };
    
      useEffect(() => {
        getSymptomsByBodyParts();
      }, [selectedBodyParts]);
    
      const [imag, setImag] = useState([
        {
          index: 0,
          src: '/images/app/step 1-01.png',
        },
        {
          index: 1,
          src: '/images/app/step 2-01-01.png',
        },
        {
          index: 2,
          src: '/images/app/step 3-01.png',
        },
        {
          index: 3,
          src: '/images/app/step 4-01.png',
        },
      ]);
    
    return ( 
        <>
        <div className="flex justify-center items-center">
        <table className="w-full">
                <thead>
                  <tr>
                    <th className="bg-[#00000036] px-7 py-3 text-black">
                      DISESASE WITH PROBABILITY IS LISTED BELOW - SELECT TO KNOW
                      MORE ABOUT THAT DISEASE
                    </th>
                  </tr>
                </thead>
                <div className="flex flex-1 flex-row">
                  <div className="w-[75%] mt-3">
                    <h1 className="bg-[#00000036] px-3 py-1 text-black flex flex-1 text-lg justify-center items-center">
                      PROBABLE DISEASE
                    </h1>
                  </div>
                  <div className="w-[25%] mt-3 ml-3">
                    <h1 className="bg-[#00000036] px-3 py-1 text-black flex flex-1 text-lg justify-center items-center">
                      PROBABILITY
                    </h1>
                  </div>
                </div>
                <tbody className="block h-[calc(70vh-200px)] overflow-y-auto">
                  {bodyParts.map((part) => {
                    return (
                      <tr className="flex flex-col px-2">
                        <div className="flex gap-2 justify-between text-black border-b-2 border-black py-1 border-dotted">
                          <span className="text-lg">{part.id}</span>
                          <input
                            className="cursor-pointer"
                            type="checkbox"
                            onChange={(e) => handleSelectBodyParts(e, part)}
                          />
                        </div>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
        </div>
        </>
     );
}
 
export default Step3;