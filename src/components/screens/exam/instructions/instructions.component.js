import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { inputChange } from '../../../../redux/actions/pastQuestionsActions';

const InstructionsPage = props => {  
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
        <div className="container-fluid Instructions">
            <div className="row">
                <div className="col-md-12">
                   <h4 className="headingOne">{examType === 'quiz'? quizTitle: <>{selectedCategory} {selectedSubject} {selectedYear}</>}</h4> 
                </div>
            </div>
            <div className="row">                
                <div className="col-md-12">
                    <div className="row kk">
                        <div className="col-md-8">                           
                            <div className="row  front">
                            {examType === 'quiz'?
                                <div className="col-md-12">
                                    <h5 className="white">Hello {fullName}! You have taken the right step</h5>
                                </div>
                                :
                                <>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-2">
                                            <img src={require('../../../../assets/img/qicon.png')}  className="icon" alt="question number"/>
                                        </div> 
                                        <div className="col-9 title paddingLeftOff"> 
                                            QUESTIONS: {questionLength}
                                        </div>                                           
                                    </div>                                      
                                </div>
                                <div className="col-5">
                                    <div className="row floatRight">
                                        <div className="col-2">
                                            <img src={require('../../../../assets/img/clockicon.png')}  className="icon" alt="question number"/>
                                        </div> 
                                        <div className="col-9 title title2">
                                          &nbsp;&nbsp;&nbsp;&nbsp;{questionTime/60000}Mins
                                        </div>                                           
                                    </div>                                       
                                </div>
                                </>
                            }
                            </div>
                            {examType === 'quiz'? 
                                <>
                                    <div className="row push push9">
                                        <div className="col-md-2">
                                        Subject:
                                        </div>
                                        <div className="col-md-9">
                                            <span className="subjectName">{lessonSubjectName}</span>
                                        </div>
                                    </div>
                                    <div className="row push push9">
                                        <div className="col-md-2">
                                        Instructions:
                                        </div>
                                        <div className="col-md-9">
                                            <p>You are about to take a 10 question quiz to test how much you understand {quizTitle}.<br/><br/> No pressure! Take your time to answer the questions. Goodluck</p>
                                        </div>
                                    </div>
                                </> 
                            : 
                                <>
                                    <div className="row">
                                        <div className="col-12 before">
                                            Before You Start
                                        </div>
                                    </div>
                                    <div className="row push">
                                        <div className="col-1">
                                            <img src={require('../../../../assets/img/greenBullet.png')}  className="bullet" alt="bullet"/>
                                        </div>
                                        <div className="col-10">
                                            You are about to practice official questions set for {selectedCategory}.
                                        </div>
                                    </div>
                                    <div className="row push">
                                        <div className="col-1">
                                            <img src={require('../../../../assets/img/greenBullet.png')}  className="bullet" alt="bullet"/>
                                        </div>
                                        <div className="col-10">
                                            At the end of your exam practice, you can tap on review to view correct answers and solutions.
                                        </div>
                                    </div>
                                    <div className="row push">
                                        <div className="col-1">
                                            <img src={require('../../../../assets/img/greenBullet.png')}  className="bullet" alt="bullet"/>
                                        </div>
                                        <div className="col-10">
                                            Your results won’t be displayed without your permission.
                                        </div>
                                    </div>
                                    <div className="row push">
                                        <div className="col-1">
                                            <img src={require('../../../../assets/img/greenBullet.png')}  className="bullet" alt="bullet"/>
                                        </div>
                                        <div className="col-10">
                                            To begin your exam practice, simply tap the  START button.
                                        </div>
                                    </div>
                                    <div className="row push ready">
                                        <div className="col-1">    </div>
                                        <div className="col-10">
                                            You’ve got this, and we wish you the very best!
                                        </div>
                                    </div>
                                </>
                            }
                        </div> 
                        <div className="col-md-4">
                            <img src={require('../../../../assets/img/animation_500_kiim5z30.gif')}  className="takeOff" alt="take off"/>
                        </div>                          
                    </div> 
                    <div className="row push2">
                        <div className="col-12">
                            <Link to="/past-questions/exam" className="submit">Get Started</Link>
                        </div>
                    </div>                      
                </div>
            </div>
        </div>     
        </>
	);
};

InstructionsPage.propTypes= {   
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
export default connect(mapStateToProps, {inputChange})(InstructionsPage);