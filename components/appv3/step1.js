import { useState, useEffect } from "react";
import BASE_URL from "../../utils/base-url";
import { motion } from "framer-motion"
import LoaderFunction from '../../components/multiusable/loader';

const Step1 = ({ selectedSymptoms, setSelectedSymptoms, index }) => {

  console.log("00000", selectedSymptoms)
  const [searchText, setSearchText] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [bodyPartSymptoms, setBodyPartSymptoms] = useState([]);
  // const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchedSymptoms, setSearchedSymptoms] = useState([]);
  // const [index, setIndex] = useState(0);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [muiSpinner, setShowMuiSpinner] = useState();
  const [symptomExist, setSymptomExist] = useState(false);

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

  useEffect(() => {
    if (isSearchEmpty) {
      setSearchedSymptoms([]);
    }
  }, [isSearchEmpty]);

  const searchSymptom = async (e) => {
    setLoading(true);
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
        setLoading(false);
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

 const loadSymptoms = () => {

 }

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-[#00000036] h-14 text-base text-black">
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
        <table className="w-full">
          <thead>
            <tr>
              <th className="h-14 bg-[#00000036]">
                <input
                  value={searchText}
                  onChange={(e) => searchSymptom(e)}
                  className="bg-transparent outline-none text-black px-7 w-full placeholder:placeholder-black "
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
              {/* // <div>
              //   <LoaderFunction height="100" width="100" />
              // </div> */}
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0}} className="m-1 border-b-2 border-black py-1 border-dotted flex-1 justify-between flex">
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
                    </motion.div>
                  </tr>
                );
              })}
            </tbody>
          ) : ( 
            <tbody className="block h-[calc(100vh-350px)] overflow-y-auto">
             {loading ? <div className="h-full w-full flex justify-center items-center"><LoaderFunction /></div> :
              <>
              {searchedSymptoms.map((part, i) => {
                return (
                  <tr key={i} className="flex flex-col px-2">
                    <div className="m-1 border-b-2 border-black py-1 border-dotted flex-1 justify-between flex">
                    
                    <span className="text-black overflow-auto h-full">
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
              </>
            }
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default Step1;