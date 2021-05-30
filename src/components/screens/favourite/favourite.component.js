import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./css/style.css";
import Box from '../../includes/dashboard/moreFavourites.component';
import { Link } from "react-router-dom";
import norecent from "../../../assets/img/norecent.png";
import {  
  populateDashboardTopTenVideos,
  populateDashboardFavouriteVideos
} from "./../../../redux/actions/courseActions";
import queryString from "query-string";

const MorePage = (props) => { 
   
  const { 
    dashboardFavouriteVideos,
    activeEnrolledCourseId,
    dashboardTopTenVideos
   } = props;
   const mounted = useRef();
  const parsed = queryString.parse(props.location.search);

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0); 
      const data = {
        enrolledCourseId: activeEnrolledCourseId,
      };      
     
      if(parsed.section === 'favourites'){
        props.populateDashboardFavouriteVideos(
          activeEnrolledCourseId ? data : null
        );
      }else{
        props.populateDashboardTopTenVideos(
          activeEnrolledCourseId ? data : null
        );
      }      
    } else {
      // do componentDidUpdate logic
    }
  });

  const favouriteList = () => {
    if (
      dashboardFavouriteVideos &&     
      dashboardFavouriteVideos.length
    ) {      
      // eslint-disable-next-line array-callback-return     
      return dashboardFavouriteVideos.map((item, index) => {
        
          return (
            <Box item= {item} favourites={true}/>
          );
      });
    } else {
      return (
        <div className="empty-class-state-2">
          <img src={norecent} /> <p>No item found</p>
        </div>
      );
    }
  };

  const topTenList = () => {
    if (
      dashboardTopTenVideos.lessons &&     
      dashboardTopTenVideos.lessons.length
    ) {      
      // eslint-disable-next-line array-callback-return
      let counter = 0;
      return dashboardTopTenVideos.lessons.map((item, index) => {  
        if(item.videoUrls.length>0 && counter<6){
          ++counter
          return (
            <Box item= {item}/>
          );     
        } 
      });
    } else {
      return (
        <div className="empty-class-state-2">
          <img src={norecent} /> <p>No top ten videos</p>
        </div>
      );
    }
  };

  
 
  return (    
      <div id="morePage" className="bg-black">
        <div className="negative-margin"></div>     
          <div class="container mt-10 bg-black">
            <div class="title">
              <h1>{parsed.section === 'favourites'? 'My Faves ':'Top Ten Lessons'}</h1>   
              {parsed.section === 'favourites'? <h5>{dashboardFavouriteVideos? dashboardFavouriteVideos.length: '0'} Favourite(s)</h5> :''} 
            </div>  
            <div className="row row1">
              {parsed.section === 'favourites'? favouriteList() : topTenList()}
            </div>            
          </div>  
      </div>  
  );
};

const mapStateToProps = (state) => ({
  dashboardFavouriteVideos: state.course.dashboardFavouriteVideos,
  activeEnrolledCourseId: state.auth.activeEnrolledCourseId,
  dashboardTopTenVideos: state.course.dashboardTopTenVideos
});
export default connect(mapStateToProps, { populateDashboardTopTenVideos,  populateDashboardFavouriteVideos})(MorePage);
