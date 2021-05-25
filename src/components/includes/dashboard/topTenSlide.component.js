import React from "react";
import Slider from "react-slick";
import TopTen from './topTen.component';
import { connect } from "react-redux";

const SimpleSlider = props => { 
    const {
        dashboardUnFinishedVideos 
    } = props;
    const topTenList = () => {
        if (
          dashboardUnFinishedVideos.unFinishedVideos &&     
          dashboardUnFinishedVideos.unFinishedVideos.length
        ) {      
          // eslint-disable-next-line array-callback-return
          return dashboardUnFinishedVideos.unFinishedVideos.map((item, index) => {      
            return (
              <TopTen item= {item}/>
            );        
          });
        } else {
        //   return (
        //     <div className="empty-class-state-2">
        //       <img src={norecent} /> <p>No Top Ten Videos</p>
        //     </div>
        //   );
        }
      };
    const settings = {
      dots: false,
      autoplay:false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }       
      ]
    };
    return (
      <Slider {...settings}> 
          {topTenList()}
      </Slider>
    );
  
}

const mapStateToProps = (state) => ({ 
    dashboardUnFinishedVideos:state.course.dashboardUnFinishedVideos
});

export default connect(mapStateToProps, null)(SimpleSlider);