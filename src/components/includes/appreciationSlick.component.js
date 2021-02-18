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
          <Box 
            content="Wow this website is amazing I love it , thanks to the group of people that created it .I was such a wonderful class / website"
            name="Alli Zinatalai"
            dClass="SS3"
          />
          <Box 
            content="I’ve finally found a website that is full of information and details. Class note is so perfect."
            name="Ugwu favour"
            dClass="JSS2"
          />
          <Box 
            content="God bless you for this excellent innovation, it is handy and will go a long way to help carry out adequate revision. Very grateful for this. Thank you very much"
            name="Fidelis Umunadi"
            dClass="JSS3"
          />   
          <Box 
            content="Brilliant, thoughtful and highly emphatic work you teachers are doing here. Nigeria’s education system will get better with this. God bless you real good!"
            name="Folu Odugbesan"
            dClass=""
          />      
          <Box 
            content="I just used ClassNotes to teach some English classes yesterday, for the first time, after one of my students told me about it. The arrangement is seamless and the content quality is super. And all for free?! I just can’t wait for your guys to populate other classes. Very brilliant work you guys are doing. Please accept my deep, sincere appreciation!"
            name="James Oluwole"
            dClass=""
          />   
          <Box 
            content="Brilliant, thoughtful and highly emphatic work you teachers are doing here. Nigeria’s education system will get better with this. God bless you real good!"
            name="Folu Odugbesan"
            dClass=""
          />      
          <Box 
            content="Amazing designs and content. I love learning here already. Such billiant platform! Thank you so much, ClassNotes Team!!!"
            name="Mayowa Adeola"
            dClass=""
          />   
          <Box 
            content="Wow this is a very good educational site."
            name="Oluwaseun Akano"
            dClass=""
          />      
          <Box 
            content="I really appreciate u teachers and everyone. God bless all of you. Thank u."
            name="Akinyemi ifeoluwa"
            dClass=""
          />  
          <Box 
            content="This is wow very interesting I will love to follow up with you"
            name="Bankkysam"
            dClass="JSS1"
          />      
          <Box 
            content="Am stakeholders in educational sector .Have through these E -note it is commendable."
            name="Adedeji Olubunmi"
            dClass="JSS2"
          />   

      </Slider>
    );
  }
}
export default SimpleSlider;