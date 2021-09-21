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
           <a href="https://bit.ly/3jmYuW9" target="_blank" rel="noopener noreferrer"><img className="pressLogo" src={require('../../assets/img/The Nation 1.png')} alt="The Nations"/></a>                                 
           <a href="https://bit.ly/2Se6A7s" target="_blank" rel="noopener noreferrer"><img className="pressLogo" src={require('../../assets/img/Thisday logo 1.jpg')} alt="ThisDay"/></a>                                     
           <a href="https://bit.ly/34fQ907" target="_blank" rel="noopener noreferrer"> <img className="pressLogo" src={require('../../assets/img/guidian.png')} alt="Guardian"/> </a>                                  
           <a href="https://bit.ly/2SgWvqs" target="_blank" rel="noopener noreferrer"><img className="pressLogo" src={require('../../assets/img/BusinessdayLogo 1.png')} alt="Business Day"/> </a>   

            <a href="https://bit.ly/3mvjTyF" target="_blank" rel="noopener noreferrer"><img className="pressLogo" src={require('../../assets/img/United_States_Chamber_of_Commerce_logo.svg.png')} alt="United_States_Chamber_of_Commerce_logo.svg"/></a>                                 
           <a href="https://bit.ly/2SSyObT" target="_blank" rel="noopener noreferrer"><img className="pressLogo" src={require('../../assets/img/tech cabal.png')} alt="tech cabal"/></a>                                     
           <a href="https://ventureburn.com/2021/05/future-of-work-africa-2021-accelerator-participants-announced/" target="_blank" rel="noopener noreferrer"> <img className="pressLogo" src={require('../../assets/img/ventureburn-final.jpg')} alt="ventureburn-final"/> </a>                                  
           <a href="https://www.globalcitizen.org/en/content/nigeria-schools-covid-19-internet-isaac-oladipupo/" target="_blank" rel="noopener noreferrer"><img className="pressLogo" src={require('../../assets/img/gc-logo-no-space.935935601661.png')} alt="gc-logo-no-space.935935601661"/> </a>                                                                 
      </Slider>
    );
  }
}
export default SimpleSlider;