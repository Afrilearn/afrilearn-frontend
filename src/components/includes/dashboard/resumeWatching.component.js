import React from "react";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Arrow from '../../../assets/img/play-button-arrowhead 1.png';
import Picture1 from '../../../assets/img/Group 2323.png';
import Picture2 from '../../../assets/img/Group 2324.png';
import Picture3 from '../../../assets/img/Group 2327.png';
import Picture4 from '../../../assets/img/Group 2328.png';

const Box = (props) => { 
  const rndInt = Math.floor(Math.random() * 3)  
  const linkToVideotLesson = `/content/${slugify(props.item.courseId.name)}/${slugify(
    props.item.subjectId.mainSubjectId.name
  )}/${slugify(props.item.lessonId.title)}/${
   props.item.lessonId.videoUrls[0]._id
  }?courseId=${props.item.courseId.id}&subjectId=${
    props.item.subjectId.id
  }&lessonId=${props.item.lessonId.id}&videoId=${
  props.item.lessonId.videoUrls[0]._id
  }&termId=${props.item.termId}`;
  return (
    <div className="col-md-2 topTen">
      <Link to={linkToVideotLesson}>
      <img src={rndInt===0?Picture1:rndInt===1?Picture2:rndInt===2?Picture3:Picture4} className="fullWidth"/>
      <small>{props.item.subjectId.mainSubjectId.name}</small>
      <p>{props.item && props.item.lessonId? (props.item.lessonId.title.length >40? props.item.lessonId.title.substr(0,37)+'...' :props.item.lessonId.title):'unknown'}</p>
      {/* <small>Lesson {+props.item.videoPosition + 1}</small> */}
      {/* <span className="mySpan"> <img src={Arrow}/>&nbsp;&nbsp; Continue Watching</span> */}
      </Link>
    </div>
  )
};

export default Box;
