import React from "react";
import { Link } from "react-router-dom";

const Box = (props) => {
 
  return (
    <div className="row">
      <div className="col-md-4">
        <h5>English Examination One</h5>
        <small>Starts: 13th Sept, 2020</small>                       
      </div>
      <div className="col-md-2 center pushUp">
        Duration: 60mins
      </div>
      <div className="col-md-4 center pushUp">
        Objective
      </div>
      <div className="col-md-2">
        <Link>START EXAM</Link>
      </div>
    </div>  
  );
};

export default Box;
