import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./css/style.css";
import Box from '../../includes/dashboard/moreFavourites.component';
import { Link } from "react-router-dom";
import norecent from "../../../assets/img/norecent.png";

const MorePage = (props) => {

  const { 
    dashboardFavouriteVideos
   } = props;
  
   const favouriteList = () => {
    if (
      dashboardFavouriteVideos.favouriteVideos &&     
      dashboardFavouriteVideos.favouriteVideos.length
    ) {      
      // eslint-disable-next-line array-callback-return     
      return dashboardFavouriteVideos.favouriteVideos.map((item, index) => {
        
          return (
            <Box item= {item}/>
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
      <div id="morePage" className="bg-black">
        <div className="negative-margin"></div>     
          <div class="container mt-10 bg-black">
            <div class="title">
              <h1>My Faves </h1>   
              <h5>{ dashboardFavouriteVideos.favouriteVideos? dashboardFavouriteVideos.favouriteVideos.length: '0'} Favourite(s)</h5>          
            </div>  
            <div className="row row1">
              {favouriteList()}
            </div>            
          </div>  
      </div>  
  );
};

const mapStateToProps = (state) => ({
  dashboardFavouriteVideos: state.course.dashboardFavouriteVideos,
});
export default connect(mapStateToProps, null)(MorePage);
