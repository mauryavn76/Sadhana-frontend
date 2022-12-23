import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const SunEditorDisease = (props) => {
  console.log("0000000", props.diseaseContent);
  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  return (
    <div>
      <p> My Other Contents </p>
      <SunEditor
        onChange={props?.handleContent}
        setContents={props?.diseaseContent}
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
export default SunEditorDisease;
