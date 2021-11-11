import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getStudentExamInformation } from '../../../../../redux/actions/examActions';
import { inputChange } from './../../../../../redux/actions/pastQuestionsActions';
import Icon1 from '../../../../../assets/img/QuestionsE.png';
import Icon2 from '../../../../../assets/img/CategoryE.png';
import Icon3 from '../../../../../assets/img/TimeE.png';

const ExamInstructionsPage = props => {  
    const mounted = useRef(); 
    const dispatch = useDispatch();
    const examinationInfo = useSelector(
        (state) => state.exam.examinationInfo
      );
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0); 
            dispatch(getStudentExamInformation(props.match.params.examId))   
            dispatch(inputChange('pastQuestionRedirect',false))                 
        } else {
            // do componentDidUpdate logic          
          } 	       
    })  
      
	return (        
		<> 
        <div className="container-fluid examInstructions">
            <div className="row">
                <div className="col-md-2">

                </div>
                <div className="col-md-10 putBorderLeft">
                   <h2 className="headingOne center">{`${examinationInfo?.subjectId?.mainSubjectId.name} ${examinationInfo?.termId?.name}`}</h2> 
                   <div className="row" id="examInstruction2">                
                        <div className="col-md-12">
                            <img src={require('../../../../../assets/img/animation_500_kvum0mlt.gif')}  className="examLogo" alt="exam-pictures"/>                                 
                        </div>
                    </div>
                    <div className="row" id="examInstruction3">
                        <div className="col-md-6">
                            <span><img src={Icon1} alt="total number of exam questions"/>QUESTIONS: {examinationInfo?.questionsCount}</span>
                        </div>                        
                        <div className="col-md-6 right">
                            <span><img src={Icon3} alt="total number of exam questions"/>TIME: {examinationInfo?.duration}Mins</span>
                        </div>
                        <div className="col-md-8 rr">
                            <span><img src={Icon2} alt="total number of exam questions"/>QUESTION TYPE: {examinationInfo?.questionTypeId?.name}</span>
                        </div>
                    </div>           
                    <hr/>
                    <div className="row" id="examInstruction4">
                        <div className="col-md-3">
                            <p>
                                Instruction: 
                            </p>
                        </div>
                        <div className="col-md-9">
                            No pressure! Take your time to answer the questions.<br className="desktopOnly"/> 
                            Goodluck
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" classname="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="row" id="examInstruction5">
                        <div className="col-md-12 center">
                            <Link to={`/take-exam/${props.match.params.examId}`}>LET’S GO</Link>
                        </div>                
                    </div>
                </div>
            </div>
           
        </div>     
        </>
	);
};

export default ExamInstructionsPage;