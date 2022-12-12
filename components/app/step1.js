import axios from 'axios';
import { useEffect, useState } from 'react';
import BASE_URL from '../../utils/base-url';

const Step1 = ({ selectedBodyParts, setSelectedBodyParts }) => {
  const [bodyParts, setBodyParts] = useState([]);
  // const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [searchBodyPartname, setSearchBodyPartName] = useState('');
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('access-token'));
    }
  }, []);

  const handleSearchBodyPart = async e => {
    setSearchBodyPartName(e.target.value);
    e.target.value.length === 0
      ? setIsSearchEmpty(true)
      : setIsSearchEmpty(false);
    if (e.target.value.length >= 3) {
      try {
        const res = await axios.get(
          'https://sadhna-backend.herokuapp.com/search-value?search_type=bodypart&search=' +
            e.target.value,
          {
            headers: {
              authorization: 'Bearer ' + token,
            },
          }
        );
        setBodyParts(res.data.data);
      } catch (err) {
        console.log(err);
      }
      // console.log(res);
    } else {
      setBodyParts([]);
    }
  };

  useEffect(() => {
    const getBodyParts = async () => {
      const bodypartResult = await BASE_URL.get('/bodyparts');
      console.log(bodypartResult);
      setBodyParts(bodypartResult.data.data);
    };
    getBodyParts();
  }, [isSearchEmpty]);

  const removeSelectedBodyPart = name => {
    // let newArr = [...selectedBodyParts];
    // newArr.splice(index, 1);
    // setSelectedBodyParts(newArr);
    setSelectedBodyParts(
      selectedBodyParts.filter(bodyPart => bodyPart.name != name)
    );
  };

  console.log('selectedBodyParts', selectedBodyParts);

  return (
    <div className="bg-[#F0F0F0] py-2 border-white">
      <div className="flex h-10 w-full  items-center  bg-[#F0F0F0]">
        <input
          onChange={e => handleSearchBodyPart(e)}
          type="text"
          className="w-[90%] h-10 bg-transparent border-1 p-2 rounded-md"
          placeholder="Search body part..."
        />
        <i className="fa-solid fa-magnifying-glass w-[10%] text-xl text-[#919191]"></i>
      </div>
      <div className="h-[calc(100vh-360px)] overflow-auto">
        {bodyParts.map((part, index) => {
          return (
            <p key={index} className="bg-white p-2 my-2">
              {part.name}
              <input
                onChange={e => {
                  const isChcecked = e.target.checked;
                  isChcecked
                    ? setSelectedBodyParts([
                        ...selectedBodyParts,
                        { id: part._id, name: part.name },
                      ])
                    : removeSelectedBodyPart(part.name);
                }}
                type="checkbox"
                className="float-right cursor-pointer h-6 w-6"
              />
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default Step1;

// <div className="h-[70%] mb-2 bg-[#F0F0F0] rounded-2xl">
// {/* <div className=" flex h-[20%] flex-1 items-center flex-col bg-white">
//   {/* <i class="fa-solid fa-magnifying-glass"> </i> */}
//   <input
//     onChange={e => handleSearchBodyPart(e)}
//     type="text"
//     className="w-96 h-10 border-1 p-2 rounded-md bg-gray-200"
//     placeholder="Search body part..."
//   />
// </div> */}
// <div className="flex h-[80%] justify-center ">
//   <div className="rounded-md h- overflow-auto font-semibold bg-gray-200 w-96">
// {bodyParts.map((part, index) => {
//   return (
//     <p key={index} className="bg-white p-2 my-2">
//       {part.name}
//       <input
//         onChange={e => {
//           const isChcecked = e.target.checked;
//           isChcecked
//             ? setSelectedBodyParts([
//                 ...selectedBodyParts,
//                 { id: part._id, name: part.name },
//               ])
//             : removeSelectedBodyPart(index);
//         }}
//         type="checkbox"
//         className="float-right cursor-pointer h-6 w-6"
//       />
//     </p>
//   );
// })}
//   </div>
// </div>
// </div>
