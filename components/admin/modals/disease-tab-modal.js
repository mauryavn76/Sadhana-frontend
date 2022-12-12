import React, { useEffect, useState } from 'react';
import Button from '../../multiusable/button';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loader-spinner';
import DeleteModal from './delete-modal';
import BASE_URL from '../../../utils/base-url';
import Modal from 'react-bootstrap/Modal';
import TextInput from '../../multiusable/text-input';
import Textarea from '../../multiusable/text-area';
import TransparantButton from '../../multiusable/transparent-button';
import LoaderFunction from '../../multiusable/loader';

const DiseaseTabModal = (props) => {
  // const DiseaseTabModal = ({ setTab, setTabModal, tab }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [updatedName, setUpdatedName] = useState();
  const [updatedDescription, setUpdatedDescription] = useState();
  const [muiSpinner, setShowMuiSpinner] = useState('');
  const { tab, ...rest } = props;

  console.log('=======', tab);
  // useEffect(() => {
  //   setName(tab ? tab.name : '');
  //   setDescription(tab ? tab.description: '');
  // },[tab]);

  useEffect(() => {
    setUpdatedName(tab?.name);
    setUpdatedDescription(tab?.description);
  }, [tab]);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const addTab = async () => {
    // setSpinner(true);
    setShowMuiSpinner(true);
    const tab = { name, description };
    const res = await BASE_URL.post('/disease-tab', tab);
    props.onHide(false);
    console.log(res);
    props.setTab('');
    // setTab('');
    refreshData();
    setShowMuiSpinner(false);
    // setSpinner(false);
  };

  const updateTab = async () => {
    setShowMuiSpinner(true);
    // setSpinner(true);
    const updateTab = {
      name: updatedName,
      description: updatedDescription,
    };
    const res = await BASE_URL.put('/disease-tab/' + tab._id, updateTab);
    props.onHide();
    props.setTab('');
    console.log(res);
    refreshData();
    setShowMuiSpinner(false);
    // setSpinner(false);
    // setTab('');
  };

  const deleteTab = async () => {
    // setSpinner(true);
    setShowMuiSpinner(true);
    const res = await BASE_URL.delete('/disease-tab/' + tab._id);
    props.onHide(false);
    console.log(res);
    props.setTab('');
    refreshData();
    setShowMuiSpinner(false);
    // setSpinner(false);
    // setTab('');
  };

  return (
    <>
      <Modal
        {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Modal.Header closeButton />
          <div className="px-14 py-4">
            <h1 className="font-bold text-2xl text-center">
              {tab ? 'Update Tab' : 'Add Tab'}
            </h1>
            <div className="mt-8">
              <label className="font-semibold">Name</label>
              {/* <input
                className="border-2 w-full rounded-md border-gray-700 h-10"
                type="text"
                value={tab ? updatedName : name}
                onChange={e => {
                  tab
                    ? setUpdatedName(e.target.value)
                    : setName(e.target.value);
                }}
                placeholder="Enter...."
              /> */}
              <TextInput
                value={tab ? updatedName : name}
                onChange={tab ? setUpdatedName : setName}
              />
              <label className="font-semibold">Description</label>
              {/* <textarea
                className="border-2 w-full rounded-md border-gray-700 h-20"
                type="text"
                value={tab ? updatedDescription : description}
                onChange={e => {
                  tab
                    ? setUpdatedDescription(e.target.value)
                    : setDescription(e.target.value);
                }}
                placeholder="Enter...."
              ></textarea> */}
              <Textarea
                value={tab ? updatedDescription : description}
                onChange={(e) => {
                  tab ? setUpdatedDescription : setDescription;
                }}
              />
            </div>
            <div className="float-right h-24 flex justify-between flex-col mt-5">
              <Button
                label={tab ? 'Update' : 'Add'}
                onTap={tab ? updateTab : addTab}
                color="bg-[#8FECFF]"
              />
              {tab && (
                <TransparantButton
                  label="Delete"
                  onTap={() => {
                    setIsDelete(true);
                  }}
                  color="text-[#FF3535]"
                  border="border-[#FF3535]"
                />
              )}
            </div>
            {muiSpinner && (
              <div className="fixed flex justify-center items-center left-0 bg-black opacity-70 top-0 w-full h-full">
                <LoaderFunction height="100" width="100" />
              </div>
            )}
          </div>
          <DeleteModal
            deleteSymptom={deleteTab}
            setIsDelete={setIsDelete}
            show={isDelete}
            onHide={() => setIsDelete(false)}
            muiSpinner={muiSpinner}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DiseaseTabModal;
