import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import BASE_URL from "../../utils/base-url";

const SearchSymptoms = ({ symptoms, setSymptoms, selectSymptom, exists }) => {
  const [search, setSearch] = useState([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("access-token"));
    }
  }, []);

  const searchSymptom = async (e) => {
    setSearch(e.target.value);
    e.target.value.length === 0
      ? setIsSearchEmpty(true)
      : setIsSearchEmpty(false);
    if (e.target.value.length >= 3) {
      try {
        const res = await BASE_URL.get(
          "/search-value?search_type=symptom&search=" + e.target.value,
          {
            headers: {
              authorization: "Bearer " + token,
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
  //   console.log('symptoms', symptoms);
  return (
    <div className="w-full h-full">
      <div className="bg-gray-200 py-2 flex items-center justify-between mx-4 mt-2 h-12">
        <input
          onChange={(e) => searchSymptom(e)}
          type="text"
          className="bg-transparent w-[80%] outline-none px-2"
          placeholder="Search your Symptoms..."
        />
        <SearchIcon />
      </div>
      <div className="w-full h-full">
        {/* {selectedBodyParts.length > 0 ? ( */}
        {/* <div className="grid grid-cols-3 grid-  grid-flow-row mx-auto overflow-y-auto h-[calc(100vh-300px)] gap-3 p-4"> */}
        <div className="search-symptoms-grid mx-auto overflow-y-auto h-[calc(100vh-300px)]">
          {searchSymptom.length > 0 &&
            symptoms.map((symptom, i) => {
              return (
                <div key={i} onClick={() => selectSymptom(symptom)}>
                  {exists(symptom) ? (
                    <div className="flex  bg-blue-200 p-2 items-center justify-center cursor-pointer rounded-xl">
                      {symptom.name}
                    </div>
                  ) : (
                    <div className="flex  bg-gray-200 p-2 items-center justify-center cursor-pointer rounded-xl">
                      {symptom.name}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        {/* ) : (<p> Please select Body Part to view Symptoms </p> */}
        {/* )} */}
      </div>
    </div>
  );
};
export default SearchSymptoms;
