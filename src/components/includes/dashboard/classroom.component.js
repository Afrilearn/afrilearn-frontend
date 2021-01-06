import React  from "react";
import { Link } from "react-router-dom";
import Bullet1 from '../../../assets/img/redBullet.png';
import Bullet2 from '../../../assets/img/greenBullet.png';

const Box = props => { 
	return (		
        <div className="row bottomBorder push9 myClassroom">
            <div className="col-md-4">
                <span><img src={props.bullet2? Bullet2: Bullet1} alt="classroom" className="bullet"/>&nbsp;&nbsp; Class code MxH8902</span>
            </div>
            <div className="col-md-4">
                <span className="instructor">Instructor:&nbsp;</span> A.B Adebayo
            </div> 
            <div className="col-md-4 right">
                <Link className="view" to="/classes/8799879/89798">View</Link>  
            </div>               
        </div>
	);
};

export default Box;