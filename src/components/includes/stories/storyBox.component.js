import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import ReactPlayer from "react-player/lazy";

const Box = props => {	
    const {story} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => {
       setModal(!modal);
    }
	return (
        <>	      
        <div className="col-md-3">
            {story.fileURL.indexOf('.png') ===-1 && story.fileURL.indexOf('.jpg') ===-1 && story.fileURL.indexOf('.jpeg') ===-1? 
            <ReactPlayer
             className="react-player"            
             config={{ file: { attributes: { controlsList: "nodownload" } } }}
             // Disable right click
             onContextMenu={(e) => e.preventDefault()}             
             url={story.fileURL}
             controls="true"
             width="100%"
             height="200px"
             // muted={true}
             playing={false}           
           />
            :
             <img src={story.fileURL} alt={story.title} className="fullWidth"  onClick={()=>toggle()}/> 
            }
           
           
            <span  onClick={()=>toggle()}>
                    <h5>{story.title.length >20? story.title.substr(0,17)+'...' :story.title}</h5>
                    <p>{story.description.length >100? story.description.substr(0,87)+'...' :story.description}</p>
                    <p className="readMore"><Link><b>Read More</b></Link></p>
            </span>
        </div> 
        <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
            <ModalHeader toggle={toggle}>{story.title}</ModalHeader>
            <ModalBody>  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 storyFull">
                            {story.fileURL.indexOf('.png') ===-1 && story.fileURL.indexOf('.jpg') ===-1 && story.fileURL.indexOf('.jpeg') ===-1? 
                                <ReactPlayer
                                    className="react-player"            
                                    config={{ file: { attributes: { controlsList: "nodownload" } } }}
                                    // Disable right click
                                    onContextMenu={(e) => e.preventDefault()}             
                                    url={story.fileURL}
                                    controls="false"
                                    width="100%"
                                    height="200px"
                                    // muted={true}
                                    playing={false}           
                                />
                                :
                                <img src={story.fileURL} alt={story.title} className="fullWidth articleImage"/> 
                                }                           
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 articleText">
                            {story.description}
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