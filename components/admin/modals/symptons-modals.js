import React, { useState } from 'react';
import Button from '../../multiusable/button';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loader-spinner';
import DeleteModal from './delete-modal';
import BASE_URL from '../../../utils/base-url';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import TextInput from '../../multiusable/text-input';
import Textarea from '../../multiusable/text-area';
import TransparantButton from '../../multiusable/transparent-button';
import LoaderFunction from '../../multiusable/loader';
// import ErrorModal from './errormodal';

const SymptomModal = (props) => {
  // const SymptomModal = ({ setSymptom, setSymptomModal, symptom }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [spinner, setSpinner] = useState(false);
  // const [errorMod, setErrorModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [muiSpinner, setShowMuiSpinner] = useState('');
  const { setSymptomModal, symptom, setSymptom, ...rest } = props;
  const [updatedSymptom, setUpdatedSymptom] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [updateType, setUpdateType] = useState();
  const [error, setError] = useState('');

  console.log(symptom);
  console.log(rest);

  useEffect(() => {
    setUpdatedSymptom(symptom ? symptom.name : '');
    setUpdateDescription(symptom ? symptom.description : '');
    setUpdateType(symptom ? symptom.type : '');
  }, [symptom]);

  // const err = () => {
  //   <ErrorModal/>
  // }

  // const error = () => {
  //   if (symptom.name) {
  //    return ('')
  //   } else {
  //     return {err}
  //   }
  // }

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  console.log(updatedSymptom);

  const addSymptom = async () => {
    if (name.length === 0) {
      setError('Please enter Symptom Name');
      return;
    } else {
      setShowMuiSpinner(true);
      // setSpinner(true);
      const symptomAdd = { name, description, type };
      try {
        const res = await BASE_URL.post('/symptom', symptomAdd);
        props.onHide();
        setName('');
        setError('');

        // props.setSymptom('');
        // setSymptom('');
        console.log(res);
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
        refreshData();
      }
      setShowMuiSpinner(false);
    }
  };

  const updateSymptom = async () => {
    // setSpinner(true);
    setShowMuiSpinner(true);
    const toUpdateSymptom = {
      name: updatedSymptom,
      description: updateDescription,
      type: updateType,
    };
    const res = await BASE_URL.put(
      '/symptom/' + props.symptom._id,
      toUpdateSymptom
    );
    setSymptomModal(false);
    console.log(res);
    refreshData();
    // setSpinner(false);
    setShowMuiSpinner(false);
    props.onHide();
    setUpdatedSymptom('');
    setSymptom('');
  };

  const deleteSymptom = async () => {
    // setSpinner(true);
    setShowMuiSpinner(true);
    const res = await BASE_URL.delete('/symptom/' + props.symptom._id);
    setSymptomModal(false);
    console.log(res);
    props.onHide();
    refreshData();
    setShowMuiSpinner(false);
    // setSpinner(false);
    // onHide();
    setSymptom('');
  };

  return (
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
            {symptom ? 'Update Symptom' : 'Add Symptom'}
          </h1>
          <div className="mt-8">
            <label className="font-semibold">Name</label>
            <TextInput
              value={symptom ? updatedSymptom : name}
              onChange={symptom ? setUpdatedSymptom : setName}
            />
            <p className="text-red-500 m-0">{error}</p>
            <label className="font-semibold">Description</label>
            <Textarea
              value={symptom ? updateDescription : description}
              onChange={symptom ? setUpdateDescription : setDescription}
            />
            <label className="font-semibold">Type</label>
            <TextInput
              value={symptom ? updateType : type}
              onChange={symptom ? setUpdateType : setType}
            />
          </div>

          <div className="float-right h-24 flex justify-between flex-col mt-5">
            <Button
              label={symptom ? 'Update' : 'Add'}
              onTap={symptom ? updateSymptom : addSymptom}
              color="bg-[#8FECFF]"
            />
            {symptom && (
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
        </div>
        {muiSpinner && (
          <div className="fixed flex justify-center items-center left-0 bg-black opacity-70 top-0 w-full h-full">
            <LoaderFunction height="100" width="100" />
          </div>
        )}
        <DeleteModal
          deleteSymptom={deleteSymptom}
          setIsDelete={setIsDelete}
          muiSpinner={muiSpinner}
          show={isDelete}
          onHide={() => setIsDelete(false)}
          backdrop="static"
          keyboard={false}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SymptomModal;
