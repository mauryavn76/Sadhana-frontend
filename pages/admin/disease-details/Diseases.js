import { useEffect, useRef, useState } from "react";
import Draft from "../../../components/admin/Draft/Draft";
import BASE_URL from "../../../utils/base-url";
import axios from "axios";
import TextInput from "../../../components/multiusable/text-input";
import Textarea from "../../../components/multiusable/text-area";
import TransparantButton from "../../../components/multiusable/transparent-button";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import Button from "../../../components/multiusable/button";
import Tag from "../../../components/multiusable/tags";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useTheme } from "@mui/material/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { OutlinedInput } from "@material-ui/core";
import Header from "../../../components/multiusable/header";
import { EditorState } from "draft-js";
import Disease from "../../../components/admin/Draft/Disease";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material";
// import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import SunEditorDisease from "../../../components/admin/Draft/DiseaseSun";

const DiseaseDetails = () => {
  const [body, setBody] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const showMenu = () => setDropdown(!dropdown);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [description, setDescription] = useState("");
  const [disease, setDisease] = useState();
  const [searchDisease, setSearchDisease] = useState([]);

  const [selectedTabs, setSelectedTabs] = useState([]);

  const [isSelelcted, setIsSelected] = useState("");

  const imageInputRef = useRef(null);

  const [image, setImage] = useState();
  const [diseaseThumb, setDiseaseThumb] = useState("");

  const [diseaseTabs, setDiseaseTabs] = useState([
    // { _id: "", editorState: EditorState.createEmpty() },
  ]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOnTabTap = (id, name, index) => { };
  useEffect(() => {
    const getAllTabs = async () => {
      const res = await BASE_URL.get("/disease-tab");
      // console.log(res);

      setTabNames(res.data.data);
    };
    getAllTabs();
  }, []);
  // console.log(diseaseTabs);

  // console.log("disease", disease);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate());
    // try {
    //   const diseaseFormData = new FormData();
    //   diseaseFormData.append("d_id", disease._id);
    //   diseaseFormData.append("image", diseaseThumb);
    //   diseaseFormData.append("title", disease.name);
    //   diseaseFormData.append("description", description);
    //   diseaseFormData.append("data", JSON.stringify(diseaseTabs));
    //   const res = await BASE_URL.post("/disease-details", diseaseFormData);

    //   alert("Successfully Added");
    //   window.location.reload();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    const addDiseaseTab = async () => {
      try {
        const diseaseFormData = new FormData();
        diseaseFormData.append("d_id", disease._id);
        diseaseFormData.append("image", diseaseThumb);
        diseaseFormData.append("title", disease.name);
        diseaseFormData.append("description", description);
        diseaseFormData.append("data", JSON.stringify(diseaseTabs));
        const res = await BASE_URL.post("/disease-details", diseaseFormData);
        alert("Successfully Added");
        // window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
    if (isSubmit && Object.keys(formErrors).length == 0) {
      addDiseaseTab();
    }
  }, [isSubmit, formErrors]);

  console.log(formErrors);

  const handleImageChange = (e) => {
    e.preventDefault();
    setDiseaseThumb(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const [tabNames, setTabNames] = useState([]);

  const handleAutoCompleteDisease = async (e) => {
    setDisease(e.target.value);
    if (e.target.value?.length >= 3) {
      const res = await BASE_URL.get(
        "/search-value?search_type=disease&search=" + e.target.value
      );
      setSearchDisease(res.data.data);
      // console.log(res);
    } else {
      setSearchDisease([]);
    }
  };

  console.log("====", diseaseTabs, selectedIndex);
  const [con, setCon] = useState("")
  const handle = () => {
    ``
    let newArr2 = [...diseaseTabs];
    newArr2[selectedIndex].tab_content = con;
    setDiseaseTabs(newArr2);
  }
  useEffect(() => {
    if (con.length > 0) {
      handle()
    }
  }, [con])

  console.log("con", con)

  const handleEditorContent = (content) => {

    console.log("selectedIndex", selectedIndex)
    // handle(content)
    setCon(content)

    // diseaseTabs[selectedIndex].tab_content = content
    // console.log("========", newArr2)
  };

  // console.log("disease tabs", diseaseTabs);

  const validate = () => {
    let errors = {};
    if (!disease) {
      errors.diseaseError = "Please Select a Disease";
    }
    if (description.length == 0) {
      errors.discriptionError = "Please enter Discription";
    }
    if (!diseaseThumb) {
      errors.diseaseImage = "Please Select an Image";
    }
    if (diseaseTabs.length == 0) {
      errors.tabsError = "Please select Tabs";
    }
    return errors;
  };

  return (
    <>
      <div className="w-4/5">
        <Header title="Disease Details" />
        <div className="flex justify-center">
          <h1 className="text-2xl mt-4">New Disease Details</h1>
        </div>
        <p className="text-red-500 text-center">
          {Object.keys(formErrors).length > 0 && Object.values(formErrors)[0]}
        </p>
        <div className="flex h-max px-24 justify-start">
          <div className="">
            <div className="flex justify-between">
              <div className="mt-3 w-[49%]">
                <p className="m-1">Disease Name</p>
                <Stack sx={{ width: 332 }}>
                  <Autocomplete
                    size="small"
                    id="symptoms"
                    onChange={(e, sym) => setDisease(sym)}
                    getOptionLabel={(searchBodyPart) =>
                      `${searchBodyPart.name}`
                    }
                    options={searchDisease}
                    onInputChange={(e) => handleAutoCompleteDisease(e)}
                    noOptionsText={
                      handleAutoCompleteDisease ? "" : "Body Part Not Available"
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
                        label="Search for Disease"
                      />
                    )}
                  />
                </Stack>
              </div>
            </div>
            <p className="m-1">Blog Description</p>
            <Textarea
              onChange={setDescription}
              placeholder={"Enter Description"}
            />

            <p className="m-1">Disease Tab</p>

            <div className="flex items-center">
              <select
                className="h-8 border-[0.8px] border-black w-full"
                id="tabs"
                name="tabs"
                onChange={(e) => {
                  setSelectedTabs((prev) => [
                    ...prev,
                    JSON.parse(e.target.value),
                  ]);
                  setDiseaseTabs((prev) => [
                    ...prev,
                    {
                      tab_id: JSON.parse(e.target.value)._id,
                      tab_content: "",
                    },
                  ]);
                }}
              >
                <option value="" disabled selected>
                  Select Disease tabs
                </option>
                {tabNames.map((tab, i) => {
                  return (
                    <option key={i} value={JSON.stringify(tab)}>
                      {tab.name}
                    </option>
                  );
                })}
              </select>
              <Button label="ADD" color="bg-[#8FECFF]" />
            </div>

            <div className="h-max py-8 grid grid-cols-3">
              {selectedTabs.map((tab, index) => {
                return (
                  <Tag
                    key={index}
                    onTap={() => {
                      setIsSelected(tab.name);
                      setSelectedIndex(index);
                    }}
                    isSelected={isSelelcted == tab.name ? true : false}
                    label={tab.name}
                    onCancel={() => {
                      let newArr = [...selectedTabs];
                      newArr.splice(index, 1);
                      setSelectedTabs(newArr);
                      let newArr1 = [...diseaseTabs];
                      newArr1.splice(index, 1);
                      setDiseaseTabs(newArr1);
                    }}
                  />
                );
              })}
            </div>
          </div>
          {/* <div className="text-sm">
            <h1>Image</h1>
          </div> */}
          <div className="border-black border-2 flex justify-center items-center flex-col border-solid h-32 w-32 mt-11 ml-16">
            {!image ? (
              <>
                <WallpaperOutlinedIcon />
                <p>Upload</p>
              </>
            ) : (
              <img className="h-full w-full" src={image} />
            )}
          </div>
          <div className="mt-10 ml-2 flex flex-col p-1">
            <div className="h-7 w-7 flex justify-center items-center rounded-full bg-[#D9D9D9]">
              <FileUploadOutlinedIcon
                className="cursor-pointer"
                onClick={() => imageInputRef.current.click()}
              />
              <input
                type="file"
                onChange={(e) => handleImageChange(e)}
                className="hidden"
                ref={imageInputRef}
              />
            </div>
            <div className="h-7 w-7 flex justify-center items-center rounded-full mt-2 bg-[#D9D9D9]">
              <CloseOutlinedIcon
                className="cursor-pointer"
                onClick={() => setImage()}
              />
            </div>
          </div>
        </div>
        {/* {selectedIndex && ( */}
        {selectedIndex != null && (
          <div className="px-24">
            <label className="font-semibold text-lg">Blog Editor</label>
            {/* <Disease
              handleContent={handleEditorContent}
              selectedIndex={selectedIndex}
              diseaseContent={diseaseTabs[selectedIndex].tab_content}
            /> */}
            <SunEditorDisease selectedIndex={selectedIndex} diseaseContent={diseaseTabs[selectedIndex]?.tab_content} handleContent={handleEditorContent} />
            <div className="my-4 flex justify-end">
              <Button onTap={submitForm} label="Add New" color="bg-[#8FECFF]" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default DiseaseDetails;
