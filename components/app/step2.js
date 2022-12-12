import axios from 'axios';
import { useEffect, useState } from 'react';
import BASE_URL from '../../utils/base-url';

const Step2 = ({
  selectedSymptoms,
  setSelectedSymptoms,
  selectedBodyParts,
}) => {
  const [symptoms, setSymptoms] = useState([]);
  const [searchSymptomName, setSearchSymptomName] = useState('');
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  const [token, setToken] = useState('');

  const getSymptomsByBodyParts = async () => {
    let b_ids = [];
    selectedBodyParts.map((bodyPart) => {
      b_ids.push(bodyPart.id);
    });

    try {
      const res = await BASE_URL.post(
        '/symptomsByBodyPart',
        // { b_ids: b_ids },
        {
          // b_ids: ['62dbe8e6382c0ff4ccfd3d98', '62f0c85be7cd558707f77f3e'],
          b_ids: b_ids,
        },
        {
          headers: {
            // authorization: 'Bearer ' + token,
            contentType: 'Application/json',
          },
        }
      );
      console.log('bodyparts', res.data);
      setSymptoms(res.data.data);
    } catch (err) {
      console.log(err);
      console.log('b_idsss', b_ids);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('access-token'));
    }
  }, []);

  useEffect(() => {
    getSymptomsByBodyParts();
  }, [selectedBodyParts, token, isSearchEmpty]);

  const handleSearchSymptom = async (e) => {
    setSearchSymptomName(e.target.value);
    e.target.value.length === 0
      ? setIsSearchEmpty(true)
      : setIsSearchEmpty(false);
    if (e.target.value.length >= 3) {
      try {
        const res = await axios.get(
          'https://sadhna-backend.herokuapp.com/search-value?search_type=symptom&search=' +
            e.target.value,
          {
            headers: {
              authorization: 'Bearer ' + token,
            },
          }
        );
        console.log(res);
        setSymptoms(res.data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSymptoms([]);
    }
  };

  // useEffect(() => {
  //   const getSymptoms = async () => {
  //     const symptomResult = await BASE_URL.get('/symptoms');
  //     console.log(symptomResult);
  //     setSymptoms(symptomResult.data.data);
  //   };
  //   getSymptoms();
  // }, [isSearchEmpty]);

  const removeSelectedSymptoms = (name) => {
    // console.log(index);
    // let newArr = [...selectedSymptoms];
    // newArr.splice(index, 1);
    // setSelectedSymptoms(newArr);
    setSelectedSymptoms(
      selectedSymptoms.filter((symptom) => symptom.name != name)
    );
  };

  // console.log('selectedSymptoms', selectedSymptoms);

  return (
    <div>
      <div className="bg-[#F0F0F0] py-2">
        <div className="flex h-10 w-full  items-center  bg-[#F0F0F0]">
          <input
            onChange={(e) => handleSearchSymptom(e)}
            type="text"
            className="w-[90%] h-10 bg-transparent border-1 p-2 rounded-md"
            placeholder="Search Symptom..."
          />
          <i className="fa-solid fa-magnifying-glass w-[10%] text-xl text-[#919191]"></i>
        </div>
        <div className="h-[calc(100vh-360px)] overflow-auto">
          {symptoms.map((symptom, index) => {
            return (
              <p key={index} className="bg-white p-2 my-2">
                {symptom.name}
                <input
                  onChange={(e) => {
                    const isChcecked = e.target.checked;
                    isChcecked
                      ? setSelectedSymptoms([
                          ...selectedSymptoms,
                          { id: symptom._id, name: symptom.name },
                        ])
                      : removeSelectedSymptoms(symptom.name);
                  }}
                  type="checkbox"
                  className="float-right cursor-pointer h-6 w-6"
                />
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Step2;

{
  /* <>
<div className="h-full bg-[#F0F0F0] rounded-2xl">
  <div className=" flex flex-1 items-center flex-col h-16 bg-white">
    {/* <i class="fa-solid fa-magnifying-glass"> </i> */
}
//     <input
//       // onChange={(e) => handleSearchSymptom(e)}
//       type="text"
//       className="w-96 h-10 border-1 p-2 rounded-md bg-gray-200"
//       placeholder="Search Symptoms..."
//     />
//   </div>
// </div>
// <div className="pr-80  mr-96">
//   <div className="border-2 border-cyan-400 h-36 w-64 rounded-xl bg-slate-100">
//     <span className="font-semibold m-4">Selected Bodyparts:</span>
//     <ul className="text-sm px-3 font-medium">
//       <li>1. Head</li>
//       <li>2. Hand</li>
//       <li>3. Leg</li>
//     </ul>
//   </div>
// </div> */}

{
  /* <div className="flex justify-center ">
    <div className="h-full rounded-md font-semibold bg-gray-200 w-96">
      {symptoms.map((part, index) => {
        return (
          <p key={index} className="bg-white p-2 my-2">
            {part.name}
            <input
              onChange={(e) => {
                const isChcecked = e.target.checked;
                isChcecked
                  ? setSelectedSymptoms([
                      ...selectedSymptoms,
                      { id: part._id, name: part.name },
                    ])
                  : removeSelectedSymptoms(index);
              }}
              type="checkbox"
              className="float-right cursor-pointer h-6 w-6"
            />
          </p>
        );
      })}
    </div>
  </div> */
}
{
  /* </> */
}
