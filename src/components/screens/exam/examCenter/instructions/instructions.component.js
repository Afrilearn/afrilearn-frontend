import React, { useEffect, useRef } from "react";
import './css/style.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getStudentExamInformation } from '../../../../../redux/actions/examActions';
import { inputChange } from './../../../../../redux/actions/pastQuestionsActions';
import Icon1 from '../../../../../assets/img/questionsE.svg';
import Icon2 from '../../../../../assets/img/Category.svg';
import Icon3 from '../../../../../assets/img/TimeE.svg';

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
                <div className="col-md-12">
                   <h2 className="headingOne center">{`${examinationInfo?.subjectId?.mainSubjectId.name} ${examinationInfo?.termId?.name}`}</h2> 
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
                    <span><img src={Icon2} alt="total number of exam questions"/> QUESTION TYPE: {examinationInfo?.questionTypeId?.name}</span>
                </div>
                <div className="col-md-6 rr">
                    <span><img src={Icon3} alt="total number of exam questions"/>TIME: {examinationInfo?.duration}Mins</span>
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
                   <Link to={`/take-exam/${props.match.params.examId}`}>LET’S GO</Link>
                </div>                
            </div>
        </div>     
        </>
	);
};

export default ExamInstructionsPage;