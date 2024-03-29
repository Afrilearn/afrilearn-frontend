import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { inputChange, saveUserAnswer, populateSubmittedAnswer, submitExamScore } from './../../../redux/actions/pastQuestionsActions';
import Swal from 'sweetalert2';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Speech from 'react-speech';
import { Modal, ModalBody, } from 'reactstrap';
import parse from 'html-react-parser';


/*eslint-disable eqeqeq*/

const QuestionBox = props => {  
    const dispatch = useDispatch();
    const [modal1, setModal1] = useState(false);
    const [theoryAnswer, setTheoryAnswer] = useState('');
    const toggle1 = () => {     
        setModal1(!modal1); 
    } 
    
    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            
        } else {
            
            } 	       
    })   

    var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
        var element = document.createElement('div');

        function decodeHTMLEntities (str) {
            if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
            }

            return str;
        } 
    return decodeHTMLEntities;
    })();

    const {
        currentQuestion,
        questions,
        progressBarStatus,  
        progressBarUnit,
        correctAnswers, 
        isAuthenticated,
        answers,
        motivations,
        submittedAnswers,
        motivationItemNo,
        motivationInterval,
        motivateGoodPerformance, 
        examType
    }= props;   
    
    const handleNextQuestion = async answer => {  
        if(props.questionType !== 'Theory'){
            await handleCorrectAnswerCheck(answer);
            await handleSaveAnswer(answer);
        }      
      
        await prepareSubmittedAnswer(answer);
        if (handleLastQuestionCheck()) {
            handleClosure()
        } else {
            props.inputChange('currentQuestion', currentQuestion + 1);  
            props.inputChange('progressBarStatus', progressBarStatus + progressBarUnit);  
            if(props.questionType === 'Theory'){
                if(submittedAnswers[currentQuestion+1]){
                    setTheoryAnswer(submittedAnswers[currentQuestion+1].answer)
                }else{
                    setTheoryAnswer('')
                }            
            }         
        }
       
        return true;
    };

    const handleClosure = async () => {      
        Swal.fire({
            title: 'SUBMIT EXAM',
            text: "This action submit all your answers so far and signifies the end of your examination. Are you sure you want to submit?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Submit!',
            cancelButtonText: 'No, i’m not ready'
        }).then((result) => {
            if (result.value) {
                if(isAuthenticated){
                    dispatch(submitExamScore())
                    Swal.fire(
                        'Submitted!',
                        'Your exam details are been recorded.',
                        'success'
                    )       
                }
                props.inputChange('pastQuestionRedirectLocation', '/dashboard');
                props.inputChange('pastQuestionRedirect', true);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You can continue the exam :)',
                    'error'
                )
            }
        })
    };

    //handle previous
    const handlePrevious = async () => {
        if(currentQuestion > 0){
            props.inputChange('currentQuestion', currentQuestion - 1); 
            props.inputChange('progressBarStatus', progressBarStatus - progressBarUnit);          
            if(props.questionType === 'Theory'){              
                setTheoryAnswer(submittedAnswers[currentQuestion-1].answer)
            }  
        }     
    };

    const handleLastQuestionCheck = () => {
        return questions.length - 1 <= currentQuestion ? true : false;
    };

    const handleSaveAnswer = async answer => {
        props.saveUserAnswer(answer);
    };

    const prepareSubmittedAnswer = async answer => {
        let status = null;
        if(props.questionType !== 'Theory'){
            if(answer === -1){
                status='skipped'
            }else if(answer === questions[currentQuestion].correctOption){
                status='correct'
            }else{
                status='incorrect' 
            }
        }
        let response = {
            status,
            questionId:questions[currentQuestion].id,
            optionSelected:answer,
            correctOption:questions[currentQuestion].correctOption,          
            markWeight:questions[currentQuestion].markWeight,        
        }

        if(props.questionType === 'Theory'){
            response['answer'] = theoryAnswer
        }
        props.populateSubmittedAnswer(response)     
    };

    const handleCorrectAnswerCheck = async answer => {
        if (answer == questions[currentQuestion].correctOption) {
            props.inputChange('correctAnswers', correctAnswers + 1);    
        } 
    };

    const sentenceCase = (str) =>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const optionList = () => {      
        if(props.questionType === 'Theory'){
            return (
            <span className="relative">
                <textarea rows="8" cols="20" value={theoryAnswer} onChange={e=>setTheoryAnswer(e.target.value)}>

                </textarea>               
            </span>
            )
        }else{
            if(props.options.length){
                // eslint-disable-next-line array-callback-return
              return props.options.map((item, index) => {   
                  let symbol = 'A.';
                  if(index === 0){
                      symbol = 'A.'
                  }else if(index === 1){
                      symbol = 'B.' 
                  }else if(index === 2){
                      symbol = 'C.' 
                  }else if(index === 3){
                      symbol = 'D.' 
                  }else if(index === 4){
                      symbol = 'E.' 
                  }    
                  if(item){                 
                      return <Link key={index} onClick={handleNextQuestion.bind(this, index)}> <p className={answers[currentQuestion] === index ? 'myQuestion selectedOption' : 'myQuestion'} key={index}>{symbol}&nbsp;&nbsp;&nbsp; {parse(sentenceCase(item))}</p></Link>   
                  }      
                          
              })
          }else{
          return <h5>0ops!, no options found</h5>
          }      
        }      
          
    }

    const handleTextToSpeech = () => {
        let options = '';
        for (let index = 0; index < questions[currentQuestion].options.length; ++index) {
          let symbol = 'A. ';
          if(index === 0){
              symbol = 'A.  '
          }else if(index === 1){
              symbol = 'B.  ' 
          }else if(index === 2){
              symbol = 'C.  ' 
          }else if(index === 3){
              symbol = 'D.  ' 
          }else if(index === 4){
              symbol = 'E.  ' 
          }  
          if(questions[currentQuestion].options[index] !==''){
            options+=symbol+ questions[currentQuestion].options[index];
          }      
        }
        return decodeEntities(questions[currentQuestion].question)+options      
    };

    return (
    <>
        <div className="row question">
            <div className="col-md-12 blue">           
                <p>Question {props.QuestionNo}</p>
                {
                props.image && props.imagePosition ==='above'? <p className="questionImgSection"><img src={props.image} alt='logo' className="centerImage questionImg"/></p>: null
                }
                <p className="beforeOptions questionSection">{parse(props.QuestionTitle)}<small>{props.markWeight}marks</small></p> 
                {
                props.image && props.imagePosition !=='above'? <p className="questionImgSection"><img src={props.image} alt='logo' className="centerImage questionImg"/></p>: null
                }
                {optionList()}                                      
            </div>
        </div>
        <div className="row blue beforeReport">
            <div className="col-5 mobilePadOff">
              {props.questionType !== 'Theory' ?<Link className="previous gh" onClick={handleClosure}>Submit</Link>:<Link className="previous gh" onClick={handleNextQuestion.bind(this,5)}>Next</Link>}  <Link onClick={props.handleReport} className="myReport" title="Report Question"><FontAwesomeIcon icon={faFlag} color="#e36b6b" /></Link><Speech id="audio" text={handleTextToSpeech()} textAsButton={true} displayText={<FontAwesomeIcon icon={faMicrophone} />} />             
            </div>
            <div className="col-7 afterReport">
            { currentQuestion>0 ? <Link onClick={handlePrevious} className="previous"><span className="">Previous</span> </Link> : null}   { (questions.length - 1 > currentQuestion) && props.questionType !== 'Theory' ? <Link onClick={handleNextQuestion.bind(this, -1)} className="skip"><span className="">Skip</span> </Link>:null}                                                                                  
            </div>
        </div>
        {/* <div className="optionSection">
            { currentQuestion>0 ? <Link onClick={handlePrevious} className="previous3"><span className=""><img src={leftIcon} alt='logo' className="movement"/> Previous</span> </Link> : null}
            <Link onClick={handleClosure}><img src={submitButton} className="submitButton"/></Link>
            <Link onClick={props.handleReport} className="myReport" title="Report Question"><FontAwesomeIcon icon={faFlag} color="#e36b6b" /></Link>
            { questions.length - 1 > currentQuestion ? <Link onClick={handleNextQuestion.bind(this, -1)} className="skip1"><span className=""><img src={rightIcon} alt='logo' className="movement"/> Skip</span> </Link>:null} 
        </div> */}
        { examType ==='pastQuestions'? 
      
        <Modal isOpen={modal1} toggle={toggle1}>
            <ModalBody>                    
                <div className="container-fluid forgotPassword">
                    <div className="row">
                        <div className="col-12">                                                                          
                            <div className="row">                          
                                <div className="col-12 push333">
                                    <img src={motivations && motivationInterval === 0? 'https:'+motivations[motivationItemNo].section25Image : motivations && motivationInterval === 1 && motivateGoodPerformance? 'https:'+motivations[motivationItemNo].section50AccuracyImage : motivations && motivationInterval === 1? 'https:'+motivations[motivationItemNo].section50Image : 'https:'+motivations[motivationItemNo].section75Image} alt='' className="motivation"/> 
                                </div>  
                                <div className="col-12 push333 center">
                                   {motivations && motivationInterval === 0? motivations[motivationItemNo].section25Message : motivations && motivationInterval === 1 && motivateGoodPerformance? motivations[motivationItemNo].section50AccuracyMessage : motivations && motivationInterval === 1? motivations[motivationItemNo].section50Message : motivations[motivationItemNo].section75Message}
                                </div>                       
                            </div>          
                        </div>                                
                    </div>
                </div>     
            </ModalBody> 
        </Modal> 
        :''}
    
    </>
    );
};

QuestionBox.propTypes= {   
    inputChange: PropTypes.func.isRequired,  
}

const mapStateToProps = state => ({   
    currentQuestion: state.pastQuestion.currentQuestion,
    questions: state.pastQuestion.questions,
    progressBarStatus:  state.pastQuestion.progressBarStatus,  
    progressBarUnit:   state.pastQuestion.progressBarUnit,
    correctAnswers: state.pastQuestion.correctAnswers,
    isAuthenticated: state.auth.isAuthenticated,  
    answers: state.pastQuestion.answers,
    motivations:  state.pastQuestion.motivations,
    questionLength: state.pastQuestion.questionLength,
    motivationItemNo:state.pastQuestion.motivationItemNo,
    motivationInterval: state.pastQuestion.motivationInterval,
    motivateGoodPerformance: state.pastQuestion.motivateGoodPerformance,
    examType: state.pastQuestion.examType,
    submittedAnswers:state.pastQuestion.submittedAnswers,
})
export default connect(mapStateToProps, {inputChange, saveUserAnswer, populateSubmittedAnswer})(QuestionBox);