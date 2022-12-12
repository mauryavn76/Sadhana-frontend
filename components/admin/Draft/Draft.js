import React, { Component, useRef, useState } from "react";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
// import apiClient from '../api/api_client';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Draft = ({
  handleContent,
  // editorState,
  // setDiseaseTabs,
  // diseaseTabs,
  // index,
}) => {
  const editor = useRef();




  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  return (
    <div>
      <SunEditor onChange={handleContent} getSunEditorInstance={getSunEditorInstance}
        setOptions={{
          buttonList: [
            [
              'undo', 'redo',
              'font', 'fontSize', 'formatBlock',
              'paragraphStyle', 'blockquote',
              'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
              'fontColor', 'hiliteColor', 'textStyle',
              'removeFormat',
              'outdent', 'indent',
              'align', 'horizontalRule', 'list', 'lineHeight',
              'table', 'link', 'image', 'video', 'audio', /** 'math', */ // You must add the 'katex' library at options to use the 'math' plugin.
              /** 'imageGallery', */ // You must add the "imageGalleryUrl".
              'fullScreen', 'showBlocks', 'codeView',
              'preview', 'print', 'save', 'template',
              /** 'dir', 'dir_ltr', 'dir_rtl' */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
            ]
          ]
        }}
      />
    </div>
  );
};
export default Draft;
