import React, { useEffect, useRef, useState } from "react";
import Footer from "../../includes/footer/footer.component";
import { getRoles } from "../../../redux/actions/authActions";
import { getUserStories } from "../../../redux/actions/userStoriesActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './css/style.css';
import {Helmet} from "react-helmet";
import parse from "html-react-parser";
import ReactPlayer from "react-player/lazy";
import moment from "moment";

const Stories = props => {  
    const [userStoryNumber, setUserStoryNumber] = useState(0)
    const mounted = useRef(); 
    const {   
        classes,
        userStories     
    } = props;
    useEffect(()=>{
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            window.scrollTo(0, 0);   
            if(!classes.length){
                props.getRoles();
            } 
            if(!userStories.length){
                props.getUserStories() 
            } 
            const {
                match: { params },        
              } = props;   
              setUserStoryNumber(params.storyId)                  
        } else {
            // do componentDidUpdate logic          
          } 	       
    })      
	return (        
		<span id="storries"> 
            <Helmet>
                <meta charSet="utf-8" />
                <title>Impact Stories & Features | myafrilearn.com</title>
                <meta name="description" content="Stories and Features" />
            </Helmet>   
            {userStories.length? 
             <div className="container-fluid storyFull storyViewSingle">
                <div className="row">                    
                    <div className="col-md-12 userStoriesFull">
                        {userStories[userStoryNumber].fileURL.indexOf('.png') ===-1 && userStories[userStoryNumber].fileURL.indexOf('.jpg') ===-1 && userStories[userStoryNumber].fileURL.indexOf('.jpeg') ===-1? 
                            <ReactPlayer
                                className="react-player"            
                                config={{ file: { attributes: { controlsList: "nodownload" } } }}
                                // Disable right click
                                onContextMenu={(e) => e.preventDefault()}             
                                url={userStories[userStoryNumber].fileURL}
                                controls="false"
                                width="100%"
                                height="200px"
                                // muted={true}
                                playing={false}           
                            />
                            :
                            <img src={userStories[userStoryNumber].fileURL} alt={userStories[userStoryNumber].title} className="fullWidth articleImage"/> 
                            }                           
                    </div>
                </div>
                <h2 className="storyViewSingleTitle">{userStories[userStoryNumber].title}</h2>
                <small>{moment(userStories[userStoryNumber].createdAt).format('ll')}</small>
                <div className="row">
                    <div className="col-md-12 articleText">
                        {parse(userStories[userStoryNumber].description)}
                    </div>
                </div>
            </div> 
            :''}   
              
            <Footer/>
        </span>
	);
};

Stories.propTypes = {   
    getRoles: PropTypes.func.isRequired,
    getUserStories: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
    classes: state.auth.classes,
    userStories:state.userStory.userStories   
});
export default connect(mapStateToProps, { getRoles, getUserStories })(Stories);