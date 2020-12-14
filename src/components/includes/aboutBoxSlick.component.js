import React from "react";
import Slider from "react-slick";

class SimpleSlider extends React.Component { 
  render() {
    var settings = {
      dots: true,
      autoplay:true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
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
           <img className="groupPhoto" src={require('../../assets/img/WhatsApp Image 2020-11-04 at 11.03.50 AM.jpeg')} alt="company pix"/> 
           <img className="groupPhoto" src={require('../../assets/img/vicky.PNG')} alt="company pix"/>   
           <img className="groupPhoto" src={require('../../assets/img/WhatsApp Image 2020-11-04 at 11.03.33 AM.jpeg')} alt="company pix"/> 
     </Slider>
    );
  }
}
export default SimpleSlider;