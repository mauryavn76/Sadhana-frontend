import { useEffect, useRef } from 'react';
import { useState } from 'react';
import SearchSymptoms from '../../components/app/search-symptoms';
import StepButtons from '../../components/app/step-buttons';
import Banner from '../../components/multiusable/banner';
import BASE_URL from '../../utils/base-url';
import Link from 'next/link';
import AppResult from '../../components/app/app-result';

const App = () => {
  const [selected, setSelected] = useState('BodyPart');
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [bodyPartSymptoms, setBodyPartSymptoms] = useState([]);
  const [categorySymptoms, setCategorySymptoms] = useState([]);
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

  const handleSelectCategory = (category) => {
    const exists = selectedCategory.some((part) => part.name === category.name);
    if (exists) {
      setSelectedCategory(
        selectedCategory.filter((part) => part.name !== category.name)
      );
    } else {
      setSelectedCategory((prev) => [...prev, category]);
    }
  };

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
  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <>
      {/* <Banner image="/images/home-images/home.jpg" /> */}
      <div className="bg-red-200 h-[calc(100vh-80px)] flex justify-center items-center">
        <p onClick={executeScroll}>Go to App</p>
      </div>
      <div ref={myRef} className="h-[calc(100vh-50px)] flex flex-col">
        <div className="flex h-28 justify-center">
          <StepButtons
            onTap={setSelected}
            selected={selected}
            title="BodyPart"
          />
          <StepButtons
            onTap={setSelected}
            selected={selected}
            title="Categories"
          />
          <StepButtons
            onTap={setSelected}
            selected={selected}
            title="symptoms"
          />
          <StepButtons onTap={setSelected} selected={selected} title="Result" />
        </div>
        <div className="flex h-[calc(100vh-162px)] border-y-2 border-gray-200">
          <div className="w-[20%] h-full  bg-white ">
            <div className="h-12 flex justify-center text-white items-center bg-black cursor-pointer">
              {selected}
            </div>
            <div className="w-full h-[calc(100vh-250px)] overflow-y-scroll">
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
          <div className="w-[60%] h-full border-x-2 border-gray-200   bg-white ">
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
                            <div className="flex h-max bg-blue-200 p-2 items-center justify-center cursor-pointer rounded-xl">
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
                  <div className="grid grid-cols-3 grid-flow-row mx-auto overflow-y-auto h-[calc(100vh-250px)] gap-3 p-4">
                    {categorySymptoms.map((symptom, i) => {
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
                            <div className="flex h-max bg-blue-200 p-2 items-center justify-center cursor-pointer rounded-xl">
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
            {selected === 'symptoms' && (
              // <p>Please search for a symptom to view Symptoms </p>
              <SearchSymptoms
                symptoms={searchSymptom}
                setSymptoms={setSearchSymptom}
                selectSymptom={handleSelectSymptom}
                exists={handleSymptomExists}
              />
            )}
            {selected === 'Result' && (
              // <p>Please search for a symptom to view Symptoms </p>
              <AppResult symptoms={selectedSymptoms} />
            )}
          </div>
          <div className="w-[20%] h-full  bg-white">
            <div className="h-12 flex justify-center text-white items-center bg-black">
              Selected Symptoms
            </div>
            <div>
              {selectedSymptoms.map((bodyPart, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handleSelectBodyParts(bodyPart)}
                    className="h-12 border-y-[0.8px] border-gray-200 w-full flex justify-center items-center bg-white cursor-pointer"
                  >
                    {bodyPart.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
