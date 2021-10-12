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
            content="I got an A+ in my test! I love your comprehensive and accurate curriculum. Thanks a lot!"
            name="Isabella"
            dClass="JSS 3"
          />
          <Box 
            content="Learning is easier with Afrilearn. I really love this class, you guys are amazing 😘😘😘😘😘😘😘😘😘"
            name="Omoigho Blessing"
            dClass="JSS 2"
          />
          <Box 
            content="Since I began using Afrilearn to teach my Basic Science classes a few months ago, some of my students who used to score 25% now score over 75%. It’s been extremely exciting for them and for me. I love this new easy way of teaching"
            name="Mr. Idris Lawal"
            dClass="Teacher, Kano, Nigeria"
          />
          <Box 
            content="I always had issues with Economic but after discovering Afrilearn, my class performance and confidence literarily skyrocketed."
            name="Chika Nduka"
            dClass="SS1 Student, Ogun, Nigeria"
          />
          <Box 
            content="Wow amazing site, I love it! It was such a wonderful class!"
            name="Alli Zinatalai"
            dClass="SSS 3"
          />
          <Box 
            content="I’ve finally found a website full of information and details. Afrilearn is so perfect."
            name="Ugwu Favour"
            dClass="JSS 2"
          />
          <Box 
            content="Brilliant, thoughtful and highly emphatic work you teachers are doing here. Nigeria’s education system will get better with this. God bless you real good!"
            name="Folu Odugbesan"
            dClass="SSS 2"
          />              
          <Box 
            content="I just used Afrilearn to teach some English classes yesterday, after one of my students told me about it. The arrangement is seamless and the content quality is super."
            name="James Oluwole"
            dClass="Teacher"
          />   
          <Box 
            content="I love learning here already. Such brilliant platform! Thank you so much, Afrilearn Team!"
            name="Mayowa Adeola"
            dClass="JSS 1"
          />      
          <Box 
            content="Nice lesson notes I must confess. I love the simplicity of the lessons and pictures used for illustration."
            name="Hycent Ugbede"
            dClass="JSS 1"
          />      
          <Box 
            content="I love this class so much. The quizzes are lovely and have helped me gain better understanding of History"
            name="Oluwabunmi Oyebade"
            dClass="SSS 1"
          />  
          <Box 
            content="Since I discovered this platform, I’ve found it easy to access all my favorite subjects"
            name="Polite"
            dClass="SSS 2"
          />      
          <Box 
            content="I really enjoyed this class. I loved every bit of it and can’t wait for the next class."
            name="Kiara Joseph"
            dClass="SSS 3"
          />  
          <Box 
            content="You really made a thorough research and presented the learning materials in a meaningful manner. Great job!"
            name="Adewumi Johnson"
            dClass="JSS 3"
          />   
          <Box 
            content="The site is very good, helps me with my notes and assignments."
            name="Michelle Braide"
            dClass="SSS 1"
          />    
          <Box 
            content="I’ve finally found a website that is full of information and details. Afrilearn is so perfect."
            name="Ugwu Favour"
            dClass="JSS 3"
          />  
          <Box 
            content="I love your scheme and your teachings. Thanks!"
            name="Amandi Chinwendu"
            dClass="SSS 1"
          />   
          <Box 
            content="This helped a lot with my children’s assignment THANKS A MILLION!!!!"
            name="Ariana Reins"
            dClass="Parent"
          />    
           <Box 
            content="Lovely! This was exactly how it was taught in schools today, keep up the good work."
            name="Grace"
            dClass="JSS 3"
          />  
          <Box 
            content="This is the best teaching site ever. Kudos to the management!"
            name="Emmanuel"
            dClass="JSS 3"
          />   
          <Box 
            content="I really like this web ever since I started using it, I now find things much easier for me"
            name="Bella Ivy"
            dClass="SSS 2"
          /> 
          <Box 
            content="Wow. This site is great, thanks so much! You really saved me a lot of stress. I’ve been looking for a way to beat this topic down for my students. I’m so grateful. Keep it up"
            name="Aminat Abdulraheem"
            dClass="JSS 2"
          />    

      </Slider>
    );
  }
}
export default SimpleSlider;