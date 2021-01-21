import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { loadQuestions, inputChange } from "./../../../redux/actions/pastQuestionsActions";
	

const SubjectBox = props => {           
        const  yearList = () => {         
            if(props.years.length){
                return props.years.map((item, index) => {   
                    let result = <li key={index}><Link to="/past-questions/instructions" onClick={handleSubjectClick.bind(this,props.title,item.exam_year,props.imageUrl, item.subject_id)}>{item.exam_year}</Link></li>;                                               
                    return result;                              
                })
            }else{
               return <h5>0ops!, No subject found</h5>
            }
            
        }
        const handleSubjectClick = (selectedSubject,selectedYear,selectedSubjectImg,subjectId, e) => {             
            props.inputChange('selectedSubject',selectedSubject);
            props.inputChange('selectedYear',selectedYear);
            props.inputChange('selectedSubjectImg',selectedSubjectImg); 
            props.loadQuestions(subjectId);           
        }

    	return (
        <div className="col-md-2 dropdown relative">            
                <p className="white">{props.title}</p>
                <span>
                    <img src={props.imageUrl} alt={props.title} className="MySubject"/> 
                </span>
           
                <div className="row yearDropDown">
                    <div className="col-12 padOff">
                        <ul>
                            <li>Select Year</li>
                           {yearList()}                      
                        </ul>                                              
                    </div>
                </div>
                               
        </div>
	);
};

SubjectBox.propTypes= {   
    loadQuestions: PropTypes.func.isRequired,  
    inputChange: PropTypes.func.isRequired, 
}

export default connect(null, {loadQuestions, inputChange})(SubjectBox);
