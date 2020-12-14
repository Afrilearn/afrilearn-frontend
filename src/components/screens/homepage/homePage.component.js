import React, { useEffect, useRef } from "react";
import Typed from 'react-typed';
import CountDown from 'reactjs-countdown';
import './css/style.css';

const Homepage = props => {  
    const mounted = useRef(); 
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);            
        } else {
            // do componentDidUpdate logic          
          } 	       
    })       
   
	return (        
		<span id="homepage">       
            <div className="container-fluid bannerSection">
                    <div className="overlay"></div>
                    <img className="banner desktopOnly" src={require('../../../assets/img/sample.jpg')} alt="homepage banner"/> 
                    <img className="banner mobileOnly" src={require('../../../assets/img/sample.jpg')} alt="homepage banner"/> 
                    <div className="row">
                        <div className="col-md-3">   </div>
                        <div className="col-md-6 box">
                            <h1>Welcome to the future<br/> of fun learning.</h1>
                            <h3 className="center">
                                <Typed
                                    strings={[
                                        'Afrilearn is on a mission to provide affordable, world-class education for Africans, anywhere.',
                                        "Because every child deserves a chance to quality education.",
                                        'Afrilearn is on a mission to provide affordable, world-class education for Africans, anywhere.',
                                        'Because every child deserves a chance to quality education.'
                                    ]}
                                        typeSpeed={60}
                                        backSpeed={50}                                  
                                        loop >                             
                                </Typed>
                            </h3>  
                            <div className="row">                                
                                <div className="col-md-12">
                                    <h5 className="center">Interested? Enter your email and we’ll keep you in the loop!</h5>
                                    <div className="row">
                                        <div className="col-8 paddingRightOff">
                                            <input type="email" placeholder="Email Address"/> 
                                        </div>
                                        <div className="col-4 paddingLeftOff">
                                            <input type="submit" value="GET STARTED"/>
                                        </div>
                                    </div>                                
                                </div>                     
                            </div>
                        </div>
                        <div className="col-md-3"> </div>
                    </div>              
                </div>
            <div className="container-fluid afterBanner">
                <div className="row">
                    <div className="col-md-6">
                        <h1>We’re pregnant!</h1>
                        <h3>It’s a revolutionary education product.<span className="timer"><CountDown deadline="February 24, 2021"/> </span> </h3>
                    </div>
                    <div className="col-md-6">
                        <img className="bigThing floatRight" src={require('../../../assets/img/We are pregnant.jpg')} alt="Next big thing"/> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <iframe width="456" title="Scale of perference" height="266" src="https://www.youtube.com/embed/F8XFbBiyrLc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="col-md-6 shiftVideo">
                        <h1>Enjoy unlimited video lessons!</h1>
                        <h3>Download your favorite videos to watch offline and always have something to learn.</h3>
                    </div>                   
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h1>Gamified experience with rewards.</h1>
                        <h3>Fun exam practice to ace WAEC, JAMB, NECO and more like a pro!</h3>
                    </div>
                    <div className="col-md-6">
                        <img className="bigThing floatRight" src={require('../../../assets/img/Gamified experience with rewards.jpg')} alt="Next big thing"/> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <img className="bigThing other" src={require('../../../assets/img/27920-thanks-message.gif')} alt="Personalised learning."/> 
                    </div>
                    <div className="col-md-6">
                        <h1>Personalised learning.</h1>
                        <h3>Understand how you learn best, where to focus, and practice at your own pace.</h3>
                    </div>                   
                </div>
                <div className="row">
                    <div className="col-md-6">                  
                        <h1>Learn on any device.</h1>
                        <h3>Anywhere, everywhere. Cancel anytime.</h3>
                    </div>
                    <div className="col-md-6">
                        <img className="bigThing floatRight" src={require('../../../assets/img/Enjoy unlimited video lessons(1).jpg')} alt="Learn on any device."/> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <a href="https://classnotes.ng/" target="_blank" rel="noopener noreferrer"> <img className="bigThing classnote" src={require('../../../assets/img/classnote.png')} alt="Experience Afrilearn's ClassNotes.ng!"/> </a>
                    </div>
                    <div className="col-md-6">
                        <a href="https://classnotes.ng/" target="_blank" rel="noopener noreferrer">
                            <h1>Experience Afrilearn's ClassNotes.ng!</h1>
                            <h3>Join thousands of high-flyers to enjoy complete Primary & Secondary education online at ₦499 only.</h3>
                        </a>
                    </div>                   
                </div>               
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                       <h5 className="center">Interested? Enter your email and we’ll keep you in the loop!</h5>
                       <div className="row">
                            <div className="col-8 paddingRightOff">
                             <input type="email" placeholder="Email Address"/> 
                            </div>
                            <div className="col-4 paddingLeftOff">
                             <input type="submit" value="GET STARTED"/>
                            </div>
                       </div>                     
                    </div>                  
                    <div className="col-md-2"></div>                                  
                </div>
            </div>
        </span>
	);
};

export default Homepage;