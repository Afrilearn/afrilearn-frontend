import React  from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Box = props => { 

    const subjectList = () => {
        if (props.subjects && props.subjects.length) {
          let subject = props.subjects;
          return subject.map((item) => {
            return (
                <div className="col-md-6">
                    <p>{item.name}: {item.score}%</p>
                </div>
            );
          });
        } else {
          return <h6>Performance loading...</h6>;
        }
    };

	return (		
        <>
        <div className="row push3">
            <div className="col-md-12">
                <span className={`subjectbadge ${props.performance === null? 'noRating':props.performance>70?'excellent' : props.performance<40? 'average':'belowAverage'}`}>{props.subject}</span>
            </div>
        </div>
        <div className="row subjectPerformance bottomBorder">
            <div className="col-md-4 relative">
                <CircularProgressbar 
                    value={props.performance === null? 0:props.performance}
                    text={props.performance === null? '':props.performance+'%'}
                    strokeWidth={10}
                    styles={{
                        path: {
                        // Path color
                        stroke: `${props.performance === null? '#908989':props.performance>70?'rgba(38, 170, 118, 0.6)' : props.performance<40? 'rgba(255, 91, 91, 0.41)':'rgba(253, 173, 81, 0.5)'}`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt'     
                        },   
                        // Customize the text
                        text: {
                        // Text color
                        fill: '#DEE6EA',
                        // Text size
                        fontSize: '16px',
                        }   
                    }}
                />
                <p className="title">{props.performance === null? 'No rated':props.performance>70?'EXCELLENT' : props.performance<40? 'BELOW AVERAGE':'AVERAGE'} <br/>PERFORMANCE</p>
            </div>
            <div className="col-md-4">
                <div className="row push4">
                    <div className="col-md-12">
                        <h6>SUBJECT ATTEMPTED</h6>
                        <span className="myIcon"><img src={require('../../../assets/img/info.png')} alt="correct answers"/> &nbsp; {props.subjectAttempted}</span>
                    </div>
                </div>               
            </div>
            <div className="col-md-4">
                <div className="row push4">
                    <div className="col-md-12">
                        <h6>AVG. TIME/SUBJECT</h6>
                        <span className="myIcon"><img src={require('../../../assets/img/time.png')} alt="average time per question"/> &nbsp;{props.time}</span>
                    </div>
                </div>               
            </div>
            <div className="col-md-12">
                <div className="row push5">
                    <div className="col-md-12">
                        <h6 className="left">ACCURACY / SUBJECT</h6>
                    </div>
                </div>
                <div className="row">
                   {subjectList()} 
                </div>
            </div>
        </div>
        </>
	);
};

export default Box;