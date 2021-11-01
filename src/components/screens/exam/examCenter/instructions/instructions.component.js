import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { inputChange } from '../../../../../redux/actions/pastQuestionsActions';
import Icon1 from '../../../../../assets/img/questionsE.svg';
import Icon2 from '../../../../../assets/img/Category.svg';
import Icon3 from '../../../../../assets/img/TimeE.svg';

const ExamInstructionsPage = props => {  
    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);  
            props.inputChange('pastQuestionRedirect', false)          
        } else {
            // do componentDidUpdate logic          
          } 	       
    })  
   
    const { 
        selectedCategory,
        selectedSubject,
        selectedYear, 
        questionLength,   
        questionTime, 
        examType,
        quizTitle,
        fullName,
        lessonSubjectName
    } = props;

	return (        
		<> 
        <div className="container-fluid examInstructions">
            <div className="row">
                <div className="col-md-12">
                   <h2 className="headingOne center">Mathematics First Term JSS 1</h2> 
                </div>
            </div>
            <div className="row" id="examInstruction2">                
                <div className="col-md-12">
                    <img src={require('../../../../../assets/img/36999-5-blushing-emoji-file 1.png')}  className="examLogo" alt="exam-pictures"/>                                 
                </div>
            </div>
            <hr/>
            <div className="row" id="examInstruction3">
                <div className="col-md-6">
                    <span><img src={Icon1} alt="total number of exam questions"/>QUESTIONS: 50</span>
                </div>
                <div className="col-md-6 right">
                    <span><img src={Icon2} alt="total number of exam questions"/> QUESTION TYPE: OBJECTIVE & THEORY</span>
                </div>
                <div className="col-md-6">
                    <span><img src={Icon3} alt="total number of exam questions"/>TIME: 60MINS</span>
                </div>
            </div>           
            <hr/>
            <div className="row" id="examInstruction4">
                <div className="col-md-8">
                    <p>
                        Instruction: No pressure! Take your time to answer the questions.<br className="desktopOnly"/> Goodluck
                    </p>
                </div>
                <div className="col-md-4 right">
                    {/* <span><img src={Icon2} alt="total number of exam questions"/> QUESTION TYPE: OBJECTIVE & THEORY</span> */}
                </div>
            </div>
            <div className="row" id="examInstruction5">
                <div className="col-md-12 center">
                   <Link>LET’S GO</Link>
                </div>                
            </div>
        </div>     
        </>
	);
};

ExamInstructionsPage.propTypes= {   
    inputChange: PropTypes.func.isRequired,  
}

const mapStateToProps = state => ({    
    selectedCategory: state.course.selectedCategory,
    examType: state.pastQuestion.examType,
    quizTitle: state.pastQuestion.quizTitle,
    selectedSubject: state.pastQuestion.selectedSubject,
    selectedYear: state.pastQuestion.selectedYear,
    questionLength: state.pastQuestion.questionLength,   
    questionTime: state.pastQuestion.questionTime,
    fullName: state.auth.fullName,
    lessonSubjectName:  state.subject.lessonSubjectName
})
export default connect(mapStateToProps, {inputChange})(ExamInstructionsPage);