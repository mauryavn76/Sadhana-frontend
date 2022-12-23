import React, { Component, useEffect, useRef, useState } from "react";
import { ContentState, EditorState } from "draft-js";
import dynamic from "next/dynamic";
// import apiClient from '../api/api_client';
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const EditDisease = ({ handleContent, disease, selectedTab }) => {
  const editor = useRef();

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  return (
    <div>
      <SunEditor
        height="100%"
        onChange={handleContent}
        setContents={disease}
        getSunEditorInstance={getSunEditorInstance}
        setOptions={{
          buttonList: [
            [
              "undo",
              "redo",
              "font",
              "fontSize",
              "formatBlock",
              "paragraphStyle",
              "blockquote",
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "fontColor",
              "hiliteColor",
              "textStyle",
              "removeFormat",
              "outdent",
              "indent",
              "align",
              "horizontalRule",
              "list",
              "lineHeight",
              "table",
              "link",
              "image",
              "video",
              "audio" /** 'math', */, // You must add the 'katex' library at options to use the 'math' plugin.
              /** 'imageGallery', */ // You must add the "imageGalleryUrl".
              "fullScreen",
              "showBlocks",
              "codeView",
              "preview",
              "print",
              "save",
              "template",
              /** 'dir', 'dir_ltr', 'dir_rtl' */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
            ],
          ],
        }}
      />
    </div>
  );
};
export default EditDisease;
