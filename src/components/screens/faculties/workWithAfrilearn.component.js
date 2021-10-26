import "./css/styles.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../../redux/actions/authActions";
import Footer from "../../includes/footer/footer.component";

export default function WorkWithAfrilearn() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.auth.classes);

  useEffect(() => {
    window.scrollTo(0, 0); 
    if(!classes.length){
      dispatch(getRoles())
     }     
  }, []);

  return (
    <>
    <div className="container-fluid" id="facultyPage">
        <div></div>
        <div className="row" id="facultyFirstSection">
            <div className="col-md-12">
              <h1 className="heading-text">Join the Afrilearn Team!</h1>
              <h3 className="heading-text"> Make a global impact by teaching and empowering people around the world.</h3>
              <p className="p">
             

              If you are a Teacher, Animator, or Developer and you want to reach millions of students every year, simply send us a request here.
              </p>
            </div>
        </div>
        <div className="row relative" id="facultySecondSection">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeYK6O8pQzqnnaTZXx8LLNAeVvDpgjMjhM1T0_yxlSZoUntvQ/viewform" height='1900px' title="Join Afrilearn"></iframe>          
        </div>        
    </div>
    <Footer />
    </>  
  );
}
