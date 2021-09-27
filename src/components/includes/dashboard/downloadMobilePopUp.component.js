import React from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import bullet from "../../../assets/img/circleBullet.png";
import logo from "../../../assets/img/logonew.png";

const Box = (props) => { 
  return (
    <Modal isOpen={props.visible} toggle={props.toggleVisible} className="trendingModalClass">
        <ModalHeader toggle={props.toggleVisible}>
            <img src={logo} alt="downloadMobileHeader" className="downloadMobileHeader"/>
        </ModalHeader>
        <ModalBody>        
            <div className="container downloadMobile">
            <div className="row">
                <div className="col-md-12 head1">
                Download the Afrilearn Mobile App to enjoy more fun features:
                </div>               
            </div>
            <div className="row">
                <div className="col-md-2"></div>               
                <div className="col-md-8">
                <div className="row myRow">
                    <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet"/>
                    </div>
                    <div className="col-11">
                    <span>Game-learning challenge with friends to win weekly cash prizes</span>
                    </div>
                </div>       
                <div className="row myRow">
                    <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet"/>
                    </div>
                    <div className="col-11">
                    <span>Full access to curriculum-based videos, class notes & practice tests</span>
                    </div>
                </div>       
                <div className="row myRow">
                    <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet"/>
                    </div>
                    <div className="col-11">
                    <span>Pass WAEC, JAMB-UTME, NECO, BECE & more in one sitting</span>
                    </div>
                </div> 
                <div className="row myRow">
                    <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet"/>
                    </div>
                    <div className="col-11">
                    <span>Get online Homework Help with instant solutions from expert tutors</span>
                    </div>
                </div> 
                <div className="row myRow">
                    <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet"/>
                    </div>
                    <div className="col-11">
                    <span>Discover your areas of strength with real-time analytics tools</span>
                    </div>
                </div> 
                <div className="row myRow">
                    <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet"/>
                    </div>
                    <div className="col-11">
                    <span>Secure university admission and achieve unlimited success in life</span>
                    </div>
                </div> 
                <div className="row myRow">
                    <div className="col-md-12">
                    <span className="myRow1">Download the App for free to start winning now!</span>
                    </div>                    
                </div> 
                <div className="row myRow">
                    <div className="col-6">
                    <a
                        href="https://play.google.com/store/apps/details?id=com.afrilearn"
                        target="_blank"
                    >
                        <img
                        className=""
                        src={require("../../../assets/img/playstore.png")}
                        alt="playstore"
                        />
                    </a>
                    </div>    
                    <div className="col-6">
                    <a> <img
                        className=""
                        src={require("../../../assets/img/applestore.png")}
                        alt="applestore"
                        />
                    </a>
                    </div>                    
                </div>                                
                </div>
                <div className="col-md-2"></div>
            </div>
            </div>         
        </ModalBody>     
        <ModalFooter>
            <Button color="primary"> <Link onClick={props.toggleVisible}>Close</Link></Button>         
        </ModalFooter>
    </Modal>
  );
};

export default Box;
