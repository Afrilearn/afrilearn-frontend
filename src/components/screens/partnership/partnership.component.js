import React, { useEffect, useRef } from "react";
import './css/style.css';
import Footer from "../../includes/footer/footer.component";
import { getRoles } from "./../../../redux/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Partnership = props => {  
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
		<span id="partnership">   
            <div id="partnershipFirstSection" className="container-fluid relative">
                <div className="overlay"></div>
                <div className="row">                   
                    <div className="col-md-5">               
                        <h1 className="bold">Invest in Africa’s future today!</h1>
                        <hr/><br/>
                        <h3>Together, let's transform Africa's education sector forever.</h3>                    
                    </div>  
                    <div className="col-md-7"> 
                       
                     </div>          
                </div>        
            </div>
            <div id="partnershipSecondSection" className="container-fluid">                  
                <div className="row">
                    <div className="col-md-7">
                        <span className="box">
                            <h1>Partnerships</h1>
                            <p>Afrilearn actively seeks strategic partnerships with discerning federal and state governments, schools, corporates and academic institutions to deliver superior learning experiences leveraging our vast library with thousands of curriculum-relevant and richly animated video lessons, live lessons, courses, quizzes and exam practice with detailed solutions.</p>
                        </span>
                    </div> 
                    <div className="col-md-5">
                        <img src={require('../../../assets/img/migration-3129340_1280.jpg')} alt="partnership"/> 
                        <p className="box box1 rr">For partnership enquiries, please email hello@myafrilearn.com or contact [+234]  802 785 5262, [+234] 805 154  4949.</p>
                    </div>  
                </div>                    
            </div>
            <div id="partnershipSecondSection" className="container-fluid">                  
                <div className="row">
                    <div className="col-md-5">
                        <img className="second" src={require('../../../assets/img/Investor.jpg')} alt="investment"/> 
                        <p className="box box1">For Investment enquiries, please email hello@myafrilearn.com or contact [+234]  802 785 5262, [+234] 805 154  4949.</p>
                    </div>
                    <div className="col-md-7">
                        <span className="box rr2">
                            <h1>Investors</h1>
                            <p>Africa’s education system is broken and Afrilearn is the solution. To this end, Afrilearn is currently open to partnering with the right impact investors to enable swift delivery of our solution at scale. This is not just an investment in Afrilearn – it’s an investment into Africa’s future.</p>
                        </span>
                    </div>
                </div>                    
            </div>
            <div id="partnershipSecondSection" className="container-fluid">                  
                <div className="row">
                    <div className="col-md-7">
                        <span className="box">
                            <h1>Sales Reps/Agents</h1>
                            <p>On this mission to deliver the future of education and empower the African child, we need you.
                                <br/> <br/>Think about it, now that we’re making learning fun with animated video lessons, gamified exam practice, live classes and more, who will help us tell the world about these sweet offerings?
                                <br/><br/>That’s why we need audacious Sales Rep and Agents who will become Ambassadors of this life-changing product. Interested in joining our team to spread the word and grow richer? Get in touch!                           
                            </p>
                        </span>
                    </div> 
                    <div className="col-md-5">
                        <img src={require('../../../assets/img/Sales.jpg')} alt="sales rep"/> 
                        <p className="box box1">To make money as an Afrilearn Sales Rep/Agent, please email hello@myafrilearn.com or contact [+234]  802 785 5262, [+234] 805 154  4949.</p>
                    </div>  
                </div>                    
            </div>
        <Footer/>
     </span>
	);
};

Partnership.propTypes = {   
    getRoles: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
    classes: state.auth.classes   
});
export default connect(mapStateToProps, { getRoles })(Partnership);