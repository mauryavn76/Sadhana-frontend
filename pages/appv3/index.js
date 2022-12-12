import { useState } from "react";
import Step1 from "../../components/appv3/step1";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Step2 from "../../components/appv3/step2";
import Step3 from "../../components/appv3/step3";
import Step4 from "../../components/appv3/step4";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion } from "framer-motion"

const Appv3 = () => {
  const [index, setIndex] = useState(1);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [bodyPartSymptoms, setBodyPartSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchedSymptoms, setSearchedSymptoms] = useState([]);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const [onOff, setOnOff] = useState(true)

  console.log("SelectedSymptoms", selectedSymptoms)

  const [imag, setImag] = useState([
    {
      src: '/images/app/step 1-01.png',
    },
    {
      src: '/images/app/step 2-01-01.png',
    },
    {
      src: '/images/app/step 3-01.png',
    },
    {
      src: '/images/app/step 4-01.png',
    },
  ]);

  const hanldeSelectSymptoms = (e, symptom) => {
    if (e.target.checked) {
      setSelectedSymptoms((prev) => [...prev, symptom]);
    } else {
      setSelectedSymptoms(
        selectedSymptoms.filter((part) => part.name !== symptom.name)
      );
    }
  }; 

  return (
    <>
      <>
        <motion.div initial={{opacity: 0}} transition={{delay: 0}} animate={{opacity: 1}} exit={{opacity:0}} className="flex justify-center font-bold border-cyan-500 border-solid bg-[#86E6FB] h-12">
          <div className="flex flex-1 justify-around items-center">
            <p className="m-0">SEARCH BY BODY PARTS</p>
            <p className="m-0">SEARCH BY BODY FUNCTIONS</p>
            <p className="m-0">SEARCH BY SYMPTOMS</p>
          </div>
        </motion.div>
        {index < 3 ? <motion.div initial={{opacity: 0}} transition={{delay: 0}} animate={{opacity: 1}} exit={{opacity:0}} className="bg-[#4EB2C9ED]">
          <div className="bg-[#DAF4FA] px-4 mx-28 h-[calc(110vh-190px)]">
            <div className="grid grid-cols-[1fr_2fr] text-[#DCDCDC] gap-3">
              <div className="flex flex-1 flex-col gap-10 items-center h-[50%] w-full">
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0}} className="w-full flex flex-1 items-center justify-center bg-black">
                  <img className="w-[65%] h-[65%]" src={imag[index]?.src} />
                </motion.div>
                <div className="flex flex-1 justify-center items-center h-1">
                  <p className="text-xl text-zinc-900 font-bold m-0 underline">
                    SELECTED SYMPTOMS
                  </p>
                </div>
                <div className="w-full flex flex-col justify-center gap-10">
                  <div ref={parent} className="h-[calc(112vh-600px)] overflow-y-auto">
                    {selectedSymptoms.map((sym, i) => {
                      return (
                        <div
                          key={i}
                          className="text-black p-1 border-b-2 border-black py-1 border-dotted flex flex-1 justify-between"
                        >
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
              <div>
                <div className="w-full h-full">
                  <div className="flex flex-1 flex-row">
                    <div className="text-black flex flex-1 items-center flex-col py-1.5">
                      <h1 className="text-black font-semibold text-xl m-0">
                        AGE
                      </h1>
                      <input
                        onInput={(e) => {
                          if (e.target.value.length > e.target.maxLength)
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                        }}
                        maxLength={2}
                        className="w-14 h-7 py-3 px-1 bg-black text-white placeholder:px-1 placeholder:text-white text-center flex justify-center items-center"
                        type="number"
                        placeholder="Age"
                      />
                    </div>
                    <div className="text-black flex flex-1 items-center flex-col py-2">
                      <h1 className="text-black font-semibold text-xl m-0">
                        SEX
                      </h1>
                      <div className="flex h-max flex-row">
                        <button className="w-15 h-7 bg-black text-white mx-2 px-4 py-1">
                          MALE
                        </button>
                        <button className="w-15 h-7 bg-black text-white mx-2 px-4 py-1">
                          FEMALE
                        </button>
                      </div>
                    </div>
                  </div>
                  {
                    index === 1 &&
                    <Step1 index={index}
                      setSelectedSymptoms={setSelectedSymptoms}
                      selectedSymptoms={selectedSymptoms} />
                  }
                  {
                    index === 2 &&
                    <Step2 index={index}
                      setSelectedSymptoms={setSelectedSymptoms}
                      selectedSymptoms={selectedSymptoms} />
                  }
                  <div className="flex justify-end items-end flex-col">
                    <button
                      onClick={() => {
                        setIndex(prev => prev + 1)
                        // localStorage.setItem('show', true);
                      }}
                      className=" text-black font-bold bg-[#86E6FB] rounded-md mt-4 py-2 px-4 mr-2 mb-2"
                    >
                      NEXT STEP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
          : <Step4 symptoms={selectedSymptoms} />}
      </>
    </>
  );
}

export default Appv3;