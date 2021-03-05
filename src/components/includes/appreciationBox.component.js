import React from "react";

const Box = props => {	
	return (	
        <div className="col-md-12">                        
            <p>{props.content}</p>
            <span>
                {/* <img className="photo" src={require('../../assets/img/dummy.png')} alt="apppreciation box"/>  */}
                <span className="appreciationName">{props.name}<br/>{props.dClass}</span>
            </span>
        </div>  
    );
};
export default Box;