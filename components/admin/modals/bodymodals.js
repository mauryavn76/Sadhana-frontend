import React, { useEffect, useState } from "react";
import BodyPart from "../../../pages/admin/body_part";
import Button from "../../multiusable/button";
// import Button from 'react-bootstrap/Button';
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import BASE_URL from "../../../utils/base-url";
import DeleteModal from "./delete-modal";
import TextInput from "../../multiusable/text-input";
import Textarea from "../../multiusable/text-area";
import TransparantButton from "../../multiusable/transparent-button";
import LoaderFunction from "../../multiusable/loader";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const BodyModal = (props) => {
  // const [bodyModal, setBodyModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [muiSpinner, setShowMuiSpinner] = useState("");
  const [updateDisease, setUpdateDisease] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [updateType, setUpdateType] = useState();

  const [error, setError] = useState("");

  const options = [
    { id: 1, name: "Neurology" },
    { id: 2, name: "BodyPart" },
    { id: 3, name: "Organ" },
  ];

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedtype, setSelectedType] = useState("");

  const handleChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedTypes((prev) => [...prev, event.target.value]);
    setSelectedType("");
  };

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const { bodyPart, ...rest } = props;
  console.log(bodyPart);
  useEffect(() => {
    setUpdateDisease(bodyPart ? bodyPart.name : "");
    setUpdateDescription(bodyPart ? bodyPart.description : "");
    setUpdateType(bodyPart ? bodyPart.type : "");
  }, [bodyPart]);

  const addbodypartsAdd = async () => {
    if (name.length === 0) {
      return;
    } else {
      setShowMuiSpinner(true);
      // setSpinner(true);
      const bodypartsAdd = { name, description, type };
      const res = await BASE_URL.post("/bodyparts", bodypartsAdd);
      // props.setBodyPart(false);
      setError("Please enter BodyPart Name");
      console.log(res);
      props.onHide();
      refreshData();
      setShowMuiSpinner(false);
      // setSpinner(false);
    }
  };

  const updateBodypart = async () => {
    // setSpinner(true);
    setShowMuiSpinner(true);
    const bodypartsAdd = {
      name: updateDisease,
      description: updateDescription,
      type: updateType,
    };
    const res = await BASE_URL.put("/bodyparts/" + bodyPart._id, bodypartsAdd);
    // props.setBodyPart(false);
    console.log(res);
    props.onHide();
    refreshData();
    setShowMuiSpinner(false);
    setUpdateDisease("");
    // setSpinner(false);
  };

  const deleteBodypart = async () => {
    // setSpinner(true);
    setShowMuiSpinner(true);
    const res = await BASE_URL.delete("/bodyparts/" + bodyPart._id);
    // props.setBodyPart(false);
    props.onHide();
    console.log(res);
    refreshData();
    setShowMuiSpinner(false);
    // setSpinner(false);
    // props.setDisease('');
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
          <h1 className="font-semibold text-2xl text-center">Add Body Part</h1>
          <p className="text-[#E50000] text-sm m-0">{error}</p>
          <div className="mt-2">
            <label className=" m-1 font-semibold">Name</label>
            {/* <input
              className="border-2 w-full p-1 rounded-md border-gray-500 h-10"
              value={props.bodyPart ? updateName : name}
              onChange={e => {
                props.bodyPart
                  ? setUpdateName(e.target.value)
                  : setName(e.target.value);
              }}
              type="text"
              placeholder="Enter...."
            /> */}
            <TextInput
              value={bodyPart ? updateDisease : name}
              onChange={bodyPart ? setUpdateDisease : setName}
            />
            <label className=" m-1 font-semibold">Description</label>
            {/* <textarea
              className=" p-1 border-2 rounded-md w-full border-gray-500 h-20"
              type="text"
              placeholder="Enter...."
            ></textarea> */}
            <Textarea
              value={bodyPart ? updateDescription : description}
              onChange={bodyPart ? setUpdateDescription : setDescription}
            />
            <label className=" m-1 font-semibold">Type</label>
            {/* <input
              className="p-1 rounded-md border-2 w-full border-gray-500 h-10"
              type="text"
              placeholder="En
              ter...."
            /> */}
            {/* <TextInput
              value={bodyPart ? updateType : type}
              onChange={bodyPart ? setUpdateType : setType}
            /> */}
            <Box sx={{ m: 1, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  // size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedtype}
                  label="Type"
                  onChange={handleChange}
                >
                  {options.map((option, i) => {
                    return (
                      <MenuItem key={i} value={option}>
                        {option.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <div className="flex">
              {selectedTypes.map((type, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      let newArr = [...selectedTypes];
                      newArr.splice(i, 1);
                      setSelectedTypes(newArr);
                    }}
                    className="bg-blue-300 px-4 justify-between py-2 mx-1 rounded-full"
                  >
                    {type.name}
                    <CloseOutlinedIcon />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="float-right h-24 flex justify-between flex-col mt-5">
            <Button
              color="bg-[#8FECFF]"
              label={bodyPart ? "Update" : "Add"}
              onTap={bodyPart ? updateBodypart : addbodypartsAdd}
            />
            {bodyPart && (
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
          deleteBodyPart={deleteBodypart}
          setIsDelete={setIsDelete}
          muiSpinner={muiSpinner}
          // spinner={spinner}
          show={isDelete}
          onHide={() => setIsDelete(false)}
          backdrop="static"
          keyboard={false}
        />
      </Modal.Body>
    </Modal>
  );
};

export default BodyModal;

// {
/* <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-30">
<div className="relative w-1/3 mx-auto mt-[15%] bg-white h-96">
  <i
    onClick={() => props.setShowBodyModal(false)}
    className="absolute right-5 top-3 fa-solid fa-xmark"
  ></i>
  <div className="px-14 py-4">
    <h1 className="font-bold text-2xl text-center">
      Add Body Part
    </h1>
    <div className="mt-2">
      <label className="ml-3 font-bold">Name</label>
      <input
        className="border-2 w-full border-black h-10"
        value={BodyPart ? updateName : name}
        onChange={(e) => {
          props.bodyPart
            ? setUpdateName(e.target.value)
            : setName(e.target.value);
        }}
        type="text"
        placeholder="Enter...."
      />
      <label className="ml-3 font-bold">Description</label>
      <textarea
        className="border-2 w-full border-black h-20"
        type="text"
        placeholder="Enter...."
      ></textarea>
      <label className="ml-3 font-bold">Type</label>
      <input
        className="border-2 w-full border-black h-10"
        type="text"
        placeholder="Enter...."
      />
    </div>

    <div className="float-right mt-5">
      <Button
        color="bg-[#FFCF2E]"
        label={props.bodyPart ? 'Update bodyPart' : 'Add bodyPart'}
        onTap={props.bodyPart ? updateBodypart : addbodypartsAdd}
      />
    </div>
  </div>
</div>
</div> */
// }
