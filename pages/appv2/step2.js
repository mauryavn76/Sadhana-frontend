import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import BASE_URL from '../../utils/base-url';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AppV2 from '.';
import Step3 from './step3';

const Step2 = ({selectSymptom, exists}) => {
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [bodyPartSymptoms, setBodyPartSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [index, setIndex] = useState(0);
  // const [show, setShow] = useState(false);
  const [s, setS] = useState(false);
  const [show, setShow] = useState(true);

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

  // const getSymptomsByBodyParts = async () => {
  //   let bodyPartIds = selectedBodyParts.map((bodyPart) => {
  //     return bodyPart._id;
  //   });

  //   const res = await BASE_URL.post('/symptomsByBodyPart', {
  //     b_ids: bodyPartIds,
  //   });
  //   setBodyPartSymptoms(res.data.data);
  // };

  // useEffect(() => {
  //   getSymptomsByBodyParts();
  // }, [selectedBodyParts]);

  const [reconfirmSymptoms, setReconfirmSymptoms] = useState([]);

  const getReconfirmSymptoms = async () => {
    const bodyPartIds = selectedBodyParts.map((part) => part._id);
    const symptomIds = selectedSymptoms.map((sym) => sym._id);

    const details = {
      s_ids: symptomIds,
      b_ids: bodyPartIds
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
      {!s ? (
        <>
          <div className="flex justify-center font-bold border-cyan-500 border-solid bg-[#86E6FB] h-12">
            <div className="flex flex-1 justify-around items-center">
            <p className="m-0">SEARCH BY BODY PARTS</p>
              <p className="m-0">SEARCH BY BODY FUNCTIONS</p>
              <p className="m-0">SEARCH BY SYMPTOMS</p>
            </div>
          </div>
          <div className="bg-[#4EB2C9ED]">
            <div className="bg-[#DAF4FA] mx-24">
              <div className="flex flex-row flex-1 h-[calc(100vh-170px)] text-[#DCDCDC] gap-3">
                <div className="flex flex-1 flex-col gap-10 items-center h-[50%] w-[30%]">
                  <div className="w-full flex flex-1 items-center justify-center bg-white">
                    <img
                      className="w-[75%] h-[75%]"
                      src="/images/app/step 4-01.png"
                    />
                  </div>
                  <div className="flex flex-1 justify-center items-center h-1">
                    <p className="text-xl text-zinc-900 font-bold m-0 underline">
                      SELECTED SYMPTOMS
                    </p>
                  </div>
                  <div className="w-full flex flex-col justify-center gap-10">
                    <div className="h-[calc(114vh-600px)] overflow-y-auto">
                      {selectedSymptoms.map((sym, i) => {
                        return (
                          <div className="text-black border-b-2 border-black py-1 px-2 border-dotted flex flex-1 overflow-auto justify-between">
                            {sym.name}
                            <CloseOutlinedIcon
                              className="cursor-pointer"
                              onClick={() => {
                                let newArr = [...selectedSymptoms];
                                newArr.splice(i, 1);
                                setSelectedSymptoms(newArr);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="w-[70%] h-full pr-4">
                  <div className="flex flex-1 flex-row">
                    <div className="text-black flex flex-1 justify-center items-center flex-col py-1.5">
                      <h1 className="text-black font-semibold text-xl m-0">
                        AGE
                      </h1>
                      <input
                        className="w-14 h-7 py-3 px-1 bg-black text-white placeholder:px-1 placeholder:text-white flex justify-center items-center"
                        type="number"
                        placeholder="Age"
                      />
                    </div>
                    <div className="text-black flex flex-1 justify-center items-center flex-col py-1.5">
                      <h1 className="text-black font-semibold text-xl m-0">
                        SEX
                      </h1>
                      <div className="flex h-max flex-col">
                        {show ? (
                          <button className="w-15 h-7 bg-black text-white mx-2 px-4 py-1">
                            MALE
                          </button>
                        ) : (
                          <button className="w-15 h-7 bg-black text-white mx-2 px-4 py-1">
                            FEMALE
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <table className="w-full h-[50%]">
                    <thead>
                      <tr>
                        <th className="bg-[#00000036] px-7 py-3 text-black">
                          FOR BETTER DIAGNOSYS- PLEASE SELECT FROM BELOW
                          SYMPTOMS IF ANY
                        </th>
                      </tr>
                    </thead>
                    <tbody className="block h-[calc(120vh-450px)] overflow-y-auto">
                    {reconfirmSymptoms.length > 0 &&
                      reconfirmSymptoms.map((symptom, i) => {
                         return (
                           <div key={i} onClick={() => selectSymptom(symptom)}>
                         {exists(symptom) ? (
                          <div className="flex h-max bg-blue-200 p-2 items-center justify-center cursor-pointer rounded-xl">
                            {symptom.name}
                          </div>
                        ) : (
                          <div className="flex h-max bg-gray-200 p-2 items-center justify-center cursor-pointer rounded-xl">
                            {symptom.name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end items-end flex-col">
                <button
                  onClick={setS}
                  className=" text-black font-bold bg-[#86E6FB] rounded-md py-2 px-4 mr-2 mb-2"
                >
                  NEXT STEP
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Step3 />
      )}
    </>
  );
};

export default Step2;

// {bodyParts.map((part) => {
//   return (
//     <tr className="flex flex-col px-2">
//       <div className="flex gap-2 justify-between text-black border-b-2 border-black py-1 border-dotted">
//         <span className="text-lg">{part.id}</span>
//         <input
//           className="cursor-pointer"
//           type="checkbox"
//           onChange={(e) => handleSelectBodyParts(e, part)}
//         />
//       </div>
//     </tr>
//   );
// })}