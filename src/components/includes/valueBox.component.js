import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Box = props => {	
	return (	
        <div className="row">
            <div className="col-2">
                <FontAwesomeIcon icon={props.image} />
            </div>
            <div className="col-10 paddingLeftOff">
                <h2>{props.title}</h2>
                <p>{props.content}</p>
            </div>
        </div> 
	);
};
export default Box;