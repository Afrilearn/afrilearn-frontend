import React, { useEffect, useRef, useState } from "react";
import Timer from 'react-compound-timer';
import Swal from 'sweetalert2';
import './css/style.css';
import { Link, Redirect } from "react-router-dom";
import { Progress, Modal, ModalHeader, ModalBody, CustomInput } from 'reactstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { inputChange, flagQuestion, loadExamQuestions, submitExamScore } from './../../../../../redux/actions/pastQuestionsActions';
import PropTypes from "prop-types";
import QuestionBox from '../../../../includes/exam/questionBox.component';

const Exam = props => {  
    const mounted = useRef(); 
    const [modal, setModal] = useState(false);
  
    const toggle = () => {     
        setModal(!modal); 
    }  

    const dispatch = useDispatch();
    let examInfo = '';

    useEffect(()=>{        
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);
            dispatch(loadExamQuestions(props.match.params.examId))  
            dispatch(inputChange('examId',props.match.params.examId))             
        } else {
            // do componentDidUpdate logic  
                             
          } 	       
    })      
    const {
        selectedSubject,
        selectedYear,
        selectedCategory,
        submittedAnswers,
        questions,
        currentQuestion,
        progressBarStatus,
        progressBarUnit,
        questionTags,
        questionTime,     
        isAuthenticated,
        speedRange1,
        speedRange2,
        speedRange3,
        report1,
        report2,
        report3,
        report4,
        report5,
        report6,
        report7, 
        subjectTag,
        pastQuestionRedirect,
        pastQuestionRedirectLocation,   
        examType   
    }=props;     
    
    const questionList = () => {            
        if(questions.length){                          
            return <QuestionBox            
                        QuestionNo={currentQuestion+1}
                        QuestionTitle={questions[currentQuestion].question}
                        options={questions[currentQuestion].options}  
                        imagePosition ={questions[currentQuestion].question_position}   
                        image= {questions[currentQuestion].question_image} 
                        questionType ={questions[currentQuestion].type}
                        handleReport ={handleFlagQuestion}               
                    />              
            
        }else{
           return <h5>0ops!, No Question found</h5>
        }
		
    }

    const handleRenavigation = async questionNumber => {
        props.inputChange('currentQuestion', questionNumber); 
        let myQuestionNumber = questionNumber +1;       
        props.inputChange('progressBarStatus', myQuestionNumber * progressBarUnit);         
    };

    const questionTagsList = () => {         
        if(questionTags.length){
            return questionTags.map((item, index) => { 
                return  <div className="col-md-3">
                            <Link onClick={handleRenavigation.bind(this,index)}><span className={`status ${item ===1? 'pending' : item ===2? 'attempted': 'skipped'}`}>{index+1}</span></Link>
                        </div>                          
            })
        }else{
           return <h5>0ops!, No tag found</h5>
        }        
    }

    const handleFlagQuestion = () => {
        setModal(true)
    };

    const reportQuestion = () => {
        let questionId =  questions[currentQuestion].question_id;
        let message = `The question with id ${questionId} has the following complaints:`;
        if(report1){
          message+=' Typographical error, '
        }
        if(report2){
          message+=' Incomplete question and answer, '
        }
        if(report3){
          message+=' Images does not look quite well, '
        }
        if(report4){
          message+=' No Image, '
        }
        if(report5){
          message+=' Duplicate Options, '
        }
        if(report6){
          message+=' Wrong Answer, '
        }
        if(report7){
          message+=report7
        }
        const data = {
          message
        }
        props.flagQuestion(data)
        setModal(false)
    }; 

    const handleChange = (e) => {  
        const target = e.target;
        const name = target.id;
        const value = target.value;          
		props.inputChange(name, name === 'report1'? !report1:name === 'report2'?!report2:name === 'report3'?!report3:name === 'report4'?!report4:name === 'report5'?!report5:name === 'report6'?!report6:name === 'report7'?value:'');	
    } 

	return (        
		<>  
           {pastQuestionRedirect ? <Redirect to={pastQuestionRedirectLocation} /> : null}          
           <div className="container-fluid Examination">                
                <div className="row">  
                    <div className="col-md-2 examTypeSection">
                        <h5 className="examType">Exam Type</h5>
                        <h6 className={`${questions && questions.length && questions[currentQuestion].type === 'Objective'?'typeActive':''}`}>Objective</h6>
                        <h6 className={`${questions && questions.length && questions[currentQuestion].type === 'Theory'?'typeActive':''}`}>Theory</h6>
                    </div>       
                    <div className="col-md-10 putBorderLeft">
                        <div className="row">
                            <div className="col-md-9 partOne"> 
                                <h2 className="h12">{`${localStorage.getItem('subjectName')} ${localStorage.getItem('term')}`} </h2>
                                <div className="row myProgress push4">
                                    <div className="col-md-12">
                                        <Progress animated  color="success" value={progressBarStatus} />
                                    </div>
                                </div>
                                {questionList()}                        
                            </div>
                            <div className="col-md-3 timerSection desktopOnly">               
                                <div className="row push3">
                                        <div className="col-md-12 paddingLeftOff">
                                            <span className="headingOne timerTitle">Time Left:</span> <span className="timer">
                                            <Timer
                                                initialTime={localStorage.getItem('duration')}
                                                lastUnit="m"
                                                direction="backward"
                                                checkpoints={[
                                                    {
                                                        time: 600000,
                                                        callback: () => Swal.fire('Time Left!', 'You have 10 mins left')
                                                    }, 
                                                    {
                                                        time: speedRange3,
                                                        callback: () =>  props.inputChange('speed', speedRange3/60000)
                                                    },
                                                    {
                                                        time: speedRange2,
                                                        callback: () =>  props.inputChange('speed', speedRange2/60000)
                                                    },  
                                                    {
                                                        time: speedRange1,
                                                        callback: () =>  props.inputChange('speed', speedRange1/60000)
                                                    },                                                                            
                                                    {
                                                        time: 0,
                                                        callback: () => {
                                                            Swal.fire('Time Up!', 'Thanks for attempting the exam').then(() => {
                                                                if(isAuthenticated){
                                                                    Swal.fire(
                                                                        'Submitted!',
                                                                        'Your exam details are recorded successfully!',
                                                                        'success'
                                                                    )       
                                                                }  
                                                                props.inputChange('pastQuestionRedirectLocation', '/dashboard');
                                                                props.inputChange('pastQuestionRedirect', true);                                               
                                                                props.inputChange('currentQuestion', 0);
                                                                props.inputChange('speed', questionTime/60000);
                                                                dispatch(submitExamScore())

                                                            }) 
                                                        } 
                                                    }                                         
                                                ]}
                                            >
                                                {() => (
                                                    <React.Fragment>
                                                        <Timer.Minutes /> mins <Timer.Seconds /> sec                                        
                                                    </React.Fragment>
                                                )}
                                            </Timer>
                                                
                                            </span> 
                                        </div>
                                </div>                
                                <div className="row checkUps center">
                                    {questionTagsList()}                                                               
                                </div>
                                <div className="row push3 push2">
                                    <div className="col-md-12 paddingLeftOff op">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <span className="status attempted">&nbsp;</span>
                                                </div>  
                                                <div className="col-md-3">
                                                    Attempted
                                                </div> 
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <span className="status skipped">&nbsp;</span>
                                                </div>  
                                                <div className="col-md-3">
                                                    Skipped
                                                </div> 
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <span className="status pending">&nbsp;</span>
                                                </div>  
                                                <div className="col-md-3">
                                                    Pending
                                                </div> 
                                            </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div>
           </div>
           <Modal isOpen={modal} toggle={toggle} className="reportModalClass">               
                <ModalHeader toggle={toggle}>Report An Issue</ModalHeader>
                <ModalBody>                    
                    <div className="container-fluid forgotPassword">
                        <div className="row">
                            <div className="col-12">                                                                          
                                <div className="row">                          
                                    <div className="col-12 push333">
                                        <CustomInput type="checkbox" id="report1" label="Typographical error" checked={report1} onChange={handleChange}/>
                                    </div>   
                                    <div className="col-12 push333">
                                        <CustomInput type="checkbox" id="report2" label="Incomplete question/answer" checked={report2} onChange={handleChange}/>
                                    </div>   
                                    <div className="col-12 push333">
                                        <CustomInput type="checkbox" id="report3" label="Image does not look quite right" checked={report3} onChange={handleChange}/>
                                    </div> 
                                    <div className="col-12 push333">
                                        <CustomInput type="checkbox" id="report4" label="No image" checked={report4} onChange={handleChange}/>
                                    </div>    
                                    <div className="col-12 push333">
                                        <CustomInput type="checkbox" id="report5" label="Duplicate option(s)" checked={report5} onChange={handleChange}/>
                                    </div>
                                    <div className="col-12 push333">
                                        <CustomInput type="checkbox" id="report6" label="Wrong answer" checked={report6} onChange={handleChange}/>
                                    </div>  
                                    <div className="col-12 push333">
                                        <input placeholder="eg. Something else..." id="report7" value={report7}  onChange={handleChange}/>
                                    </div>                                           
                                </div>    
                                <div className="row relative">                          
                                    <div className="col-12">
                                        <input type="submit" value="Submit" onClick={reportQuestion}/>                               
                                    </div>                                                  
                                </div>                     
                            </div>                                
                        </div>
                    </div>     
                </ModalBody> 
            </Modal> 
        </>
	);
};

Exam.propTypes= {   
    inputChange: PropTypes.func.isRequired,  
}

const mapStateToProps = state => ({  
    selectedSubject: state.pastQuestion.selectedSubject,
    selectedYear: state.pastQuestion.selectedYear,  
    questions: state.pastQuestion.questions,
    currentQuestion: state.pastQuestion.currentQuestion,
    progressBarStatus: state.pastQuestion.progressBarStatus,
    progressBarUnit: state.pastQuestion.progressBarUnit,
    questionTags: state.pastQuestion.questionTags,
    questionTime: state.pastQuestion.questionTime,   
    isAuthenticated: state.auth.isAuthenticated,
    speedRange1: state.pastQuestion.speedRange1,
    speedRange2: state.pastQuestion.speedRange2,
    speedRange3: state.pastQuestion.speedRange3,  
    selectedCategory: state.course.selectedCategory,
    report1: state.pastQuestion.report1,
    report2: state.pastQuestion.report2,
    report3: state.pastQuestion.report3,
    report4: state.pastQuestion.report4,
    report5: state.pastQuestion.report5,
    report6: state.pastQuestion.report6,
    report7: state.pastQuestion.report7,
    subjectTag: state.pastQuestion.subjectTag,
    pastQuestionRedirect:state.pastQuestion.pastQuestionRedirect,
    pastQuestionRedirectLocation:state.pastQuestion.pastQuestionRedirectLocation,  
    examType: state.pastQuestion.examType,    
    submittedAnswers:state.pastQuestion.submittedAnswers,   
})
export default connect(mapStateToProps, {inputChange, flagQuestion})(Exam);