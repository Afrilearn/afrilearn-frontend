import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, CustomInput } from "reactstrap";
import {subjectInputChange, reportLesson} from "../../../redux/actions/subjectActions";

const ReportBox = (props) => { 
        
    const [modal, setModal] = useState(false);
    const [report11, setModal11] = useState(true);
  
    const toggle = (e) => {   
        e.preventDefault() 
        window.scrollTo(0, 0);   
        setModal(!modal); 
    }  
    const toggle2 = () => {   
      
        setModal11(!report11); 
    }   

    const {       
        report1,
        report2,
        report3,
        report4,
        report5,
        report6,
        report7,
        subjectData      
    }=props;   
    
    const reportQuestion = () => {     
        let message = `${subjectData.courseId.name}-${subjectData.mainSubjectId.name} ${props.classnote? 'class note':'video lesson'} with title '${props.lesson.title}' has the following complaints:`;
        if(report1){
          message+=`${props.classnote? 'Typographic Error, ':'Video not clear, '}`
        }
        if(report2){
          message+=`${props.classnote? 'Images does not look quite right, ':'Spam or misleading video, '}`
        }
        if(report3){
            message+=`${props.classnote? 'Spam or misleading, ':'Video not loading, '}`
        }
        if(report4){
            message+=`${props.classnote? 'Violent or repulsive content, ':'Hateful or abusive content, '}`
        }
        if(report5){
            message+=`${props.classnote? 'Hateful or abusive content, ':'Violent or repulsive content, '}`
        }       
        if(report7){
          message+=report7
        }
        const data = {
          message
        }  
       
        props.reportLesson(data)
        setModal(false)
    }; 

    const handleChange = (e) => {  
        const target = e.target;
        const name = target.id;
        const value = target.value;          
		props.subjectInputChange(name, name === 'report1'? !report1:name === 'report2'?!report2:name === 'report3'?!report3:name === 'report4'?!report4:name === 'report5'?!report5:name === 'report6'?!report6:name === 'report7'?value:'');	
    } 
  return (
    <>
         <span><Link onClick={toggle}>Report Lesson</Link></span> 
         <Modal isOpen={modal} toggle={toggle} className="reportModalClass">               
            <ModalHeader toggle={toggle}>Report An Issue</ModalHeader>
            <ModalBody>                    
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">                                                                          
                            <div className="row">                          
                                <div className="col-12 push333">
                                    <CustomInput type="checkbox" id="report1" label={props.classnote? 'Typographic Error':'Video not clear'} checked={report1} onClick={handleChange}/>
                                </div>   
                                <div className="col-12 push333">
                                    <CustomInput type="checkbox" id="report2" label={props.classnote? 'Images does not look quite right':'Spam or misleading video'} checked={report2} onClick={handleChange}/>
                                </div>   
                                <div className="col-12 push333">
                                    <CustomInput type="checkbox" id="report3" label={props.classnote? 'Spam or misleading':'Video not loading'} checked={report3} onChange={handleChange}/>
                                </div> 
                                <div className="col-12 push333">
                                    <CustomInput type="checkbox" id="report4" label={props.classnote? 'Violent or repulsive content':'Hateful or abusive content'} checked={report4} onChange={handleChange}/>
                                </div>    
                                <div className="col-12 push333">
                                    <CustomInput type="checkbox" id="report5" label={props.classnote? 'Hateful or abusive content':'Violent or repulsive content'} checked={report5} onChange={handleChange}/>
                                </div>                               
                                <div className="col-12 push333">
                                    <input type="text" placeholder="eg. Something else..." id="report7" value={report7}  onChange={handleChange}/>
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
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  report1: state.subject.report1,
  report2: state.subject.report2,
  report3: state.subject.report3,
  report4: state.subject.report4,
  report5: state.subject.report5,
  report6: state.subject.report6,
  report7: state.subject.report7,     
  subjectData: state.subject.subject,     
});
export default connect(mapStateToProps, {subjectInputChange, reportLesson})(ReportBox);