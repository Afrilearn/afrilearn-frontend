import React from "react";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Picture1 from '../../../assets/img/Group 2323.png';
import Picture2 from '../../../assets/img/Group 2324.png';
import Picture3 from '../../../assets/img/Group 2327.png';
import Picture4 from '../../../assets/img/Group 2328.png';
import Classnote from '../../../assets/img/classnote.png';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {  
  removeFavouriteVideos 
} from "./../../../redux/actions/subjectActions";
import {  
  inputChange 
} from "./../../../redux/actions/courseActions";

const Box = (props) => { 
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const handleDelete = () =>{    
    const data = {
      userId:props.userId,
      courseId:props.item.courseId.id,
      subjectId:props.item.subjectId.id,
      lessonId:props.item.lessonId.id,
      termId:props.item.termId,
      videoId:props.item.videoId,
      videoPosition:props.item.videoPosition  
    }
   
    props.removeFavouriteVideos(data) 
    
  }
  const rndInt = Math.floor(Math.random() * 3) 
  let linkToVideotLesson;
  if(props.favourites){    
    linkToVideotLesson = `/content/${slugify(props.item.courseId.name)}/${slugify(
      props.item.subjectId.mainSubjectId.name
    )}/${slugify(props.item.lessonId.title)}/${
     props.item.videoId
    }?courseId=${props.item.courseId.id}&subjectId=${
      props.item.subjectId.id
    }&lessonId=${props.item.lessonId.id}&videoId=${
      props.item.videoId
    }&termId=${props.item.termId}`;
  }else{
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
  }  
 
  return (
    <div className="col-md-3 topTen">
      <Link to={linkToVideotLesson}>
        <img src={props.item.videoUrls && !props.item.videoUrls.length? Classnote : rndInt===0?Picture1:rndInt===1?Picture2:rndInt===2?Picture3:Picture4} className="fullWidth"/>
        <small>{props.item.subjectId.mainSubjectId.name}</small>
        {props.favourites? 
          <>
            <p>{props.item && props.item.lessonId? (props.item.lessonId.title.length >40? props.item.lessonId.title.substr(0,37)+'...' :props.item.lessonId.title):'unknown'}</p>
            <Link onClick={handleDelete}><h6>Remove</h6></Link>
          </> 
        : <p>{props.item && props.item.title? (props.item.title.length >40? props.item.title.substr(0,37).toProperCase()+'...' :props.item.title.toProperCase()):'unknown'}</p> 
        }
      </Link>      
    </div>   
  )
};

Box.propTypes = {  
  removeFavouriteVideos: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({ 
  userId:state.auth.userId,
  dashboardFavouriteVideos: state.course.dashboardFavouriteVideos, 
});

export default connect(mapStateToProps, {
  removeFavouriteVideos,
  inputChange  
})(Box);

