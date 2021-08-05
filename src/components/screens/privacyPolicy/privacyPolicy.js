import React from "react";
import "./css/style.css";


const PrivacyPolicy = () => { 
  return (
    <span>  
      <div id="classNoteFirstSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-12">
            <h1>Welcome to the Afrilearn's Privacy Notice (“Notice”).</h1>
          </div>
        </div>
      </div>
      <div id="classNoteSecondSection" className="container-fluid relative">
        <div className="row">
          <div className="col-md-12 title">
            {/* {lesson? lesson.title:'Hi'} */}
          </div>
          <div className="col-md-12">
            <p className="content">
              We, at Afrilearn are sharing with you how we collect, use and share your personal data because we care deeply about you and your data.<br/><br/>

                This Privacy Policy (“Privacy Policy”) details the personal data Afrilearn, (“Afrilearn”, “we”, “us” or “our”) receives about you, how we process it and your rights and obligations in relation to your personal data. Afrilearn, a product of Afrilearn International Limited registered in 2019 with Corporate Affairs Commission, Nigeria, is the data controller for the purposes of the General Data Protection Regulation (“GDPR”) and any relevant local legislation (“Data Protection Laws”).<br/><br/>

                By using or accessing the Service, you agree to the terms of this Privacy Policy. Capitalized terms not defined here have the meanings set forth in the terms and conditions (the “Terms and Conditions”), located at www.myAfrilearn.com/terms. We may update our Privacy Policy to reflect changes to our information practices. If we do this and the changes are material, we will post a notice that we have made changes to this Privacy Policy on the Website for at least 7 days before the changes are made, and we will indicate the date these terms were last revised at the bottom of the Privacy Policy. Any revisions to this Privacy Policy will become effective at the end of that 7-day period.<br/><br/>

                If you are an employee, worker or contractor of Afrilearn, the information about how we handle your personal information is available in the Afrilearn internal knowledge base. With respect to employees based in Europe, we are committed to cooperating with EU data protection authorities (DPAs) and comply with the advice given by such authorities with regard to human resources data transferred from the EU in the context of the employment relationship.<br/><br/>

                Information We Collect<br/>
                This Privacy Policy explains how we collect, use and share your personal data.<br/><br/>

                Information You Provide<br/>
                Through the registration process, you will provide us with your name, e-mail address (or parent’s e-mail address), and age or date of birth. You will also provide us with your payment transaction information if you choose to pay for Afrilearn services.

                Activity Data<br/>
                When you use the Service, you will submit information and content to your profile. We will also generate data about your use of our Services including your engagement in educational activities on the Service, or your sending of messages and otherwise transmitting information to other users (“Activity Data”). We also collect technical data about how you interact with our Services; for more information, see Cookies.<br/><br/>

                When you use Afrilearnin our app or on our website, we use a service named FullStory to log your activity. This provides us with a set of data and a session replay of your activity on Afrilearn in the form of a video. FullSory captures and analyzes your usage data to help us make your Afrilearn experience better.
            </p>
          </div>
        </div>        
      </div>
    </span>
  );
};

export default PrivacyPolicy;
