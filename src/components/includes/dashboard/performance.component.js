import React  from "react";
import parse from 'html-react-parser';

const Box = props => { 
	return (		
        <div className="row push7">
            <div className="col-md-3">
                <span className={props.excel? 'excel':props.average? 'average':props.belowAverage? 'belowAverage':props.noRating?'noRating':''}>{props.title}</span>
            </div>
            <div className="col-md-9 push6">
                <p>{parse(props.data)}</p>
            </div>
        </div>
	);
};


export default Box;