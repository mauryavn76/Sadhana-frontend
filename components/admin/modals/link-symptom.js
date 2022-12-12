import React, { useEffect, useState } from "react";
import Button from "../../multiusable/button";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import DeleteModal from "./delete-modal";
import BASE_URL from "../../../utils/base-url";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import TextInput from "../../multiusable/text-input";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import LoaderFunction from "../../multiusable/loader";

const LinkSymptomModal = (props) => {
  const [muiSpinner, setShowMuiSpinner] = useState();
  const [SymptomName, setSymptomName] = useState();
  const [bodyPartName, setBodyPartName] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [probability, setProbability] = useState();
  const [searchBodyPart, setSearchBodyPart] = useState([]);
  const [searchSymptom, setSearchSymptom] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState({});
  const [selectedSymptom, setSelectedSymptom] = useState({});
  const [token, setToken] = useState("");
  //   curl --location --request GET 'http://127.0.0.1:9000/count-value' \
  // --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1NjI0NzY1OSwianRpIjoiMGYxMzM3YmQtZTJiMC00MDk1LWE1YWEtYzcxZjZlYmM5YWVmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6IjYyYWY0NmRiYjk2MGZkMTQ0ODRmYWVlYSJ9LCJuYmYiOjE2NTYyNDc2NTksImV4cCI6MTY1NzU0MzY1OX0.pwLFVF9GXE5gBRxyyx1ledzVJC3WlhNGV-dJGopGwi4'

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("access-token"));
    }
  }, []);

  const handleAutoCompleteSymptom = async (e) => {
    console.log(token);
    setSymptomName(e.target.value);
    if (e.target.value.length >= 3) {
      const res = await BASE_URL.get(
        "search-value?search_type=symptom&search=" + e.target.value,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setSearchSymptom(res.data.data);
      console.log(res);
    } else {
      setSearchSymptom([]);
    }
  };
  const handleAutoCompleteBodyPart = async (e) => {
    setBodyPartName(e.target.value);
    if (e.target.value.length >= 3) {
      const res = await BASE_URL.get(
        "/search-value?search_type=bodypart&search=" + e.target.value,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setSearchBodyPart(res.data.data);
      console.log(res);
    } else {
      setSearchBodyPart([]);
    }
  };

  const handleLinking = async () => {
    try {
      setShowMuiSpinner(true);
      const res = await BASE_URL.post("/body-symptom", {
        s_id: selectedSymptom._id,
        b_id: selectedBodyPart._id,
      });
      props.onHide();
      setSelectedSymptom({});
      setSelectedBodyPart({});
      props.getBodyParts();

      console.log(res);
      setShowMuiSpinner(false);
    } catch (err) {
      setSelectedSymptom({});
      setSelectedBodyPart({});
      setShowMuiSpinner(false);
    }
  };

  console.log(searchBodyPart);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Modal.Header closeButton />
        <div className="px-14 py-4">
          <h1 className="font-bold text-2xl text-center">Link Symptom</h1>
          <div className="mt-8">
            <label className="font-semibold">Body Part Name</label>
            <div className="relative">
              <Stack sx={{ width: 332 }}>
                <Autocomplete
                  size="small"
                  id="symptoms"
                  onChange={(e, sym) => setSelectedBodyPart(sym)}
                  getOptionLabel={(searchBodyPart) => `${searchBodyPart.name}`}
                  options={searchBodyPart}
                  onInputChange={(e) => handleAutoCompleteBodyPart(e)}
                  noOptionsText={
                    handleAutoCompleteBodyPart ? "" : "Body Part Not Available"
                  }
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={params.name}
                      label="Search for Body Parts"
                    />
                  )}
                />
              </Stack>
              {/* <input
                className="border-black  w-full border-[0.8px]  h-8 outline-none pl-2 text-sm"
                type="text"
                value={bodyPartName}
                onChange={(e) => handleAutoCompleteBodyPart(e)}
                placeholder=" search...."
              /> */}
              {/* {searchBodyPart.length > 0 && (
                <div className="absolute overflow-auto h-20 z-10 bg-white w-full border-[0.8px] border-black">
                  {searchBodyPart.length > 0 &&
                    searchBodyPart.map((part, i) => {
                      return (
                        // <div key={i}>
                        <p
                          key={i}
                          onClick={() => {
                            setSelectedBodyPart(part);
                            setBodyPartName(part.name);
                            setSearchBodyPart([]);
                          }}
                          className="m-0 pl-2 hover:bg-[#edecec]"
                        >
                          {part.name}
                        </p>
                        // </div>
                      );
                    })}
                </div>
              )} */}
            </div>
            <label className="font-semibold">Symptom Name</label>
            <div className="relative">
              <Stack sx={{ width: 332 }}>
                <Autocomplete
                  size="small"
                  id="symptoms"
                  onChange={(e, sym) => setSelectedSymptom(sym)}
                  getOptionLabel={(searchSymptom) => `${searchSymptom.name}`}
                  options={searchSymptom}
                  onInputChange={(e) => handleAutoCompleteSymptom(e)}
                  noOptionsText={
                    handleAutoCompleteSymptom ? "" : "Symptom Not Available"
                  }
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={params.name}
                      label="Search for Symptoms"
                    />
                  )}
                />
              </Stack>

              {/* <input
                className="border-black  w-full border-[0.8px]  h-8 outline-none pl-2 text-sm"
                type="text"
                value={SymptomName}
                onChange={(e) => handleAutoCompleteSymptom(e)}
                // placeholder="Enter...."
              />

              {searchSymptom.length > 0 && (
                <div className="absolute overflow-auto h-20 z-10 bg-white w-full border-[0.8px] border-black">
                  {searchSymptom.map((sym, i) => {
                    return (
                      // <div key={i}>
                      <p
                        key={i}
                        onClick={() => {
                          setSelectedSymptom(sym);
                          setSymptomName(sym.name);
                          setSearchSymptom([]);
                        }}
                        className="m-0 pl-2 hover:bg-[#edecec]"
                      >
                        {sym.name}
                      </p>
                      // </div>
                    );
                  })}
                </div>
              )} */}
            </div>

            <label className="font-semibold">Type</label>
            <input
              value={type}
              className="border-black
              w-full border-[0.8px]  h-8 outline-none pl-2 text-sm"
              type="text"
              // placeholder="Enter...."
            />

            <label className="font-semibold">Description</label>
            <textarea
              value={description}
              className="border-black
              w-full border-[0.8px]  h-14 outline-none pl-2 text-sm"
              type="text"
              // placeholder="Enter...."
            ></textarea>
          </div>

          <div className="float-right mt-5">
            <Button
              label="Link Body Part"
              onTap={handleLinking}
              color="bg-[#8FECFF]"
            />
            {/* {props.symptom && (
              <Button
                label="Delete Symptom"
                onTap={() => {
                  setIsDelete(true);
                }}
                color="bg-[#8FECFF]"
              />
            )} */}
          </div>
          {muiSpinner && (
            <div className="fixed flex justify-center items-center left-0 bg-black opacity-70 top-0 w-full h-full">
              <LoaderFunction height="100" width="100" />
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LinkSymptomModal;
