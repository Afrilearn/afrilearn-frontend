import React, { useEffect, useRef } from "react";
import './css/style.css'; 
// import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { inputChange } from '../../../redux/actions/authActions';
import Box from '../../includes/subjectBox.component';
import {Helmet} from "react-helmet";

const SubjectPage = props => {  
    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);  
            props.inputChange('currentQuestion', 0);  
            props.inputChange('correctAnswers', 0);   
            props.inputChange('redirect', false); 
            props.inputChange('privacyPage', false);                  
        } else {
            // do componentDidUpdate logic          
          } 	       
    }) 
   
    // eslint-disable-next-line no-extend-native
    String.prototype.toWordCase = function () {
        return this.replace(/(^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    const { 
        // redirect,
        // location, 
        showResult,
        subjects,
        subjectTag  
    } = props;

    const handleCloseBox = e =>{   
        e.preventDefault();
        if(showResult){
            props.inputChange('showResult', false);	 
        }         
    }
  
    const subjectList = () => {         
        if(subjects && subjects.length){
            return subjects.map((item, index) => {            
                return <Box 
                        key={index}
                        subjectId={item.id} 
                        imageUrl={item.subject_image}
                        title={item.subject}
                        years={item.years}
                    />               
            })
        }else{
           return <h5>0ops!, No item found</h5>
        }
		
    }
    
	return (        
		<>   
           <Helmet>
                <meta charSet="utf-8" />
                <title>Subject Page | Myafrilearn.com</title>
                <meta name="description" content='Subject Page' />
            </Helmet>             
           <div className="container-fluid Subject" onClick={handleCloseBox}>
                <div className="row">
                 
                   <div className="col-md-10 afterNav">
                        <div className="row kk">
                           <div className="col-md-12">
                                <h4 className="headingOne">Select {subjectTag}</h4>
                           </div>                          
                        </div>
                        <div className="row sectionThree">
                           {subjectList()}                  
                        </div>
                   </div>
                </div>
           </div>     
        </>
	);
};

SubjectPage.propTypes= {   
    inputChange: PropTypes.func.isRequired,  
}
const mapStateToProps = state => ({  
    redirect: state.auth.redirect,
    location: state.auth.location, 
    showResult: state.auth.showResult,
    subjects: state.auth.subjects,
    subjectTag: state.auth.subjectTag
})
export default connect(mapStateToProps, {inputChange})(SubjectPage);