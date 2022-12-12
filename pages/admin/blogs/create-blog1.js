import Head from "next/head";
import Editor from "../../../components/admin/Editor/Editor";
import Sidebar from "../../../components/admin/admin-sidebar";
import axios from "axios";

const CreateBlog = () => {
  const onSaveHandler = async (blogData, title, description) => {
    const toSaveData = {
      title: title,
      blog_body: blogData,
      desc: description,
    };

    console.log(toSaveData);
    const res = await axios.post(
      "https://sadhna-backend.herokuapp.com/blogs/",
      toSaveData
    );
    console.log(res);
    //make your ajax call to send the data to your server and save it in a database
  };

  return (
    <div className="w-3/4 my-10">
      <h1 className="text-center text-2xl  mb-5 font-bold">NEW BLOG</h1>
      <Editor
        onSave={(editorData, title, description) =>
          onSaveHandler(editorData, title, description)
        }
      />
    </div>
  );
};

export default CreateBlog;
