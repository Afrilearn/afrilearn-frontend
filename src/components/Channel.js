import React from "react";

export default function Channel(props) {
  return (
    <div>
      <div classname="channel-item">
        <div>{props.name}</div>‍<span>{props.participants}</span>
      </div>
      ‍
    </div>
  );
}
