import React, { useEffect, useRef } from "react";
import Footer from "../../includes/footer/footer.component";
import StoryBox from "../../includes/stories/storyBox.component";
import { getRoles } from "../../../redux/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './css/style.css';
import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";

const Stories = props => {  
    const mounted = useRef(); 
    const {   
        classes     
    } = props;
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);   
            if(!classes.length){
                props.getRoles();
            }          
        } else {
            // do componentDidUpdate logic          
          } 	       
    })       
   
	return (        
		<span id="storries"> 
            <Helmet>
                <meta charSet="utf-8" />
                <title>Stories and Features | myafrilearn.com</title>
                <meta name="description" content="Stories and Features" />
            </Helmet>      
            <div id="storriesFirstSection" className="container-fluid relative">    </div>
            <div id="storriesSecondSection" className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Stories and Features</h1>
                        <p>Beyound the headlines, every child has a story</p>
                    </div>                
                </div>
            </div>
            <div id="storriesThirdSection" className="container-fluid">
                <div className="row">
                    <StoryBox/>
                    <StoryBox/>
                    <StoryBox/>
                    <StoryBox/>   
                    <StoryBox/>
                    <StoryBox/>                         
                </div>
            </div>
            {/* <div className="center"><span className="myButton"><Link>VIEW ALL STORIES</Link></span></div>  
            <div id="storriesThirdSection" className="container-fluid storriesFourthSection">  
                <h2>SpotLight: Children in Emergency</h2>              
                <div className="row">
                    <StoryBox/>
                    <StoryBox/>
                    <StoryBox/>
                    <StoryBox/>                             
                </div>                
            </div>  
            <div className="center part2"><span className="myButton"><Link>VIEW ALL STORIES</Link></span></div> 
            <div id="storriesFifthSection" className="container-fluid">
                <h2>Featured Video</h2> 
                <div className="row">
                    <div className="col-md-12 center">
                        <iframe
                            width="770"
                            title="Scale of perference"
                            height="454"
                            src="https://www.youtube.com/embed/F8XFbBiyrLc"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            ></iframe>
                            <p>Download your favorite videos to watch offline and always have
              something to learn.Download your favorite videos to watch offline and always have
              something to learn.</p>
                    </div>
                </div>
            </div>                  */}
        <Footer/>

        </span>
	);
};

Stories.propTypes = {   
    getRoles: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
    classes: state.auth.classes   
});
export default connect(mapStateToProps, { getRoles })(Stories);