import React, { useEffect, useRef, useState } from "react";
import './css/style.css';
import { Link, Redirect } from "react-router-dom";
import QuestionBox from './../../../../components/includes/pastQuestions/reviewBox.component';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, CustomInput } from 'reactstrap';
import { inputChange, submitUserScore, flagQuestion  } from './../../../../redux/actions/pastQuestionsActions';
import PropTypes from "prop-types";
/*eslint-disable eqeqeq*/
const Review = props => {     
    const [modal, setModal] = useState(false);
    const toggle = () => {     
        setModal(!modal); 
    } 
    const {
        selectedSubject,
        selectedYear,    
        correctAnswers,
        questionLength,
        questions,
        currentQuestion,       
        questionTags,  
        answers,
        pastQuestionRedirect,
        pastQuestionRedirectLocation, 
        fullName,
        speed,
        report1,
        report2,
        report3,
        report4,
        report5,
        report6,
        report7,
        examType,
        lessonSubjectName  
    }=props;  

    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);  
            props.inputChange('pastQuestionRedirect', false); 
            props.inputChange('pastQuestionRedirectLocation', '/dashboard');           
            props.submitUserScore(handleGrade(false, true), Math.round((correctAnswers/questionLength) * 100));     
        } else {
            // do componentDidUpdate logic          
          } 	       
    })

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
    const questionList = () => {         
        if(questions.length){                        
            return <QuestionBox            
                        QuestionNo={currentQuestion+1}
                        QuestionTitle={questions[currentQuestion].question}
                        options={questions[currentQuestion].options}  
                        imagePosition ={questions[currentQuestion].question_position}   
                        image= {questions[currentQuestion].question_image}  
                        handleReport ={handleFlagQuestion}                   
                    />              
            
        }else{
           return <h5>0ops!, No Question found</h5>
        }
		
    }

    const questionTagsList = () => {         
        if(questionTags.length){
            return questionTags.map((item, index) => { 
                return  <div className="col-md-3">
                            <Link onClick={handleRenavigation.bind(this,index)}><span className={`status ${answers[index]=="-1" ? 'skipped' : questions[index].correct_option==answers[index]? 'attempted': 'incorrect'}`}>{index+1}</span></Link>
                        </div>                          
            })
        }else{
           return <h5>0ops!, No tag found</h5>
        }        
    }


    const handleGrade = (getEmoji=false, getDefinition=false) => {         
       let average = Math.round((correctAnswers/questionLength) * 100);
    //    let grade = 'Unknown';
       let definition = 'Unknown Comment';
       let remark = 'Unknown Remark';
       let emoji = <img src={require('./../../../../assets/img/f9.gif')} alt='logo' className="myBadge7"/>;
       
       if(average >= 75){
            // grade = 'A1'
            definition = 'Excellent'
            remark = 'Congrats, genius, that was excellent! Your Test Grade Result is A1, and we’re super proud of you. Practice more to remain ahead of the pack!'
            emoji = <img src={require('../../../../assets/img/a1.gif')} alt='logo' className="myBadge7"/>;
       }else if(average >= 70){
            // grade = 'B2'
            definition = 'Very Good'
            remark = 'Awesome! Your Test Grade Result is B2. You’re very smart and we’re rooting for you! Practice more to stay ahead of the pack!'
            emoji = <img src={require('../../../../assets/img/b2.gif')} alt='logo' className="myBadge3"/>;
       }else if(average >= 65){
            // grade = 'B3'
            definition = 'Good'
            remark = 'Great! Your Test Grade Result is B3. You did very well and can do even better, with more practice.'
            emoji = <img src={require('../../../../assets/img/b3.gif')} alt='logo' className="myBadge3"/>;
       }else if(average >= 60){
            // grade = 'C4'
            definition = 'Credit'
            remark = 'Very good! Your Test Grade Result is C4. You did well and can do much better, with more practice. '
            emoji = <img src={require('../../../../assets/img/c4.gif')} alt='logo' className="myBadge3"/>;
       }else if(average >= 55){
            // grade = 'C5'
            definition = 'Credit'
            remark = 'Good! Your Test Grade Result is C5. You did quite well and can do even better, with more practice. We believe in you.'
            emoji = <img src={require('../../../../assets/img/c5.gif')} alt='logo' className="myBadge3"/>;
       }else if(average >= 50){
            // grade = 'C6'
            definition = 'Credit'
            remark = 'Fair attempt! Your Test Grade Result is C6. You did fairly well and you can improve, with more practice. '
            emoji = <img src={require('../../../../assets/img/c6.gif')} alt='logo' className="myBadge3"/>;
       }else if(average >= 45){
            // grade = 'D7'
            definition = 'Pass'
            remark = 'Oops! Your Test Grade Result is D7. To ace your exam, please practice more. We strongly believe you can do better, with more practice.'
            emoji = <img src={require('../../../../assets/img/d7.gif')} alt='logo' className="myBadge3"/>;
       }else if(average >= 40){
            // grade = 'E8'
            definition = 'Pass'
            remark = 'Oops! Your Test Grade Result is E8. To ace your exam, please practice more. We strongly believe you can do better, with more practice. Let’s do this!'
            emoji = <img src={require('../../../../assets/img/e8.gif')} alt='logo' className="myBadge3"/>;
       }else{
            // grade = 'F9'
            definition = 'Fail'
            remark = 'Ouch! We strongly advice you study better and retake the test. We know you can do a lot better, with more practice. Yes, it is possible!'
            emoji = <img src={require('../../../../assets/img/f9.gif')} alt='logo' className="myBadge3"/>;
       }
       if(getEmoji){
           return emoji
       }
       if(getDefinition){
           return definition
       }
       return remark;
    }

    const handleRenavigation = async questionNumber => {
        props.inputChange('currentQuestion', questionNumber);
    };
   
	return (        
		<>    
           {pastQuestionRedirect ? <Redirect to={pastQuestionRedirectLocation} /> : null}         
           <div className="container-fluid Review">
                <div className="row">
                    <div className="col-md-9 partOne">
                       <div className="row">
                            <div className="col-12 nameSection">
                                Hey {fullName},
                            </div>                          
                       </div>
                       <div className="row comment">                           
                            <div className="col-2">
                              {handleGrade(true)} 
                            </div>
                            <div className="col-8 paddingLeftOff marginAdjust">
                                <span className="boldFont">{handleGrade()}</span>                              
                            </div>
                       </div>

                        <div className="row p4 mobileOnly">
                            <div className="col-12 center">
                                <span className="headingOne timerTitle">Score: <sup>{correctAnswers}</sup>/<sub>{questionLength}</sub></span> <br/>
                                <span>Pass Rate: { Math.round((correctAnswers/questionLength) * 100)}%</span><br/>
                                <span>Velocity: {speed}</span>
                            </div>                          
                       </div>
                        {questionList()}                        
                   </div>
                    <div className="col-md-3 timerSection desktopOnly">
                        <div className="row nameSection">
                            <div className="col-8">
                                { examType ==='pastQuestions'? <>  {selectedSubject}<br/> {selectedYear}</>: lessonSubjectName}
                            </div>
                            <div className="col-4 summary">
                                Key Stats
                            </div>                          
                        </div>
                        <div className="row comment1">
                            <div className="col-4">
                               <div className="row">
                                    <div className="col-6">
                                        <img src={require('../../../../assets/img/Score Rank.svg')} alt='logo' className="myBadge1"/>
                                    </div>
                                    <div className="col-6 paddingAdjust">
                                      <span className="boldFont">Score</span><br/> <sup>{correctAnswers}</sup>/<sub>{questionLength}</sub>
                                    </div>
                               </div>
                            </div>  
                            <div className="col-4">
                               <div className="row">
                                    <div className="col-6">
                                        <img src={require('../../../../assets/img/Accuracy.svg')} alt='logo' className="myBadge1"/>
                                    </div>
                                    <div className="col-6 paddingAdjust">
                                        <span className="boldFont">Accuracy</span> <br/>{ Math.round((correctAnswers/questionLength) * 100)}%
                                    </div>
                               </div>
                            </div>                           
                            <div className="col-4">
                               <div className="row">
                                    <div className="col-6">
                                        <img src={require('../../../../assets/img/Velocity.svg')} alt='logo' className="myBadge1"/>
                                    </div>
                                    <div className="col-6 paddingAdjust">
                                        <span className="boldFont">Velocity</span><br/>{speed}
                                    </div>
                               </div>
                            </div>    
                       </div>
                        <div className="row push3">
                            <div className="col-4">
                                <div className="row">
                                    <div className="col-12">
                                       <small>Correct</small> 
                                    </div>
                                    <div className="col-12 boxUp">
                                        <img src={require('../../../../assets/img/Correct Box.svg')} alt='logo' className="myBadge2"/> {correctAnswers}
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <div className="col-12">
                                        <small>Incorrect</small> 
                                    </div>
                                    <div className="col-12 boxUp">
                                        <img src={require('../../../../assets/img/Incorrect Box.svg')} alt='logo' className="myBadge2"/> {questionLength - (correctAnswers + questionTags.filter(el=> el===3).length)}
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <div className="col-12">
                                        <small>Skipped</small> 
                                    </div>
                                    <div className="col-12 boxUp">
                                        <img src={require('../../../../assets/img/Skipped Box.svg')} alt='logo' className="myBadge2"/> {questionTags.filter(el=> el===3).length }
                                    </div>                                   
                                </div>
                            </div>
                        </div>
                        <div className="row checkUps center">
                            {questionTagsList()}                                                       
                        </div>
                    </div>
                </div>
           </div>     
           <Modal isOpen={modal} toggle={toggle} className="reportModalClass">               
                <ModalHeader toggle={toggle} className="report">Report An Issue</ModalHeader>
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

Review.propTypes= {   
    inputChange: PropTypes.func.isRequired, 
    submitUserScore: PropTypes.func.isRequired 
}

const mapStateToProps = state => ({  
    selectedSubject: state.pastQuestion.selectedSubject,
    selectedYear: state.pastQuestion.selectedYear,  
    category: state.pastQuestion.category,
    questions: state.pastQuestion.questions,
    currentQuestion: state.pastQuestion.currentQuestion,   
    questionTags: state.pastQuestion.questionTags, 
    correctAnswers: state.pastQuestion.correctAnswers,
    questionLength: state.pastQuestion.questionLength,  
    answers: state.pastQuestion.answers,
    pastQuestionRedirect:state.pastQuestion.pastQuestionRedirect,
    pastQuestionRedirectLocation:state.pastQuestion.pastQuestionRedirectLocation,   
    fullName: state.auth.fullName,
    speed: state.pastQuestion.speed,
    report1: state.pastQuestion.report1,
    report2: state.pastQuestion.report2,
    report3: state.pastQuestion.report3,
    report4: state.pastQuestion.report4,
    report5: state.pastQuestion.report5,
    report6: state.pastQuestion.report6,
    report7: state.pastQuestion.report7,
    examType: state.pastQuestion.examType,  
    lessonSubjectName:  state.subject.lessonSubjectName
})
export default connect(mapStateToProps, {inputChange, submitUserScore, flagQuestion})(Review);