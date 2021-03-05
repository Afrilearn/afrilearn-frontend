import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./css/style.css";
import Box from './../../includes/search/resultBox.component';
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import { Link } from "react-router-dom";

const SearchPage = (props) => {

  const { 
    title,
    user,
    role, 
    isAuthenticated,
    searchResultDetails
   } = props;
  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);     
    } else {
      // do componentDidUpdate logic
    }
  });
  const searchResult = () => {
    if (searchResultDetails.length>0) {
      return searchResultDetails.map((item) => {        
        if(!isAuthenticated){
          return (           
            <Tooltip
                placement="top"
                trigger={["hover"]}
                overlay={
                  <span>
                   Login/Register to view
                  </span>
                }
              >
                <Link to="/login">
                  <Box 
                    lessonId={item._id}
                    imageUrl={item.subjectId?item.subjectId.mainSubjectId.imageUrl:''}
                    title={item.title}
                    class={`${item.termId? item.termId.name :''} : ${item.courseId? item.courseId.name:''}`}
                    content={item.content}
                  />  
                </Link>
              </Tooltip>           
          );
        }else{
          if (role === "5fd08fba50964811309722d5"){
            if(user &&  user.enrolledCourses.length){
                if(user.enrolledCourses.filter(course => course.courseId._id === item.courseId._id && course.paymentIsActive ===true).length){
                  return ( 
                    <Link to={`/search/${item._id}`}>
                      <Box 
                        lessonId={item._id}
                        imageUrl={item.subjectId?item.subjectId.mainSubjectId.imageUrl:''}
                        title={item.title}
                        class={`${item.termId? item.termId.name :''} : ${item.courseId? item.courseId.name:''}`}
                        content={item.content}
                      />  
                    </Link>
                  );
                }else{
                  return (           
                    <Tooltip
                        placement="top"
                        trigger={["hover"]}
                        overlay={
                          <span>
                            Subscribe to {item.courseId.name} to unlock content
                          </span>
                        }
                      >
                        <Link to="/select-pay">
                          <Box 
                            lessonId={item._id}
                            imageUrl={item.subjectId?item.subjectId.mainSubjectId.imageUrl:''}
                            title={item.title}
                            class={`${item.termId? item.termId.name :''} : ${item.courseId? item.courseId.name:''}`}
                            content={item.content}
                          />  
                        </Link>
                      </Tooltip>           
                  );                 
                }
            }else{
              return (           
                <Tooltip
                  placement="top"
                  trigger={["hover"]}
                  overlay={
                    <span>
                      Subscribe to {item.courseId.name} to unlock content
                    </span>
                  }
                >
                  <Link to="/select-pay">
                    <Box 
                      lessonId={item._id}
                      imageUrl={item.subjectId?item.subjectId.mainSubjectId.imageUrl:''}
                      title={item.title}
                      class={`${item.termId? item.termId.name :''} : ${item.courseId? item.courseId.name:''}`}
                      content={item.content}
                    />  
                  </Link>
                </Tooltip>      
              );
            } 
          }else{
            if(user &&  user.classOwnership.length){
              if(user.classOwnership.filter(course => course.enrolledCourse._id === item.courseId._id && course.enrolledCourse.paymentIsActive ===true).length){
                return ( 
                  <Link to={`/search/${item._id}`}>
                    <Box 
                      lessonId={item._id}
                      imageUrl={item.subjectId?item.subjectId.mainSubjectId.imageUrl:''}
                      title={item.title}
                      class={`${item.termId? item.termId.name :''} : ${item.courseId? item.courseId.name:''}`}
                      content={item.content}
                    />  
                  </Link>
                );
              }else{
                return (           
                  <Tooltip
                      placement="top"
                      trigger={["hover"]}
                      overlay={
                        <span>
                          Subscribe to {item.courseId.name} to unlock content
                        </span>
                      }
                    >
                      <Link to="/select-pay">
                        <Box 
                          lessonId={item._id}
                          imageUrl={item.subjectId?item.subjectId.mainSubjectId.imageUrl:''}
                          title={item.title}
                          class={`${item.termId? item.termId.name :''} : ${item.courseId? item.courseId.name:''}`}
                          content={item.content}
                        />  
                      </Link>
                    </Tooltip>           
                );                 
              }
            }else{
              return (           
                <Tooltip
                  placement="top"
                  trigger={["hover"]}
                  overlay={
                    <span>
                      Subscribe to {item.courseId.name} to unlock content
                    </span>
                  }
                >
                  <Link to="/select-pay">
                    <Box 
                      lessonId={item._id}
                      imageUrl={item.subjectId?item.subjectId.mainSubjectId.imageUrl:''}
                      title={item.title}
                      class={`${item.termId? item.termId.name :''} : ${item.courseId? item.courseId.name:''}`}
                      content={item.content}
                    />  
                  </Link>
                </Tooltip>      
              );
            } 
          }
         
        }
          
        });
    }else{
      // return <p>No result found</p>
    }
  }
  return (    
      <div id="searchPage" className="bg-black">
        <div className="negative-margin"></div>     
          <div class="card container mt-10 bg-black">
            <div class="card-body title">
              <h1>Search Results for “{title}”</h1>
              <small>{searchResultDetails? searchResultDetails.length:null}  &nbsp;found</small>
            </div>   
            {searchResult()}   
          </div>  
      </div>  
  );
};

SearchPage.propTypes = {
  inputChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  searchResultDetails: state.search.searchResultDetails,
  title: state.search.title,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  role: state.auth.role,
});
export default connect(mapStateToProps, null)(SearchPage);
