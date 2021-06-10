import React from "react";
import ReactTimeAgo from 'react-time-ago';
import dummy from "../../../assets/img/profile.svg";

const Box = (props) => {  
  return (
    <div className="row push push4">            
      <div className="col-2 paddingRightOff">
        <img src={props.reply.userId && props.reply.userId.profilePhotoUrl?props.reply.userId.profilePhotoUrl:dummy} alt="profile" className="profilePix1"/>
      </div> 
      <div className="col-10  relative">
        <div className="row nameSection">
            <div className="col-6">
              {props.reply.userId && props.reply.userId.fullName?props.reply.userId.fullName:'Anonymous'}
            </div>
            <div className="col-6">
              {props.reply.createdAt? <ReactTimeAgo date={props.reply.createdAt} locale='en-US' timeStyle="twitter" />:'Not Known'}
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
              {props.reply.text}
            </div>                       
        </div>                                                         
      </div>  
    </div>
 );
};

export default Box;
