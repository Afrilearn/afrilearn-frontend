import React from "react";

const Box = props => {	
	return (	
        <div className="col-md-12">                        
            <p>Over 95% of students, teachers and parents who have used Afrilearn 
                report it is a highly effective curriculum-specific learning resource, 
                more than any other online learning resource
            </p>
            <span>
                <img className="photo" src={require('../../assets/img/photo.png')} alt="apppreciation box"/> 
                <span className="appreciationName">Alex Marshal<br/>SS3</span>
            </span>
        </div>  
    );
};
export default Box;