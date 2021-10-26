import "./css/styles.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../includes/footer/footer.component";
import { getFaculty } from "../../../redux/actions/authActions";
import ProfileBox from "../../includes/faculty/profile.component";
import { getRoles } from "../../../redux/actions/authActions";
import { Link } from "react-router-dom";

export default function Faculties() {
  const faculties = useSelector((state) => state.auth.faculties);
  const classes = useSelector((state) => state.auth.classes);
  
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getFaculty());  
    if(!classes.length){
     dispatch(getRoles())
    }     
  }, []);
  
  const facultyList = () =>{
    if(faculties && faculties.length){
      return faculties.map((singleItem)=>{
        return <ProfileBox item={singleItem} index={singleItem.id}/>
      })
    }
  }

  return (
    <>
    <div className="container-fluid" id="facultyPage">
        <div></div>
        <div className="row" id="facultyFirstSection">
            <div className="col-md-12">
              <h1 className="heading-text">Meet our Faculty!</h1>
              <p className="p">
                Afrilearn would like to thank every individual, organization, and
                government who has dedicated their time, resources, and expertise to
                our mission of delivering quality education to Africans anywhere.
                The vast content on Afrilearn is made possible by the selfless
                commitment of our in-house team alongside our seasoned network of
                highly experienced teachers, volunteers, and partners.
              </p>
            </div>
        </div>
        <div className="row imageCollection relative" id="facultySecondSection">
            {facultyList()}  
        </div>
        <div className="row" id="facultyThirdSection">
        <br />
          <p>________________</p>
         <h3 className="green"><strong>You too can inspire Africa to love learning!</strong></h3>
           <p className="lastGuy">
           Join our network of genius tutors and content faculty to deliver quality education for Africans anywhere.<br/>To get started, simply indicate your interest <Link to='/join-the-team'><b>HERE</b></Link>.
          </p> 
        </div>
    </div>
    <Footer />
    </>  
  );
}
