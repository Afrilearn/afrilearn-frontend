import React from "react";
import Slider from "react-slick";
import Box from './appreciationBox.component';

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
          <Box/>
          <Box/>
          <Box/>
      </Slider>
    );
  }
}
export default SimpleSlider;