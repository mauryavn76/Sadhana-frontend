import React, { useEffect, useState } from "react";
import Button from "../../multiusable/button";
import { useRouter } from "next/router";
import BASE_URL from "../../../utils/base-url";
import DeleteModal from "./delete-modal";
import { ThreeDots } from "react-loader-spinner";
import Modal from "react-bootstrap/Modal";
import TextInput from "../../multiusable/text-input";
import Textarea from "../../multiusable/text-area";
import TransparantButton from "../../multiusable/transparent-button";
import LoaderFunction from "../../multiusable/loader";

const Diseasemodal = (props) => {
  // const Diseasemodal = ({ setDisease, setDiseaseModal, disease }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [muiSpinner, setShowMuiSpinner] = useState();

  const { disease, ...rest } = props;

  console.log("=======", disease);

  const [updateDiseaseName, setUpdateDiseaseName] = useState();
  const [updateDiseaseDescription, setUpdateDiseaseDescription] = useState();
  const [updateDiseaseType, setUpdateDiseaseType] = useState();
  const [error, setError] = useState("");

  // const[isDelete,setIsDelete] = useState(false)

  const router = useRouter();

  useEffect(() => {
    setUpdateDiseaseName(disease?.name);
    setUpdateDiseaseDescription(disease?.description);
    setUpdateDiseaseType(disease?.type);
  }, [disease]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const addDisease = async () => {
    // setSpinner(true);
    if (name.length === 0) {
      setError("Please enter Disease Name");
      return;
    } else {
      setShowMuiSpinner(true);
      const diseaseAdd = { name, description, type };
      try {
        const res = await BASE_URL.post("/disease", diseaseAdd);
        // refreshData();
        console.log("diseaseee", res.data);
        props.setDisease("");
        setShowMuiSpinner(false);
        props.onHide();
      } catch (err) {
        console.log(err);
        refreshData();
        setError(err.response.data.message);
        setShowMuiSpinner(false);
      }
      // props.setDiseaseModal(false);
      // refreshData();
      setShowMuiSpinner(false);
      // setSpinner(false);
    }
  };
  const updateDisease = async () => {
    // setSpinner(true);
    setShowMuiSpinner(true);
    const diseaseAdd = {
      name: updateDiseaseName,
      description: updateDiseaseDescription,
      type: updateDiseaseType,
    };
    try {
      const res = await BASE_URL.put(
        "/disease/" + props.disease._id,
        diseaseAdd
      );
      // props.setDiseaseModal(false);
      props.onHide();
      setShowMuiSpinner(false);
      props.setDisease("");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      // refreshData();
      setShowMuiSpinner(false);
    }
    // props.setDisease('');
  };

  const deleteDisease = async () => {
    // setSpinner(true);
    setShowMuiSpinner(true);
    const res = await BASE_URL.delete("/disease/" + props.disease._id);
    props.onHide();
    // props.onHide();
    props.setDisease("");
    console.log(res);
    refreshData();
    setShowMuiSpinner(false);
    // setSpinner(false);
    props.setDisease("");
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
              {disease ? "Update Disease" : "Add Disease"}
            </h1>
            <div className="mt-3">
              <label className="font-semibold">Name</label>
              {/* <input
                className="border-2 rounded-md w-full border-gray-700 h-10"
                type="text"
                value={disease ? updateDiseaseName : name}
                onChange={e => {
                  props.disease
                    ? setUpdateDiseaseName(e.target.value)
                    : setName(e.target.value);
                }}
                placeholder="Enter...."
              /> */}
              <TextInput
                value={disease ? updateDiseaseName : name}
                onChange={props.disease ? setUpdateDiseaseName : setName}
              />
              <p className="text-red-500">{error}</p>
              <label className="font-semibold">Description</label>
              {/* <textarea
                className="border-2 w-full rounded-md border-gray-700 h-20"
                value={disease ? updateDiseaseDescription : description}
                onChange={e => {
                  props.disease
                    ? setUpdateDiseaseDescription(e.target.value)
                    : setDescription(e.target.value);
                }}
              ></textarea> */}
              <Textarea
                value={disease ? updateDiseaseDescription : description}
                onChange={
                  props.disease ? setUpdateDiseaseDescription : setDescription
                }
              />
              <label className="font-semibold">Type</label>
              {/* <input
                className="border-2 w-full rounded-md border-gray-700 h-10"
                type="text"
                value={disease ? updateDiseaseType : type}
                onChange={e => {
                  disease
                    ? setUpdateDiseaseType(e.target.value)
                    : setType(e.target.value);
                }}
                placeholder="Enter...."
              /> */}
              <TextInput
                value={disease ? updateDiseaseType : type}
                onChange={disease ? setUpdateDiseaseType : setType}
              />
            </div>
            <div className="float-right  h-24 flex justify-between flex-col mt-5">
              <Button
                label={disease ? "Update" : "Add"}
                color="bg-[#8FECFF]"
                onTap={disease ? updateDisease : addDisease}
              />
              {props.disease && (
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
            <DeleteModal
              show={isDelete}
              onHide={() => setIsDelete(false)}
              deleteDisease={deleteDisease}
              setIsDelete={setIsDelete}
              spinner={spinner}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Diseasemodal;
