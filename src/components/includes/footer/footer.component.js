import React  from "react";
import { Link } from "react-router-dom";
import "./css/style.css";


const Footer = props => { 
	return (		
        <span id="footer">
            <div className='container-fluid'>
                <div className="row r1">
                    <div className="col-md-4">
                        <h6>Why Afrilearn?</h6>
                        <p className="p1">Afrilearn actively leverages a network of high-quality teachers, animators, and developers to provide affordable, world-class education for Africans, anywhere.</p>
                    </div>
                    <div className="col-md-2 partTwo">
                        <h6>About</h6>
                        <ul>
                            <li><Link>Blog</Link></li>
                            <li><Link>Media</Link></li>
                            <li><a href="/contact#career">Careers</a></li>
                            <li><a href="/about#team">Our Team</a></li>
                            <li><Link>Community</Link></li>
                            <li><Link to="/partnership">Partnership</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 partThree">
                        <h6>Contact</h6>
                        <ul>
                            <li><img className="logo1" src={require('../../../assets/img/Email.svg')} alt='Logo'/> &nbsp;&nbsp;hello@myafrilearn.com</li>
                            <li className="num"><img className="logo2" src={require('../../../assets/img/Phone_Call.png')} alt='Logo'/>+ 234 802 785 5262<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + 234 805 154 4949</li>   
                            <li><img className="logo1" src={require('../../../assets/img/Location PIN.svg')} alt='Logo'/> &nbsp;&nbsp;6 Gbemisola Street,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Allen Avenue, Ikeja,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lagos, Nigeria.</li>                      
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h6>Key Stats</h6>
                        <p>Registered Students</p>
                        <p className="p2">9,306</p>

                        <p>Registered Teachers</p>
                        <p className="p2">1,546</p>

                        <p>Avg. Pass Rate</p>
                        <p className="p2">87%</p>                       
                    </div>
                </div>
                <div className="row r2">
                    <div className="col-md-3">
                        <img className="logo" src={require('../../../assets/img/logo1.png')} alt='Logo'/>
                    </div>
                    <div className="col-md-5 listP">
                        <ul>
                            <li><Link to="/privacy_policy">Privacy Policy</Link></li>
                            <li><Link to="/privacy_policy">Copyright</Link></li>   
                            <li><Link to="/privacy_policy">Terms of Service</Link></li>                      
                        </ul>
                    </div>
                    <div className="col-md-4 listP1 floatRight right">
                        <ul>
                            <li><a href="https://web.facebook.com/myAfrilearn" target="_blank"  rel="noopener noreferrer"><img className="logo5" src={require('../../../assets/img/Facebook1.svg')} alt='Logo'/></a></li>
                            <li><a href="https://twitter.com/Afrilearn" target="_blank"  rel="noopener noreferrer"><img className="logo5" src={require('../../../assets/img/Twitter.svg')} alt='Logo'/></a></li>  
                            <li><a href="https://www.instagram.com/afrilearn/" target="_blank"  rel="noopener noreferrer"><img className="logo5" src={require('../../../assets/img/Instagram.svg')} alt='Logo'/></a></li>       
                            <li><a href="https://www.youtube.com/channel/UC_BnnokJom1DWipMl0oSxWA" target="_blank"  rel="noopener noreferrer"><img className="logo5" src={require('../../../assets/img/Youtube.svg')} alt='Logo'/></a></li>                  
                        </ul>
                    </div>
                </div>
            </div>  
        </span>       
	);
};


export default Footer;