import React from "react";
import Slider from "react-slick";

class SimpleSlider extends React.Component { 
  render() {
    var settings = {
      dots: true,
      autoplay:true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
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
           <img src={require('../../assets/img/us-chambers-2016-legislative-scorecard-released-united-states-chamber-of-commerce-png-900_900 (1).png')} alt="us-chambers-2016-legislative-scorecard"/> 
           <img src={require('../../assets/img/kingdom-nl-cropped(1).png')} alt="Kindgom of Netherlands"/> 
           <img src={require('../../assets/img/Fate Foundation(1).png')} alt="Fate Foundation"/> 
           <img src={require('../../assets/img/download.png')} alt="Orange Corners"/> 
           <img src={require('../../assets/img/African Union Logo.jpg')} alt="African Union Logo"/> 
           <img src={require('../../assets/img/Friends of prof.png')} alt="Friends of prof"/> 
           <img src={require('../../assets/img/UK Nigeria tech hub logo.jpg')} alt="UK Nigeria tech hub logo"/> 
           <img src={require('../../assets/img/us-chambers-2016-legislative-scorecard-released-united-states-chamber-of-commerce-png-900_900 (1).png')} alt="us-chambers-2016-legislative-scorecard"/> 
           <img src={require('../../assets/img/kingdom-nl-cropped(1).png')} alt="Kindgom of Netherlands"/> 
           <img src={require('../../assets/img/Fate Foundation(1).png')} alt="Fate Foundation"/> 
           <img src={require('../../assets/img/download.png')} alt="Orange Corners"/> 
           <img src={require('../../assets/img/African Union Logo.jpg')} alt="African Union Logo"/> 
           <img src={require('../../assets/img/Friends of prof.png')} alt="Friends of prof"/>
           <img src={require('../../assets/img/UK Nigeria tech hub logo.jpg')} alt="UK Nigeria tech hub logo"/>
           <img src={require('../../assets/img/act.png')} alt="Aspire coronation trust foundation"/>          
      </Slider>
    );
  }
}
export default SimpleSlider;