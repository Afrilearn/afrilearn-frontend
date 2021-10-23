import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const HTMLEditor = (props) => {
  return (
    <SunEditor {...props} onChange={(content) => props.onChange(content)} />
  );
};

export default HTMLEditor;
