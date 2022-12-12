import { useEffect, useState } from 'react';
import BASE_URL from '../../utils/base-url';
import ViewDiseaseDetails from './view-disease-details';

const AppResult = ({ symptoms }) => {
  const [result, setResult] = useState([]);
  const [viewResultModal, setViewResultModal] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState({});

  console.log(symptoms);

  const getResult = async () => {
    let s_ids = [];
    symptoms.map((sym) => {
      s_ids.push(sym._id);
    });
    const res = await BASE_URL.post('/symptom-disease-check', { s_ids: s_ids });
    setResult(res.data.data);
  };

  console.log('result---------------------------------', selectedDisease);

  useEffect(() => {
    getResult();
  }, []);

  return (
    <div className="h-full pt-2 pb-2 overflow-auto">
      <div onClick={() => setViewResultModal(true)}></div>

      <div className="flex justify-center items-center flex-col">
        {result.map((x, id) => {
          return (
            <>
              <div
                className="grid items-center grid-cols-3 text-lg font-semibold font-sans mx-4 m-2"
                key={id}
              >
                <div className="text-base col-span-2">
                  <span>{x.name} - </span>
                  <span>{x.probability}</span>
                </div>
                <button
                  className="bg-blue-500 col-span-1 hover:bg-blue-700 text-white -pointer p-2 w-28 h-10 text-sm rounded-md flex justify-start items-center"
                  onClick={() => {
                    setSelectedDisease(x);
                    setViewResultModal(true);
                  }}
                >
                  View Disease
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div>
        <ViewDiseaseDetails
          disease_id={selectedDisease._id}
          show={viewResultModal}
          onHide={() => setViewResultModal(false)}
        />
      </div>
    </div>
  );
};
export default AppResult;
