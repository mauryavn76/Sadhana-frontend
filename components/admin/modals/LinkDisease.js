import React, { useState, useEffect } from "react";
import Button from "../../multiusable/button";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import DeleteModal from "./delete-modal";
import BASE_URL from "../../../utils/base-url";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import TextInput from "../../multiusable/text-input";
import Textarea from "../../multiusable/text-area";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { ContentPasteSearchOutlined } from "@mui/icons-material";
import LoaderFunction from "../../multiusable/loader";

const LinkDiseaseModal = (props) => {
  const [diseaseName, setDiseaseName] = useState();
  const [SymptomName, setSymptomName] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [probability, setProbability] = useState();
  const [searchDisease, setSearchDisease] = useState([]);
  const [searchSymptom, setSearchSymptom] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState({});
  const [selectedSymptom, setSelectedSymptom] = useState({});
  const [token, setToken] = useState("");
  const [muiSpinner, setShowMuiSpinner] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("access-token"));
    }
  }, []);

  const handleAutoCompleteSymptom = async (e) => {
    // console.log(token);
    setSymptomName(e?.target?.value);
    if (e?.target?.value?.length >= 3) {
      const res = await BASE_URL.get(
        "/search-value?search_type=symptom&search=" + e.target.value,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setSearchSymptom(res.data.data);
      // console.log(res);
    } else {
      setSearchSymptom([]);
    }
  };
  const handleAutoCompleteDisease = async (e) => {
    setDiseaseName(e?.target?.value);
    if (e?.target?.value?.length >= 3) {
      const res = await BASE_URL.get(
        "/search-value?search_type=disease&search=" + e.target.value,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setSearchDisease(res.data.data);
      // console.log(res);
    } else {
      setSearchDisease([]);
    }
  };

  const handleLinking = async () => {
    try {
      setShowMuiSpinner(true);
      const res = await BASE_URL.post("/symptom-disease", {
        s_id: selectedSymptom._id,
        d_id: selectedDisease._id,
        probability: probability,
      });
      props.onHide();
      console.log(res);
      setProbability("");
      setSelectedSymptom({});
      setSelectedDisease({});
      setShowMuiSpinner(false);
    } catch (err) {
      console.log(err);
      setProbability("");
      setSelectedSymptom({});
      setSelectedDisease({});
      setShowMuiSpinner(false);
    }
  };

  console.log("selected SYmptom", selectedSymptom);

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
            <label className="font-semibold">Symptom Name</label>
            <div className="relative">
              <Stack sx={{ width: 332 }}>
                <Autocomplete
                  size="small"
                  onChange={(e, sym) => setSelectedSymptom(sym)}
                  id="symptoms"
                  getOptionLabel={(searchSymptom) => searchSymptom.name}
                  options={searchSymptom}
                  onInputChange={(e) => handleAutoCompleteSymptom(e)}
                  noOptionsText={
                    handleAutoCompleteSymptom ? "" : "Symptom Not Available"
                  }
                  renderOption={(props, option) => (
                    <Box
                      onClick={() => {
                        setSelectedSymptom(option);
                        console.log(option);
                      }}
                      component="li"
                      {...props}
                    >
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      sx={{ borderColor: "black" }}
                      {...params}
                      value={params.name}
                      label="Search for Symptoms"
                    />
                  )}
                />
              </Stack>
            </div>
            <label className="font-semibold">Disease Name</label>

            <div className="relative">
              <Stack sx={{ width: 332 }}>
                <Autocomplete
                  size="small"
                  id="diseases"
                  getOptionLabel={(searchDisease) => searchDisease.name}
                  options={searchDisease}
                  onInputChange={(e) => handleAutoCompleteDisease(e)}
                  onChange={(e, disease) => setSelectedDisease(disease)}
                  noOptionsText={
                    handleAutoCompleteDisease ? "" : "Symptom Not Available"
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
                      label="Search for Diseases"
                    />
                  )}
                />
              </Stack>
            </div>
            <label className="font-semibold">Probability</label>
            <TextInput value={probability} onChange={setProbability} />
            <label className="font-semibold">Type</label>
            <TextInput value={type} onChange={setType} />
            <label className="font-semibold">Description</label>

            <Textarea value={description} onChange={setDescription} />
          </div>

          <div className="float-right mt-5 border-0">
            <Button
              label="Link Disease"
              onTap={handleLinking}
              color="bg-[#8FECFF]"
            />
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

export default LinkDiseaseModal;
