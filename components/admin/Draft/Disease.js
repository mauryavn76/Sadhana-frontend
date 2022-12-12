import React, { Component, useEffect, useState } from "react";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
// import apiClient from '../api/api_client';
import { convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const Disease = ({
  handleContent,
  selectedIndex,
  diseaseContent
  // editorState,
  // setDiseaseTabs,
  // diseaseTabs,
  // index,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (diseaseContent.length == 0) {
      setEditorState(EditorState.createEmpty());
    }
    else {
      const content = convertFromRaw(diseaseContent);
      setEditorState(EditorState.createWithContent(content))
    }
  }, [selectedIndex]);

  // console.log(convertToRaw(editorState.getCurrentContent()));
  console.log("eeeeeeeeeeeeeeeeeee", editorState);
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // setDiseaseTabs(tabs => ({
    //   ...tabs,
    //   [index]: { editorState: editorState },
    // }));
    // let newArr = [...diseaseTabs];
    // newArr[index].editorState = editorState;
    // setDiseaseTabs(newArr);
    handleContent(convertToRaw(editorState?.getCurrentContent()));
  };
  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID 1f4d165c39c19ed");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
  }

  return (
    <div className="border-gray-300 border-2 h-[calc(100vh-300px)] overflow-y-auto w-full">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        // toolbarOnFocus
        editorStyle={{
          fontFamily: 'Poppins',
        }}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          // image: {
          //   urlEnabled: true,
          //   uploadEnabled: true,
          //   uploadCallback: uploadImageCallBack,
          //   previewImage: true,
          //   alt: { present: false, mandatory: false },
          // },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
      />
    </div>
  );
};
export default Disease;
