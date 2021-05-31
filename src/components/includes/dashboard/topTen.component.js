import React, { useState } from "react";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Arrow from '../../../assets/img/play-button-arrowhead 1.png';
import Picture1 from '../../../assets/img/Group 2323.png';
import Picture2 from '../../../assets/img/Group 2324.png';
import Picture3 from '../../../assets/img/Group 2327.png';
import Picture4 from '../../../assets/img/Group 2328.png';
import Classnote from '../../../assets/img/classnote.png';
import ReactPlayer from "react-player/lazy";
import { connect } from "react-redux";
import parse from "html-react-parser";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Box = (props) => { 
  const [modal, setModal] = useState(false);
  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
  }
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  let linkToVideotLesson;
  const rndInt = Math.floor(Math.random() * 3)  

  if(props.item.videoUrls && props.item.videoUrls.length){
    linkToVideotLesson = `/content/${slugify(props.item.courseId.name)}/${slugify(
      props.item.subjectId.mainSubjectId.name
    )}/${slugify(props.item.title)}/${
     props.item.videoUrls[0]._id
    }?courseId=${props.item.courseId.id}&subjectId=${
      props.item.subjectId.id
    }&lessonId=${props.item.id}&videoId=${
      props.item.videoUrls[0]._id
    }&termId=${props.item.termId}`;
  }else{
    linkToVideotLesson = `/classnote/${slugify(props.item.courseId.name)}/${slugify(
      props.item.subjectId.mainSubjectId.name
    )}/${slugify(props.item.title)}?courseId=${
      props.item.courseId.id
    }&subjectId=${props.item.subjectId.id}&lessonId=${
      props.item.id
    }&termId=${props.item.termId}`;
  }

  return (
    <>
    <div className="col-md-2 topTen">
      <Link onClick={props.homepage? toggle : ''} to={props.homepage? '' : linkToVideotLesson}>
        <img src={!props.item.videoUrls || !props.item.videoUrls.length? Classnote : rndInt===0?Picture1:rndInt===1?Picture2:rndInt===2?Picture3:Picture4} className="fullWidth"/>
        {props.homepage? 
        <small> <span className="courseName">{props.item.courseId.name}</span>&nbsp;&nbsp;<span>{props.item.subjectId.mainSubjectId.name.length >19? props.item.subjectId.mainSubjectId.name.substr(0,16)+'...' :props.item.subjectId.mainSubjectId.name}</span></small>
        :
        <small>{props.item.subjectId.mainSubjectId.name}</small>
        }     
        <p>{props.item && props.item.title? (props.item.title.length >40? props.item.title.substr(0,37).toProperCase()+'...' :props.item.title.toProperCase()):'unknown'}</p>        
      </Link>
    </div>
    <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
      <ModalHeader toggle={toggle}>{props.item.title}</ModalHeader>
      <ModalBody>     
        {props.item.videoUrls && props.item.videoUrls.length?
          <ReactPlayer
            className="react-player"
            // onStart={
            //   storeUnFinishedVideo
            // }
            // Disable download button
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
            // Disable right click
            onContextMenu={(e) => e.preventDefault()}             
            url={props.item.videoUrls && props.item.videoUrls.length? props.item.videoUrls[0].videoUrl:''}
            controls="true"
            width="100%"
            height="auto"
            // muted={true}
            playing={true}
          />: props.item.content? parse(props.item.content):''
        }     
      
      </ModalBody>
      {!props.isAuthenticated? 
       <ModalFooter>
         <Button color="primary"> <Link to="/register">Register for Free</Link></Button>         
       </ModalFooter>
     :''}
   </Modal>
   </>
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, null)(Box);