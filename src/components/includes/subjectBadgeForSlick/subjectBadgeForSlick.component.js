import React from "react";
import Slider from "react-slick";
import Box from './subjectBox.component';

class SimpleSlider extends React.Component { 
  render() {
    var settings = {
      dots: true,
      autoplay:true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
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
          <Box image={require('../../../assets/img/maths.png')}/>
          <Box image={require('../../../assets/img/english.png')}/>
          <Box image={require('../../../assets/img/health.png')}/>
          <Box image={require('../../../assets/img/science.png')}/>
          <Box image={require('../../../assets/img/Civic.png')}/>
          <Box image={require('../../../assets/img/social.png')}/>
          <Box image={require('../../../assets/img/health_two.png')}/>
          <Box image={require('../../../assets/img/english_two.png')}/>        
     </Slider>
    );
  }
}
export default SimpleSlider;