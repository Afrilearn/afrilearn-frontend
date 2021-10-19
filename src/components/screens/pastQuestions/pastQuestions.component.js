import React, { useEffect, useRef } from "react";
import "./css/style.css";
import { connect } from 'react-redux';
import { loadSubjects, inputChange } from './../../../redux/actions/pastQuestionsActions';
import Box from './../../includes/pastQuestions/subjectBox.component'
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";

const PastQuestions = props => {
  const {
    selectedCategory,
    subjectTag,
    subjects    
  } = props; 

  const mounted = useRef(); 
   
  useEffect(()=>{
     if (!mounted.current) {
        // do componentDidMount logic
        mounted.current = true;
        window.scrollTo(0, 0); 
        const { match: { params } } = props;            
        props.loadSubjects(params.categoryId) 
        props.inputChange('pastQuestionCategoryId', params.categoryId)                 
     } else {
        // do componentDidUpdate logic          
        } 	       
  }) 
  
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
       return <h5>0ops!, No subject found, check back later</h5>
    }

  }

  return ( 
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>{selectedCategory?selectedCategory+'| Myafrilearn.com':'Past Questions'}</title>
          <meta name="description" content='Past questions | WAEC | NECO | GCE' />
      </Helmet>  
      <div id="pastQuestionsSectionone">
        <h1>{selectedCategory}</h1>
        <aside>
          <p>Past Question</p>
          <h5>Select {subjectTag}</h5>
        </aside>
      </div>
      <div id="pastQuestionsSectionTwo" className="MySubject container-fluid">
        <div className="row sectionThree">
        {subjectList()} 
        </div>
      </div>
    </>
  );
};

PastQuestions.propTypes = {
  loadSubjects: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  selectedCategory: state.course.selectedCategory,
  subjectTag: state.pastQuestion.subjectTag,
  subjects: state.pastQuestion.subjects 
});

export default connect(mapStateToProps, { loadSubjects, inputChange })(PastQuestions);