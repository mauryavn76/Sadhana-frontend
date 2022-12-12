import { useEffect, useRef } from 'react';
import { useState } from 'react';
import SearchSymptoms from '../../components/app/search-symptoms';
import StepButtons from '../../components/app/step-buttons';
import Banner from '../../components/multiusable/banner';
import BASE_URL from '../../utils/base-url';
import Link from 'next/link';
import AppResult from '../../components/app/app-result';
import ReConfirm from '../../components/app/reconfirm-symptoms';
import HandleApp from './show-app';
import { AnimatePresence } from 'framer-motion';
import InstructionModal from './instruction-modal';
import { motion } from 'framer-motion';
import HorizontalLabelPositionBelowStepper from './stepper,';
import CloseIcon from '@mui/icons-material/Close';

const App = () => {
  const [selected, setSelected] = useState('BodyPart');
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [bodyPartSymptoms, setBodyPartSymptoms] = useState([]);
  const [categorySymptoms, setCategorySymptoms] = useState([]);
  const [index, setIndex] = useState(0);

  const changeStepIndex = (i) => {
    setIndex(i);
  };

  const [steps, setSteps] = useState([
    {
      name: 'BodyPart',
      // index: 0,
      color: '#AFEEEE',
    },
    // {
    //   name: 'Categories',
    //   index: 1,
    //   color: '#AFEEEE',
    // },
    {
      name: 'Symptoms',
      index: 1,
      color: '#40E0D0',
    },
    {
      name: 'ReConfirm',
      index: 2,
      color: '#48D1CC',
    },
    {
      name: 'Result',
      index: 3,
      color: '#00CED1',
    },
  ]);

  const [buttonColor, setButtonColor] = useState([
    {
      color: '#40E0D0',
    },
    {
      color: '#48D1CC',
    },
    {
      color: '#00CED1',
    },
  ]);

  const [img, setImg] = useState([
    {
      ind: 0,
      src: '/images/app/step 1-01.png',
    },
    {
      ind: 1,
      src: '/images/app/step 2-01-01.png',
    },
    {
      ind: 2,
      src: '/images/app/step 3-01.png',
    },
    {
      ind: 3,
      src: '/images/app/step 4-01.png',
    },
  ]);

  const [text, setText] = useState([
    {
      body: 'Choose your bodypart and further steps with correct details and get your diagnosed report',
    },
    {
      body: "Choose your Symptoms which you've been suffering from",
    },
    {
      body: 'Make sure you have selected all the symptoms if not then you can reconfirm here and then get the Report.',
    },
    {
      body: 'Your Diagnosed Report is Ready!',
    },
  ]);

  const [bodyParts, setBodyParts] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchSymptom, setSearchSymptom] = useState([]);
  //   const [symptoms, setSymptoms] = useState([
  //     ...bodyPartSymptoms,
  //     ...searchSymptom,
  //     ...categorySymptoms,
  //   ]);

  const getBodyParts = async () => {
    if (selected === 'BodyPart') {
      const res = await BASE_URL.get('/bodyparts');
      setBodyParts(res.data.data);
    }
  };

  useEffect(() => {
    // if (selected === 'BodyPart') {
    getBodyParts();
    // }
  }, [selected]);
  const getCategory = async () => {
    if (selected === 'Categories') {
      const res = await BASE_URL.get('/mainBodyparts');
      setCategory(res.data.data);
    }
  };

  useEffect(() => {
    // if (selected === 'Categories') {
    getCategory();
    // }
  }, [selected]);

  //GET SYMPTOM BY CATEGORY
  const getSymptomsByCategory = async () => {
    let categoryPartIds = selectedBodyParts.map((bodyPart) => {
      return bodyPart._id;
    });

    const res = await BASE_URL.post('/symptomsByBodyPart', {
      b_ids: categoryPartIds,
    });
    setCategorySymptoms(res.data.data);
  };

  useEffect(() => {
    if (selected === 'Categories') getSymptomsByCategory();
  }, []);

  //GET SYMPTOM BY BODYPART
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
    setBodyPartSymptoms([]);
    getSymptomsByBodyParts();
  }, [selectedBodyParts]);

  //ADD/REMOVE SELECTED BODYPARTS
  const handleSelectBodyParts = (bodyPart) => {
    const exists = selectedBodyParts.some(
      (part) => part.name === bodyPart.name
    );
    if (exists) {
      setSelectedBodyParts(
        selectedBodyParts.filter((part) => part.name !== bodyPart.name)
      );
    } else {
      setSelectedBodyParts((prev) => [...prev, bodyPart]);
    }
  };

  // const handleSelectCategory = (category) => {
  //   const exists = selectedCategory.some((part) => part.name === category.name);
  //   if (exists) {
  //     setSelectedCategory(
  //       selectedCategory.filter((part) => part.name !== category.name)
  //     );
  //   } else {
  //     setSelectedCategory((prev) => [...prev, category]);
  //   }
  // };

  const handleSelectSymptom = (symptom) => {
    const exists = selectedSymptoms.some((sym) => sym.name === symptom.name);
    if (exists) {
      setSelectedSymptoms(
        selectedSymptoms.filter((sym) => sym.name !== symptom.name)
      );
    } else {
      setSelectedSymptoms((prev) => [...prev, symptom]);
    }
  };

  const handleSymptomExists = (symptom) => {
    return selectedSymptoms.some((sym) => sym._id === symptom._id);
  };

  const handleCategoryExists = (bodyPart) => {
    return selectedCategory.some((part) => part._id === bodyPart._id);
  };

  const handleBodyExists = (bodyPart) => {
    return selectedBodyParts.some((part) => part._id === bodyPart._id);
  };

  console.log('selectedSymptoms', selectedSymptoms);

  const myRef = useRef(null);
  // const executeScroll = () => myRef.current.scrollIntoView();

  console.log(selectedBodyParts);
  const [showApp, setShowApp] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  useEffect(() => {
    setShowApp(localStorage.getItem('showApp') || false);
  }, []);

  useEffect(() => {
    localStorage.setItem('showApp', showApp);
  }, [showApp]);

  return (
    <>
      {/* <Banner image="/images/home-images/home.jpg" /> */}
      {!showApp ? (
        <HandleApp setShowApp={setShowApp} />
      ) : (
        <div id="app-main" className="flex flex-row focus:opacity-100">
          <div id="slider" className="slider">
            <div className="w-[90%]" ref={myRef}>
              <div className="flex h-12 justify-center">
                {steps.map((step, i) => {
                  return (
                    <StepButtons
                      onSelect={setIndex}
                      index={step.index}
                      // ind={step.ind}
                      key={i}
                      onTap={setSelected}
                      selected={selected}
                      title={step.name}
                      color={step.color}
                      // disable={step.index > selectedIndex}
                    />
                  );
                })}
                {/* <StepButtons
              onTap={setSelected}
              selected={selected}
              title="Categories"
            /> */}
                {/* <StepButtons
              onTap={setSelected}
              selected={selected}
              title="Symptoms"
            />
            <StepButtons
              onTap={setSelected}
              selected={selected}
              title="ReConfirm"
            />
            <StepButtons
              onTap={setSelected}
              selected={selected}
              title="Result"
            /> */}
              </div>
              <div className="flex h-[calc(100vh-240px)] border-y-2 border-gray-200">
                <div className="w-[30%] h-full bg-white border-2">
                  <div className="h-12 flex justify-center text-white items-center bg-black">
                    {selected}
                  </div>
                  <div className="w-full h-[calc(100vh-300px)] overflow-y-scroll">
                    {selected === 'BodyPart' && (
                      <div>
                        {bodyParts.map((bodyPart, i) => {
                          return (
                            <div
                              key={i}
                              onClick={() => handleSelectBodyParts(bodyPart)}
                              className="h-12 border-y-[0.8px] border-gray-200 w-full flex justify-center items-center bg-white"
                            >
                              {handleBodyExists(bodyPart) ? (
                                <span className="h-12  w-full flex justify-center items-center bg-blue-200">
                                  {bodyPart.name}
                                </span>
                              ) : (
                                <span className="h-12 w-full flex justify-center items-center">
                                  {bodyPart.name}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {selected === 'Categories' && (
                      <div>
                        {category.map((bodyPart, i) => {
                          return (
                            <div
                              key={i}
                              onClick={() => handleSelectCategory(bodyPart)}
                              className="h-12 border-y-[0.8px] border-gray-200 w-full flex justify-center items-center bg-white"
                            >
                              {handleCategoryExists(bodyPart) ? (
                                <span className="h-12  w-full flex justify-center items-center bg-blue-200">
                                  {bodyPart.name}
                                </span>
                              ) : (
                                <span className="h-12 w-full flex justify-center items-center">
                                  {bodyPart.name}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-[60%] h-full border-x-2 border-gray-200 bg-white">
                  {selected === 'BodyPart' && (
                    <div className="w-full h-full">
                      {selectedBodyParts.length > 0 ? (
                        <div className="grid grid-cols-3 grid-flow-row mx-auto overflow-y-auto h-[calc(100vh-250px)] gap-3 p-4">
                          {bodyPartSymptoms.map((symptom, i) => {
                            return (
                              <div
                                key={i}
                                onClick={() => handleSelectSymptom(symptom)}
                              >
                                {handleSymptomExists(symptom) ? (
                                  <div className="flex h-max bg-blue-200 p-2 items-center justify-center cursor-pointer rounded-xl">
                                    {symptom.name}
                                  </div>
                                ) : (
                                  <div className="flex h-max bg-gray-200 rounded-full items-center justify-center">
                                    {symptom.name}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="w-full h-full flex justify-center items-center">
                          <p> Please select Body Part to view Symptoms </p>
                        </div>
                      )}
                    </div>
                  )}
                  {selected === 'Categories' && (
                    <div className="w-full h-full">
                      {selectedCategory.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3 p-4">
                          {categorySymptoms.map((symptom, i) => {
                            return (
                              <div
                                key={i}
                                onClick={() => handleSelectSymptom(symptom)}
                              >
                                {handleSymptomExists(symptom) ? (
                                  <div className="flex h-8 bg-blue-200 rounded-full items-center justify-center">
                                    {symptom.name}
                                  </div>
                                ) : (
                                  <div className="flex h-8 bg-gray-200 rounded-full items-center justify-center">
                                    {symptom.name}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="w-full h-full flex justify-center items-center">
                          <p> Please select Category to view Symptoms </p>
                        </div>
                      )}
                    </div>

                    //   (
                    //     <p>Please select Category to view Symptoms </p>
                    //   ) : (
                    //     <div></div>
                  )}
                  {selected === 'Symptoms' && (
                    // <p>Please search for a symptom to view Symptoms </p>
                    <SearchSymptoms
                      symptoms={searchSymptom}
                      setSymptoms={setSearchSymptom}
                      selectSymptom={handleSelectSymptom}
                      exists={handleSymptomExists}
                    />
                  )}
                  {selected === 'ReConfirm' && (
                    // <p>Please search for a symptom to view Symptoms </p>
                    <ReConfirm
                      exists={handleSymptomExists}
                      selectedBodyParts={selectedBodyParts}
                      selectedSymptoms={selectedSymptoms}
                      selectSymptom={handleSelectSymptom}
                    />
                  )}
                  {selected === 'Result' && (
                    // <p>Please search for a symptom to view Symptoms </p>
                    <AppResult symptoms={selectedSymptoms} />
                  )}
                </div>
                <div className="w-[30%] overflow-y-auto h-[calc(100vh-243px)] bg-transparent border-2 bg-white">
                  <div className="h-12 flex justify-center text-white items-center bg-black">
                    Selected Symptoms
                  </div>
                  <div>
                    {selectedSymptoms.map((bodyPart, i) => {
                      return (
                        <div
                          key={i}
                          className="h-fit p-3 overflow-y-auto w-full flex justify-center items-center bg-white cursor-pointer"
                        >
                          <span> {bodyPart.name}</span>
                          <CloseIcon
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
            </div>
            <div className="mt-3">
              <HorizontalLabelPositionBelowStepper stepIndex={index} />
            </div>
          </div>
          {/* <div className="flex flex-1 shrink-0 w-[50%] justify-center items-center flex-col">
            <img className="w-1/2" src={img[index]?.src} />
            <p
              id="animate"
              className="text-base font-semibold h-20 w-40 text-teal-600"
            >
              {text[index]?.body}
            </p>
          </div> */}

          <div id="slider2" className="slider2">
            <div className="w-[60%] float-right">
              <img className="m-0" id="imganimation" src={img[index]?.src} />
            </div>
            <div>
              <p
                id="animate"
                className="text-xl font-semibold font text-teal-600"
              >
                {text[index]?.body}
              </p>
            </div>
          </div>
          {/* <AnimatePresence initial={false} exitBeforeEnter={true}>
            <div className="w-[30%] mt-0 flex justify-center items-center">
              {modal ? (
                <InstructionModal setModal={setModal} />
              ) : (
                <button
                  className="w-32 h-16 rounded-md bg-teal-400 text-white text-base"
                  onClick={openModal}
                >
                  How to Use?
                </button>
              )}
            </div>
          </AnimatePresence> */}
        </div>
      )}
    </>
  );
};
export default App;
