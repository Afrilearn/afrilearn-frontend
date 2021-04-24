import React, { useRef } from "react";

const CheckBox = (props) => {
  let inputRef = useRef();
  return (
    <div
      id="checkbox"
      style={{ display: "inline-block", position: "relative", ...props.style }}
      className={`${props.className}`}
    >
      <input
        checked={props.checked}
        onChange={(e) => {
          if (props.onChange) props.onChange(e.target.checked);
        }}
        ref={inputRef}
        type="checkbox"
        style={{display: 'none'}}
      />
      <div
        onClick={() => {
          inputRef.current.click();
        }}
        className="box"
        style={{
          maxWidth: props.size || 20,
          maxHeight: props.size || 20,
          minWidth: props.size || 20,
          minHeight: props.size || 20,
          borderRadius: ".2em",
          backgroundColor: `${
            props.checked ? "white" : '#282828'
          }`,
          padding: 0,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        {props.checked &&
          (props.icon || (
            <i
              className="fa fa-check"
              style={{
                fontSize: Math.round(props.size / 1.6) || 12,
                color: "white",
                position: "absolute",
              }}
            ></i>
          ))}
      </div>
    </div>
  );
};
export default CheckBox;
