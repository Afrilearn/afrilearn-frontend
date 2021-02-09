import React, { useEffect, useRef } from "react";
import "./css/style.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faMicrophone
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ClassNote = (props) => {

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);    
    } else {
      // do componentDidUpdate logic
    }
  });

  return (
    <span>
      <div id="classNoteFirstSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-12">
            <h1>Geometrical Construction: Angles</h1>
          </div>
        </div>        
      </div>
      <div id="classNoteSecondSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-5">
            <Link><span className="backArrow"> <img src={require('../../../assets/img/back-arrow.png')} alt="back button"/> &nbsp; Go back to Lesson</span></Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link><FontAwesomeIcon icon={faThumbsUp} color="white" size="lg"/></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link><FontAwesomeIcon icon={faMicrophone} color="white" size="lg" /></Link>
          </div>
          <div className="col-md-7"></div>
        </div>
        <div className="row">
          <div className="col-md-12 title">
            Geometrical Construction:  Angles
          </div>
          <div className="col-md-12">
            <p className="content">"Construction" in Geometry "Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!"Construction" in Geometry means to draw shapes, angles or lines accurately. These constructions use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved! use only compass, straightedge (i.e. ruler) and a pencil.straightedge. This is the "pure" form of geometric construction: no numbers involved!</p>
          </div>
        </div>
      </div>
    </span>
  );
};

const mapStateToProps = (state) => ({
  course: state.course.course 
});

export default connect(mapStateToProps, null)(ClassNote);
