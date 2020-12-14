import React from "react";

const Box = props => {	
	return (	
        <div className="col-md-3 relative">
            <div className="row">
                <div className="col-md-12">
                    <img className="fullWidth" src={props.image} alt={props.name}/> 
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                  <span className={`box ${props.other1? 'other1':props.other2? 'other2':props.other3? 'other3':''}`}>
                    <h3 className="center">{props.name}</h3>
                    <h5>{props.position}</h5>
                  </span>                   
                </div>
            </div>
            <p className="box">{props.details}</p>
        </div>
	);
};
export default Box;