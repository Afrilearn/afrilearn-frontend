import React from "react";
import moment from 'moment';
import { Link } from "react-router-dom";

const Box = (props) => {
  const {item} = props;

  let expiredStatus = false;

  if(item.deadline){
    expiredStatus = moment(item.deadline).diff()>1?false:true;
  }

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  return (
    <div className="row">
      <div className="col-md-4">
        <h5>{item.title}</h5>
        {!props.taken? item.deadline? <small>Deadline: { moment(item.deadline).format("LL")}</small> :'':''}                       
      </div>
      <div className="col-md-2 center pushUp">
        {!props.taken?<> Duration: {item.duration}mins</>:moment(item.result?.createdAt).format("LL")}
      </div>
      <div className="col-md-4 center pushUp" className={`col-md-4 center ${!props.taken?'pushUp':item.result.status ==='marked'?'green':'orange'}`}>
        {!props.taken? item.questionTypeId?.name:item.result?.status.toProperCase()}
      </div>
      <div className="col-md-2">
        {!props.taken?<Link to={`${expiredStatus?'': `/exam/instructions/${item.id}`} `}>{expiredStatus?'EXPIRED':'START EXAM'}</Link>:item.result.status ==='marked'?`${item.result.score} out of ${item.result.total}`:'---'}
      </div>
    </div>  
  );
};

export default Box;
