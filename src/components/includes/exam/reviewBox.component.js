import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { inputChange } from './../../../../src/redux/actions/pastQuestionsActions';
import Swal from 'sweetalert2';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Speech from 'react-speech';
import parse from 'html-react-parser';
/*eslint-disable eqeqeq*/
const ReviewBox = props => {   
  
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
        answers,
        nextLessonLocation  
    }=props;
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
    const handlePrevious = async () => {
        if(currentQuestion > 0){
            props.inputChange('currentQuestion', currentQuestion - 1); 
        }     
    };
    const handleNextQuestion = async answer => {
        if (handleLastQuestionCheck()) {
          setTimeout(handleClosure, 1000);
        } else {
            props.inputChange('currentQuestion', currentQuestion + 1);
        }
        return true;
    };
    const handleClosure = async () => {
        Swal.fire('Thanks', 'We wish you success in your exams').then((result) => {            
            if (result.value) {
                props.inputChange('pastQuestionRedirectLocation', nextLessonLocation? nextLessonLocation:'/dashboard');
                props.inputChange('pastQuestionRedirect', true);     
                props.inputChange('pastQuestionRedirectLocation', '');  
            } 
          })
    }; 
    const sentenceCase = (str) =>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const optionList = () => {         
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
                     // eslint-disable-next-line eqeqeq  
                    return <Link key={index} onClick={handleNextQuestion.bind(this, index)}> <p className={`myQuestion relative ${ answers[currentQuestion]==index? 'categoryBadgeActive' : null}
                        `}>{symbol} &nbsp;&nbsp;&nbsp;{parse(sentenceCase(item))}   
                                          
                           {questions[currentQuestion].correct_option==index? <img src={require('../../../assets/img/Correct Box.svg')} alt='logo' className="myBadge4"/> : questions[currentQuestion].correct_option != answers[currentQuestion] && index==answers[currentQuestion]? <img src={require('../../../assets/img/Incorrect Box.svg')} alt='logo' className="myBadge4"/> : null} 
                        </p></Link>   
                }      
                          
            })
        }else{
           return <h5>0ops!, No subject found</h5>
        }
        
    }
    const handleLastQuestionCheck = () => {
        return questions.length - 1 <= currentQuestion ? true : false;
    };
	return (
       <>
        <div className="row question">
            <div className="col-md-12 blue">
                <p>Question {props.QuestionNo}</p>
                {
                   props.image && props.imagePosition ==='above'? <p className="questionImgSection"><img src={props.image} alt='logo' className="centerImage questionImg"/></p>: null
                }
                <p className="beforeOptions questionSection">{parse(props.QuestionTitle)}</p> 
                {
                   props.image && props.imagePosition !=='above'? <p className="questionImgSection"><img src={props.image} alt='logo' className="centerImage questionImg"/></p>: null
                }
                 {optionList()}                                      
            </div>
        </div>
        <div className="row blue beforeReport">
            <div className="col-5 mobilePadRightOff">
                <Link className="previous" onClick={handleClosure}>Submit</Link> <Link onClick={props.handleReport} className="myReport" title="Report Question"><FontAwesomeIcon icon={faFlag} color="#e36b6b" /></Link><Speech id="audio" text={handleTextToSpeech()} textAsButton={true} displayText={<FontAwesomeIcon icon={faMicrophone} />} />             
            </div>
            <div className="col-7 afterReport">
                { currentQuestion>0 ? <Link onClick={handlePrevious} className="previous"><span className=""><img src={require('../../../assets/img/next.svg')} alt='logo' className=""/> Previous</span> </Link> : null}   { questions.length - 1 > currentQuestion ? <Link onClick={handleNextQuestion.bind(this, -1)} className="skip"><span className=""><img src={require('../../../assets/img/skip.svg')} alt='logo' className=""/> Skip</span> </Link>:null}                                                                                          
            </div>
        </div>
       </>
	);
};
ReviewBox.propTypes= {   
    inputChange: PropTypes.func.isRequired,  
}
const mapStateToProps = state => ({   
    currentQuestion: state.pastQuestion.currentQuestion,
    questions: state.pastQuestion.questions,
    answers: state.pastQuestion.answers,
    nextLessonLocation: state.pastQuestion.nextLessonLocation,     
})
export default connect(mapStateToProps, {inputChange})(ReviewBox);