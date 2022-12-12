import { useEffect, useRef, useState } from "react";
import Draft from "../../../components/admin/Draft/Draft";
import BASE_URL from "../../../utils/base-url";
import TextInput from "../../../components/multiusable/text-input";
import Textarea from "../../../components/multiusable/text-area";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import Button from "../../../components/multiusable/button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Header from "../../../components/multiusable/header";
import LoaderFunction from "../../../components/multiusable/loader";
import Snackbar from "@mui/material/Snackbar";

const CreateBlog = () => {
  const [body, setBody] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [viewImage, setViewImage] = useState("");
  const [muiSpinner, setShowMuiSpinner] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const validate = () => {
    let errors = {};
    if (title.length === 0) {
      errors.titleError = "Please enter Blog Title";
    }
    if (desc.length === 0) {
      errors.descError = "Please enter Blog Description";
    }
    if (!image) {
      errors.imageError = "Please enter Blog Thumbnail";
    }
    if (body.length === 0) {
      errors.bodyError = "Please enter Blog Body";
    }
    return errors;
  };

  const submitForm = async () => {
    setErrors(validate());
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(errors);
    if (isSubmit) {
      const createBlog = async () => {
        // const blog = { title: title, description: desc, data: body };
        const data = new FormData();
        data.append("title", title);
        data.append("description", desc);
        data.append("data", JSON.stringify(body));
        data.append("image", image);
        if (Object.keys(errors) == 0) {
          try {
            const res = await BASE_URL.post("/blog", data);
            console.log(res);
            setSnackMessage("Blog successfully Added");
            handleClick({
              vertical: "bottom",
              horizontal: "right",
            });
          } catch (err) {
            // setSnackMessage(err.response.data.message);
            handleClick({
              vertical: "bottom",
              horizontal: "right",
            });
            console.log(err);
          }
        }
      };
      createBlog();
    }
  }, [errors, isSubmit]);

  const handleEditorContent = (content) => {
    setBody(content);
  };

  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    setViewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div className="w-4/5">
        <Header title="Manage Blogs" />
        <div className="flex justify-center">
          <h1 className="text-2xl mt-4">New Blog</h1>
        </div>
        <div className="flex w-full h-max px-24 justify-start">
          <div className="w-2/3">
            <div className="">
              <div className="mt-3 w-full">
                <p className="m-1">Blog Title</p>
                <TextInput
                  value={title}
                  placeholder={"Enter Title"}
                  onChange={setTitle}
                />
                <p className="text-[#E50000] text-sm m-0">
                  {errors.titleError}
                </p>
              </div>
            </div>
            <p className="m-1">Blog Description</p>
            <Textarea
              placeholder={"Enter Description"}
              value={desc}
              onChange={setDesc}
            />
            <p className="text-[#E50000] text-sm m-0">{errors.descError}</p>
            <div className="flex items-center"></div>
          </div>
          <div className="border-neutral-400 border-2 flex justify-center items-center flex-col border-separate h-32 w-32 mt-11 ml-16">
            {!viewImage ? (
              <>
                <WallpaperOutlinedIcon />
                <p>Upload</p>
                <p className="text-[#E50000] text-sm m-0">
                  {errors.imageError}
                </p>
              </>
            ) : (
              <img className="h-full w-full" src={viewImage} />
            )}
          </div>
          <div className="mt-10 flex ml-2 flex-col p-1">
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
            <div className="h-7 w-7 flex justify-center items-center mt-2 rounded-full bg-[#D9D9D9]">
              <CloseOutlinedIcon
                className="cursor-pointer"
                onClick={() => setViewImage()}
              />
            </div>
          </div>
        </div>
        <div className="px-24">
          <label className="font-semibold text-lg">Blog Editor</label>
          <Draft handleContent={handleEditorContent} />
          <p className="text-[#E50000] text-sm m-0">{errors.bodyError}</p>
          <div className="my-4 flex justify-end">
            <Button onTap={submitForm} label="Add New" color="bg-[#8FECFF]" />
          </div>
        </div>
        {muiSpinner && (
          <div className="fixed flex justify-center items-center left-0 bg-black opacity-70 top-0 w-full h-full">
            <LoaderFunction height="100" width="100" />
          </div>
        )}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={snackMessage}
          key={vertical + horizontal}
        />
      </div>
    </>
  );
};
export default CreateBlog;
