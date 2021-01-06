import React  from "react";
import { Link } from "react-router-dom";

const Box = props => { 
	return (		
        <div className="col-md-3">
            <Link to="/">
                <span className={props.other? 'pastQuestionsBox pastQuestionsBox1':'pastQuestionsBox'}>
                    <div className="row">
                        <div className="col-4">
                            <img  src={require('../../../assets/img/past-questions.png')} alt="past questions"/>
                        </div>
                        <div className="col-8">
                            <h6>{props.title}</h6>
                            <p>Over 13,000 questions per subject</p>
                        </div>
                    </div>
                </span>
            </Link>
        </div>   
	);
};


export default Box;