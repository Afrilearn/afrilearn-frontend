import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import parse from "html-react-parser";

const Box = props => {	
    const {story,storyIndex} = props;
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
           
           <Link to={`impact-story/${storyIndex}`}>
            <span>
                <h5>{story.title.length >20? story.title.substr(0,17)+'...' :story.title}</h5>
                <p>{story.description.length >100? parse(story.description.substr(0,87)+'...') :parse(story.description)}</p>
                <small>{moment(story.createdAt).format('ll')} <small className="storyReadMore"><b>Read More</b></small></small>
                {/* <p className="readMore"><Link><b>{'>'} See the story</b></Link></p> */}
            </span>
            </Link>
        </div> 
        {/* <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
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
                            {parse(story.description)}
                        </div>
                    </div>
                </div>
            </ModalBody>            
            <ModalFooter>
                
            </ModalFooter>   
        </Modal>    */}
       </>  

    );
};
export default Box;