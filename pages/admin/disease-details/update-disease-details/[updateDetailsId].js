import React, { useEffect, useState, useRef } from 'react';
import EditDisease from '../../../../components/admin/Draft/EditDisease';
import BASE_URL from '../../../../utils/base-url';
// import axios from 'axios';
// import TextInput from '../../../components/multiusable/text-input';
import Textarea from '../../../../components/multiusable/text-area';
// import TransparantButton from '../../../components/multiusable/transparent-button';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
// import Button from '../../../components/multiusable/button';
// import Tag from '../../../components/multiusable/tags';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import { useTheme } from '@mui/material/styles';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { OutlinedInput } from '@material-ui/core';
import { EditorState } from 'draft-js';
// import Disease from '../../../components/admin/Draft/Disease';
import Stack from '@mui/material/Stack';
import { Autocomplete } from '@mui/material';
// import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import Header from '../../../../components/multiusable/header';
// import SunEditorDisease from '../../../components/admin/Draft/DiseaseSun';
import Button from '../../../../components/multiusable/button';
import Tag from '../../../../components/multiusable/tags';
import Tost from '../../../../components/admin/modals/tost';
import config from '../../../../Config'

const UpdateDiseaseDetails = ({ details }) => {
  const [body, setBody] = useState('');
  const [diseaseTabs, setDiseaseTabs] = useState(details?.data);
  const [selectedTab, setSelectedTab] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [dropdown, setDropdown] = useState(false);
  const showMenu = () => setDropdown(!dropdown);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [description, setDescription] = useState(details?.description);
  const [disease, setDisease] = useState();
  const [searchDisease, setSearchDisease] = useState([]);

  const [selectedTabs, setSelectedTabs] = useState(
    details.data.map((data) => {
      return { _id: data?._id, name: data?.name };
    })
  );

  const [isSelelcted, setIsSelected] = useState(details?.data[0]?.name);

  console.log('isSelected', isSelelcted);

  const imageInputRef = useRef(null);

  const [image, setImage] = useState(details?.image);
  const [diseaseThumb, setDiseaseThumb] = useState('');

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [tabNames, setTabNames] = useState([]);

  console.log('body', details);
  // const handleEditorContent = (content) => {
  //   let newArr = [...diseaseTabs];
  //   newArr[selectedIndex].tab_content = content;
  //   setDiseaseTabs(newArr);
  // };

  const [con, setCon] = useState('');
  const handle = () => {
    ``;
    let newArr2 = [...diseaseTabs];
    newArr2[selectedIndex].tab_content = con;
    setDiseaseTabs(newArr2);
  };
  useEffect(() => {
    if (con.length > 0) {
      handle();
    }
  }, [con]);
  const handleEditorContent = (content) => {
    console.log('selectedIndex', selectedIndex);
    // handle(content)
    setCon(content);

    // diseaseTabs[selectedIndex].tab_content = content
    // console.log("========", newArr2)
  };

  const validate = () => {
    let errors = {};
    if (!disease) {
      errors.diseaseError = 'Please Select a Disease';
    }
    if (description.length == 0) {
      errors.discriptionError = 'Please enter Discription';
    }
    if (!diseaseThumb) {
      errors.diseaseImage = 'Please Select an Image';
    }
    if (diseaseTabs.length == 0) {
      errors.tabsError = 'Please select Tabs';
    }
    return errors;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate());
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    setDiseaseThumb(e.target.files[0]);
    setNewImage(URL.createObjectURL(e.target.files[0]));
  };

  const [newImage, setNewImage] = useState()


  useEffect(() => {
    const getDisease = () => {
      BASE_URL.get('')
    }

    getDisease()
  }, [])

  useEffect(() => {
    const updateDiseaseTab = async () => {
      try {
        const diseaseFormData = new FormData();
        diseaseFormData.append('d_id', disease._id);
        diseaseFormData.append('image', diseaseThumb);
        diseaseFormData.append('title', disease.name);
        diseaseFormData.append('description', description);
        diseaseFormData.append('data', JSON.stringify(diseaseTabs));
        const res = await BASE_URL.post(
          '/disease-details/' + details?.slug,
          diseaseFormData
        );
        // <Tost text={'User Added Successfully'} />;
        console.log('updated successfully');
        // window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
    if (isSubmit && Object.keys(formErrors).length == 0) {
      updateDiseaseTab();
    }
  }, [isSubmit, formErrors]);

  useEffect(() => {
    const getAllTabs = async () => {
      const res = await BASE_URL.get('/disease-tab');
      // console.log(res);

      setTabNames(res.data.data);
    };
    getAllTabs();
  }, []);

  console.log("ddd", diseaseThumb)

  const handleAutoCompleteDisease = async (e) => {
    setDisease(e.target.value);
    if (e.target.value?.length >= 3) {
      const res = await BASE_URL.get(
        '/search-value?search_type=disease&search=' + e.target.value
      );
      setSearchDisease(res.data.data);
      // console.log(res);
    } else {
      setSearchDisease([]);
    }
  };
  // return <pre>{JSON.parse(details)}</pre>;/

  console.log('sel', diseaseTabs);

  return (
    <div className="w-4/5">
      <Header title={'Edit Diseases'} />
      <div className="px-4 py-4">
        <div className="flex justify-center">
          <h1 className="text-2xl">Update Disease Details</h1>
        </div>
        <p className="text-red-500 text-center">
          {Object.keys(formErrors).length > 0 && Object.values(formErrors)[0]}
        </p>
        <div className="flex justify-between px-24">
          <div className="flex flex-col py-4">
            <p className="m-1">Disease Name</p>
            <Stack sx={{ width: 332 }} />
            <Autocomplete
              size="small"
              id="symptoms"
              onChange={(e, sym) => setDisease(sym)}
              getOptionLabel={(searchBodyPart) => `${searchBodyPart.name}`}
              options={searchDisease}
              onInputChange={(e) => handleAutoCompleteDisease(e)}
              noOptionsText={
                handleAutoCompleteDisease ? '' : 'Body Part Not Available'
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
            <p className="m-1">Blog Description</p>
            <Textarea
              value={description}
              onChange={setDescription}
              placeholder={'Enter Description'}
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
                      tab_content: '',
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
          </div>
          <div className="border-black border-2 flex justify-center items-center flex-col border-solid h-32 w-32 mt-11 ml-72">
            {newImage ?
              <img src={newImage} /> :
              <img className="h-full w-full" src={config.imageUrl + '/' + image} />

            }
          </div>
          <div className="mt-10 mr-10 flex flex-col p-1">
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
        <div className="ml-20 flex">
          {selectedTabs.map((tab, index) => {
            return (
              <Tag
                key={index}
                onTap={() => {
                  setIsSelected(tab.name);
                  setSelectedIndex(index);
                  setSelectedTab(index);
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
                  if (isSelelcted == tab.name) {
                    setIsSelected('');
                  }
                }}
              />
            );
          })}
        </div>

        {selectedTabs.length > 0 && isSelelcted.length > 0 ? (
          <div className="mt-8">
            <EditDisease
              selectedTab={selectedTab}
              handleContent={handleEditorContent}
              disease={diseaseTabs[selectedTab]?.tab_content}
            />
            <div className="my-4 mx-2 flex justify-end">
              <Button
                onTap={submitForm}
                label="Update Details"
                color="bg-[#8FECFF]"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UpdateDiseaseDetails;

export async function getServerSideProps(context) {
  const title = context.params.updateDetailsId;
  const res = await BASE_URL.get('/disease-details?d_id=' + title);
  const details = res.data.data;
  return {
    props: {
      details,
    },
  };
}
