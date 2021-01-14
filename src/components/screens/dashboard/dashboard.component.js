import React, { useEffect, useRef } from "react";
import './css/style.css';
import Box from './../../includes/subjectBadgeForSlick/subjectBox.component';
import PastQuestionsBox from '../../includes/pastQuestions/box.component';
import PerformanceBox from '../../includes/dashboard/performance.component';
import RecentActivitesBox from '../../includes/dashboard/recentActivities.component';
import ClassroomBox from '../../includes/dashboard/classroom.component';
import RecommendBox from '../../includes/dashboard/recommend.component';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from "react-router-dom";


const Dashboard = props => {  
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
		<span id="classes" className="dashboard">   
        <div id="dashboardFirstSection" className="container-fluid relative">                         
            <div className="row">
               <div className="col-md-12">
                  <h1>JSS - ONE</h1>
               </div>
            </div>
            <div className="row push2 mobileCenter">
               <div className="col-md-12">
                  <h2 className="boldFont">Welcome Feyikemi</h2>
                  <p>Explore the fun in learning</p>
               </div>               
            </div>
            <div className="row push2">
              
            </div>
            <div className="row push2 push3">
               <div className="col-md-12">
                  My Subjects &nbsp;|&nbsp; Past Questions &nbsp;|&nbsp; Performance Summary &nbsp;|&nbsp; Classroom &nbsp;|&nbsp; Recommendations &nbsp;|&nbsp; Recent Activities
               </div>              
            </div>
        </div>
        <div id="dashboardSecondSection" className="container-fluid relative">
            <h4>My Subjects</h4>
            <div className="row">                      
               <Box image={require('../../../assets/img/maths.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>
               <Box image={require('../../../assets/img/english.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>
               <Box image={require('../../../assets/img/health.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>
               <Box image={require('../../../assets/img/science.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>
               <Box image={require('../../../assets/img/Civic.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>    
               <Box image={require('../../../assets/img/science.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>      
               <Box image={require('../../../assets/img/health_two.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>
               <Box image={require('../../../assets/img/english_two.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>  
               <Box image={require('../../../assets/img/health.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>
               <Box image={require('../../../assets/img/Civic.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>
               <Box image={require('../../../assets/img/health_two.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>   
               <Box image={require('../../../assets/img/science.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>
               <Box image={require('../../../assets/img/Civic.png')} singleClass={true} dashboard={true} compiledNotes={2000} registeredUsers={50000}/>     
            </div>
            <h4 className="push5">Past Questions</h4>
            <div className="row">  
               <PastQuestionsBox title="WAEC"/>      
               <PastQuestionsBox title="NECO" other={true}/>  
               <PastQuestionsBox title="JAMB"/>
            </div>
            <h4 className="push5">Performance Summary</h4>
            <div className="row">  
               <div className="col-md-4 myChart">
                  <PieChart
                     data={[
                        { title: 'One', value: 20, color: '#FF5B5B'},
                        { title: 'Two', value: 15, color: '#FDAD51' },
                        { title: 'Three', value: 5, color: '#908989' },
                        { title: 'Four', value: 40, color: '#1B7763' },
                     ]}
                     lineWidth={32} rounded
                  />
               </div>
               <div className="col-md-8 subjectList">
                  <PerformanceBox excel={true} title="Excelling In" data={"Mathematics&nbsp;&nbsp;&nbsp;Civic&nbsp;&nbsp;&nbsp;Education&nbsp;&nbsp;&nbsp;Computer Science&nbsp;&nbsp;&nbsp;Basic Science&nbsp;&nbsp;&nbsp;Home Economics&nbsp;&nbsp;&nbsp;Social Studies&nbsp;&nbsp;&nbsp;English Language&nbsp;&nbsp;&nbsp;"}/>
                  <PerformanceBox average={true} title="Average In" data={"Business Studies&nbsp;&nbsp;&nbsp;Basic Technology"}/>
                  <PerformanceBox belowAverage={true} title="Below Average In" data={"Health Education&nbsp;&nbsp;&nbsp;Yoruba"}/>
                  <PerformanceBox noRating={true} title="No rating" data={"French"}/>
               </div>
            </div>
            <h4 className="push5">Classroom</h4>
            <div className="row push8">  
              <div className="col-md-12 right underline">
                  <Link to="/">Join A Classroom</Link>
              </div>
            </div>
            <ClassroomBox/>
            <ClassroomBox bullet2={true}/>
            <ClassroomBox/>
            <ClassroomBox bullet2={true}/>
            <h4 className="push5">Recommendations</h4>
            <RecommendBox title="Geometrical Contruction : Lines" recommend="Geometrical Contruction : Angles"/>
            <RecommendBox title="WAEC Agricultural Science" recommend="NECO Agricultural Science" pastQuestions={true}/>
            <RecommendBox title="Geometrical Contruction : Lines" recommend="Geometrical Contruction : Angles"/>
            <h4 className="push5">Recent Activities</h4>
            <RecentActivitesBox pastQuestions={true} category="Quiz" title="Trigonometric" subject="English" excel={true} time="02/02/2020"/>
            <RecentActivitesBox category="Lesson 5" title="Communication " subject="Mathematics" average={true} time="08/05/2020"/>
         </div>
    </span>
	);
};

export default Dashboard;