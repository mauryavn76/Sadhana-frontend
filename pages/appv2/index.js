import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import BASE_URL from '../../utils/base-url';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchIcon from '@mui/icons-material/Search';
import HorizontalLabelPositionBelowStepper from '../app/stepper,';
import { color } from '@mui/system';
import Step2 from './step2';
import Step3 from './step3';
import BasicAlerts from '../../components/admin/modals/toast-modal';

const AppV2 = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [bodyPartSymptoms, setBodyPartSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchedSymptoms, setSearchedSymptoms] = useState([]);
  const [index, setIndex] = useState(0);
  const [age, setAge] = useState('');
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();
  // const [showButton, setShowButton] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setShow(localStorage.getItem('show') || false);
  //   }
  // }, []);

  const [searchText, setSearchText] = useState('');

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
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  useEffect(() => {
    if (isSearchEmpty) {
      setSearchedSymptoms([]);
    }
  }, [isSearchEmpty]);

  const searchSymptom = async (e) => {
    setSearchText(e.target.value);
    console.log('val', e.target.value);
    e.target.value.length === 0
      ? setIsSearchEmpty(true)
      : setIsSearchEmpty(false);
    if (e.target.value.length >= 3) {
      try {
        const res = await BASE_URL.get(
          '/search-value?search_type=symptom&search=' + e.target.value
        );
        console.log(res);
        setSearchedSymptoms(res.data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchedSymptoms([]);
    }
  };

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
      {!show ? (
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
              <div className="grid grid-cols-3 h-[calc(100vh-170px)] text-[#DCDCDC] gap-3">
                <div className="flex flex-1 flex-col gap-10 items-center h-[50%] w-full">
                  <div className="w-full flex flex-1 items-center justify-center bg-black">
                    <img className="w-[75%] h-[75%]" src={imag[index]?.src} />
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
                <div className="w-full h-full">
                  <div className="text-black flex flex-1 justify-center items-center flex-col py-1.5">
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
                  <table className="w-full h-[50%] border-white border-solid">
                    <thead>
                      <tr>
                        <th className="bg-[#00000036] px-7 py-3 text-black">
                          BROWSE BY BODYPART/FUNCTION
                        </th>
                      </tr>
                    </thead>
                    <tbody className="block h-[calc(100vh-350px)] overflow-y-auto">
                      {bodyParts.map((part, i) => {
                        return (
                          <tr key={i} className="flex flex-col px-2">
                            <div className="flex gap-2 justify-between text-black border-b-2 border-black py-1 border-dotted">
                              <span className="text-lg">{part.name}</span>
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
                <div className="w-full h-full">
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
                  <table className="w-full h-[50%] border-white border-solid">
                    <thead>
                      <tr>
                        <th className="bg-[#00000036] p-0">
                          <input
                            value={searchText}
                            onChange={(e) => searchSymptom(e)}
                            className="bg-[#00000036] text-black px-7 py-3 w-full placeholder:placeholder-black "
                            type="text"
                            placeholder="TYPE/SEARCH SYMPTOMS HERE"
                          />
                        </th>
                      </tr>
                    </thead>
                    {searchText.length == 0 ? (
                      <tbody className="block h-[calc(100vh-350px)] overflow-y-auto">
                        {bodyPartSymptoms.map((part, i) => {
                          return (
                            <tr key={i} className="flex flex-col px-2">
                              <div className="m-1 border-b-2 border-black py-1 border-dotted flex-1 justify-between flex">
                                <span className="text-black overflow-auto h-full ">
                                  {part.name}
                                </span>
                                <input
                                  className="pl-1 cursor-pointer"
                                  type="checkbox"
                                  checked={handleSymptomExists(part)}
                                  onChange={(e) =>
                                    hanldeSelectSymptoms(e, part)
                                  }
                                />
                              </div>
                            </tr>
                          );
                        })}
                      </tbody>
                    ) : (
                      <tbody className="block h-[calc(100vh-350px)] overflow-y-auto">
                        {searchedSymptoms.map((part, i) => {
                          return (
                            <tr key={i} className="flex flex-col px-2">
                              <div className="m-1 border-b-2 border-black py-1 border-dotted flex-1 justify-between flex">
                                <span className="text-black overflow-auto h-full ">
                                  {part.name}
                                </span>
                                <input
                                  className="pl-1 cursor-pointer"
                                  type="checkbox"
                                  checked={handleSymptomExists(part)}
                                  onChange={(e) =>
                                    hanldeSelectSymptoms(e, part)
                                  }
                                />
                              </div>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
              <div className="flex justify-end items-end flex-col">
                <button
                  onClick={() => {
                    setShow(true);
                    localStorage.setItem('show', true);
                  }}
                  className=" text-black font-bold bg-[#86E6FB] rounded-md py-2 px-4 mr-2 mb-2"
                >
                  NEXT STEP
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Step2 />
      )}
    </>
  );
};

export default AppV2;


{/* <>
<div className="flex justify-center font-bold border-cyan-500 border-solid bg-[#86E6FB] h-12">
  <div className="flex flex-1 justify-around items-center"></div>
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
    </div>
    <div className="flex justify-end items-end flex-col">
      <button
        // onClick={setS}
        className=" text-black font-bold bg-[#86E6FB] rounded-md py-2 px-4 mr-2 mb-2"
      >
        NEXT STEP
      </button>
    </div>
  </div>
</div>
</> */}