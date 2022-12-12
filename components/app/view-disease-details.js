import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BASE_URL from '../../utils/base-url';
import { useEffect } from 'react';
import { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import Config from '../../Config';

const ViewDiseaseDetails = (props) => {
  const [details, setDetails] = useState({});
  const getDetails = async () => {
    const res = await BASE_URL.get('disease-details?d_id=' + props?.disease_id);
    setDetails(res.data.data);
  };

  useEffect(() => {
    console.log('xfbvdsgvbsdg');
    getDetails();
  }, [props.disease_id]);

  console.log(details);
  // const body = draftToHtml(details?.data[0]?.tab_content);
  const [index, setIndex] = useState(0);

  const tabDetails = details?.data?.reduce((arr, curr) => {
    arr.push({
      id: curr.tab_id,
      name: curr.name,
      content: draftToHtml(curr.tab_content),
    });
    return arr;
  }, []);
  console.log('details', tabDetails);
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Modal
      // fadeClassname="modal fade"
      contentClassName="my-result-modal"
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <img
          style={{ height: '300px', width: '100%' }}
          src={Config.imageUrl + '/' + details?.image}
        />
        <div className="flex w-full h-10  items-center space-x-16  ">
          <div className="text-cyan-600 font-bold text-lg text-start">
            {details?.title}
          </div>
          <div className="space-x-12 ">
            {tabDetails &&
              tabDetails?.map((d, i) => {
                return (
                  <button
                    className={selectedTab === i && 'text-black font-bold'}
                    key={d?.name}
                    onClick={() => {
                      setSelectedTab(i);
                    }}
                  >
                    {d.name}
                  </button>
                );
              })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewDiseaseDetails;
