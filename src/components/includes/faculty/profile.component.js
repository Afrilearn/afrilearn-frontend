import React from "react";

const Item = (props) => {
  const {item} = props 
  return (
    <div className="col-md-2 singleProfile relative">
      <img src={item.image} className="fullWidth" />
      <p>
        <h5 className="center uppercase">{item.name}</h5>
       {item.description}
      </p>
    </div>
  );
};

export default Item;
