import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Box = props => {	
    const [modal, setModal] = useState(false);
    const toggle = () => {
       setModal(!modal);
    }
	return (
        <>	      
        <div className="col-md-3" onClick={()=>toggle()}>
            <img src={require('../../../assets/img/migration-3129340_1280.jpg')} alt="partnership" className="fullWidth"/> 
            <span>
                    <h5>Getting comfortable affordable covid-19 test kit</h5>
                    <p>The attribute aria-expanded is not supported by the role textbox. This role is implicit on the elemen</p>
                    <p className="readMore"><Link><b>Read More</b></Link></p>
            </span>
        </div> 
        <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
            <ModalHeader toggle={toggle}>Getting comfortable affordable covid-19 test kit</ModalHeader>
            <ModalBody>  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <img src={require('../../../assets/img/migration-3129340_1280.jpg')} alt="partnership" className="fullWidth articleImage"/> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 articleText">
                        The attribute aria-expanded is not supported by the role textbox. This role is implicit on the element The attribute aria-expanded is not supported by the role textbox. This role is implicit on the elemenThe attribute aria-expanded is not supported by the role textbox. This role is implicit on the elemen              
                        </div>
                    </div>
                </div>    
                 
            </ModalBody>            
            <ModalFooter>
                
            </ModalFooter>   
        </Modal>   
       </>  

    );
};
export default Box;