import { useState } from 'react';
import { useEffect } from 'react';
import BASE_URL from '../../utils/base-url';

const ReConfirm = ({
  selectedSymptoms,
  selectedBodyParts,
  selectSymptom,
  exists,
}) => {
  console.log(selectedBodyParts, selectedSymptoms);

  const [reconfirmSymptoms, setReconfirmSymptoms] = useState([]);
  const getReconfirmSymptoms = async () => {
    const bodyPartIds = selectedBodyParts.map((part) => part._id);
    const symptomIds = selectedSymptoms.map((sym) => sym._id);

    const details = {
      s_ids: symptomIds,
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
      <div className="grid grid-cols-3 grid-flow-row mx-auto overflow-y-auto h-[calc(100vh-250px)] gap-3 p-4">
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
      </div>
    </>
  );
};

export default ReConfirm;
