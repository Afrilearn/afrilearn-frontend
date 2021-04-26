import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHandshake, faSmile, faAward, faBomb, faUser, faTrophy,faEdit, faRocket  } from '@fortawesome/free-solid-svg-icons';
import ValueBox from './../../includes/valueBox.component';
import TeamBox from './../../includes/team.component';
import PictureBox from './../../includes/aboutBoxSlick.component';
import BannerPictureBox from './../../includes/aboutBannerSlick.component';
import Footer from "../../includes/footer/footer.component";
import { getRoles } from "./../../../redux/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './css/style.css';

const About = props => {  
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
		<span id="about">   
            <div id="aboutFirstSection" className="container-fluid relative">
                <div className="overlay"></div>
                <div className="row">                   
                    <div className="col-md-7">               
                        <h1 className="bold">Africa’s largest and best-loved e-learning brand.</h1>
                        <hr/><br/>
                        <h3>Delivering affordable, world-class education for Africans, anywhere.</h3>                    
                    </div>  
                    <div className="col-md-5"> 
                        <BannerPictureBox/>
                     </div>          
                </div>        
            </div>
            <div id="aboutSecondSection" className="container-fluid">
                <div className="row">
                    <div className="col-md-6 partOne">
                        <h1>About Us</h1>
                        <p>Afrilearn is an education technology corporation leveraging seasoned teachers, animators and developers to deliver affordable, world-class education for Africans, anywhere.</p>
                        <p className="slide1"> 
                            <PictureBox/>
                        </p>                       
                    </div>
                    <div className="col-md-6 partTwo">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Our Values</h1>
                            </div>
                        </div> 
                        <ValueBox image = {faSmile} title='Fun…' content='We are super deliberate about pleasure, joy, and fulfillment. On purpose, we work to deliver awesome content and experiences that make learning fun, engaging, yet highly effective.'/>  
                        <ValueBox image = {faAward} title='Excellence…' content='We habitually churn out life-changing education products with superior value and outstanding features that deliver transformative results, raising high-flying learners.'/>      
                        <ValueBox image = {faBomb} title='Disruption…' content='We passionately spearhead radical shifts in Africa’s edtech sector by creating new approaches to solve Africa’s education challenges.'/>  
                        <ValueBox image = {faUser} title='Customer Obsession…' content='We emphatically listen to customers and consumers for insights to consistently improve, enhance, and deliver the best experiences possible across the global edtech space.'/>                 
                    </div>
                </div>
            </div>
            {/* <div id="aboutThirdSection" className="container-fluid">
                <div className="row">
                    <div className="col-md-12 padOff">
                        <img className="fullWidth" src={require('../../../assets/img/gallery.png')} alt="gallery"/> 
                    </div>
                </div>
            </div> */}
            <div id="aboutFourthSection" className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="boldFont center">Our Journey</h1>
                    </div>                
                </div>
              
                <div className="row">
                    <div className="col-md-6">
                        
                    </div>
                    <div className="col-md-6 push1">
                        <div className="row">
                            <div className="col-2">
                                <FontAwesomeIcon icon={faEdit} />
                            </div>
                            <div className="col-3">
                                <h4>Apr 2019</h4>
                            </div>
                            <div className="col-7">
                                <p> We’re incorporated as Afrilearn International Limited</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">                   
                    <div className="col-md-6 push2">
                        <div className="row">
                            <div className="col-7">
                                <p>We get selected for the <a href="https://www.instagram.com/p/B_2SH21KnPH/ " target="_blank" rel="noopener noreferrer"><span className="bold">Orange Corners Business Incubation</span></a></p>
                            </div>                           
                            <div className="col-3">
                                <h4>Feb 2020</h4>
                            </div>
                            <div className="col-2">
                                <FontAwesomeIcon icon={faHandshake} />
                            </div>                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        
                    </div>
                    <div className="col-md-6 push1">
                        <div className="row">
                            <div className="col-2">
                                <FontAwesomeIcon icon={faTrophy} />
                            </div>
                            <div className="col-3">
                                <h4>Mar 2020</h4>
                            </div>
                            <div className="col-7">
                                <p>We emerge 1st of 20,200 businesses in Friends of <a href="https://www.vanguardngr.com/2020/04/friends-of-prof-100-businesses-to-get-n1m-each-to-boost-their-enterprises/" target="_blank" rel="noopener noreferrer"><span className="bold">Prof. Osinbajo SME Competition</span></a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">                   
                    <div className="col-md-6 push2">
                        <div className="row">
                            <div className="col-7">
                                <p>Our MVP <a href="https://classnotes.ng/" target="_blank" rel="noopener noreferrer"><span className="bold">ClassNotes.ng</span></a> launches, listed <a href="https://www.myjobmag.com/blog/550/top-education-blogs-in-nigeria-to-follow-in-2018" target="_blank" rel="noopener noreferrer"><span className="bold">#1 Education Platform in Nigeria</span></a></p>
                            </div>                           
                            <div className="col-3">
                                <h4>Apr 2020</h4>
                            </div>
                            <div className="col-2">
                                <FontAwesomeIcon icon={faChartLine} />
                            </div>                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        
                    </div>
                    <div className="col-md-6 push1">
                        <div className="row">
                            <div className="col-2">
                                <FontAwesomeIcon icon={faTrophy} />
                            </div>
                            <div className="col-3">
                                <h4>Jun 2020</h4>
                            </div>
                            <div className="col-7">
                                <p>We win the <a href="https://businessday.ng/news/article/orange-corners-nigeria-incubation-programme-5-start-up-entrepreneurs-emerge-winners/" target="_blank" rel="noopener noreferrer"><span className="bold">Netherland’s Business Innovation Fund</span></a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">                   
                    <div className="col-md-6 push2">
                        <div className="row">
                            <div className="col-7">
                                <p>We launch <a href="https://play.google.com/store/apps/details?id=com.exambly" target="_blank" rel="noopener noreferrer"><span className="bold">Exambly Mobile App</span></a> and <a href="https://exambly.com/" target="_blank" rel="noopener noreferrer"><span className="bold">Web</span></a> to wide adoption by private and public schools across Nigeria</p>
                            </div>                           
                            <div className="col-3">
                                <h4>Nov 2020</h4>
                            </div>
                            <div className="col-2">
                                <FontAwesomeIcon icon={faRocket} />
                            </div>                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        
                    </div>
                </div>  
                <div className="row">
                    <div className="col-md-6">
                        
                    </div>
                    <div className="col-md-6 push1">
                        <div className="row">
                            <div className="col-2">
                                <FontAwesomeIcon icon={faTrophy} />
                            </div>
                            <div className="col-3">
                                <h4>Dec 2020</h4>
                            </div>
                            <div className="col-7">
                                <p>We win the U.S. Chamber <a href="https://www.uschamber.com/press-release/us-chamber-recognizes-three-nigerian-based-startups-digital-innovation-awards-us" target="_blank" rel="noopener noreferrer"><span className="bold">Digital Innovation Award</span></a></p>
                            </div>
                        </div>
                    </div>
                </div>             
                           
            </div>
            <a href="/" name="team">&nbsp;</a>
            <div id="aboutFifthSection" className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="boldFont center">Our Leadership Team</h1>
                    </div>  
                </div>  
                <div className="row">
                    <TeamBox 
                        image={require('../../../assets/img/Isaac.jpg')}
                        name="Isaac Oladipupo"
                        position="Co-founder"
                        details="Isaac started out as the youngest Journalist at Genevieve Magazine. He was pioneer Head of New Media at global mega-church Daystar, where he led the award-winning creative team to deliver 600% digital growth. He has since served as member of the Future Awards Africa Board of Judges and was nominated a World Economic Forum Young Global Leader in 2020. Isaac holds a certificate in Online Teaching and Learning from Harvard, and a Master's degree in Public & International Affairs from the University of Lagos."
                        />
                    <TeamBox 
                        other2="true"
                        image={require('../../../assets/img/Gabriel.jpg')}
                        name="Gabriel Olatunji-Legend"
                        position="Co-founder"
                        details="From a Reporter, Gabriel grew to become a PR Executive, and then COO of BBB Media and BroadwayTV, a top media agency in Lagos. While in this position, he spearheaded the marketing campaign of some of Nigeria’s highest-grossing cinema movies in the last three years and transformed rejected brands into fans favorites. He oversees Content Development at Afrilearn. Gabriel holds a degree in Mass Communication from Covenant University."
                        />
                    
                    <TeamBox 
                        image={require('../../../assets/img/chijioke.jpg')}
                        name="Chijioke Okwuosa"
                        position="Lead, Technical"
                        details="Chijioke studied Computer Science at Nnamdi Azikiwe University and has spent time in the software industry developing cutting-edge solutions. Professionally, he started out at ECSCORP Resources where he rose to Head the IT Unit. “Tech-Evangelist” as fondly called, Chijioke has proven expertise working with web and mobile application technologies. In the last 4 years, he has built several applications ranging from School Management to Ecommerce Systems. He believes he is wired to revolutionize education across Africa. When he's not busy learning, teaching, or coding, he enjoys watching movies and soccer."
                        />
                    <TeamBox 
                        other2="true"
                        image={require('../../../assets/img/Yemisi.jpeg')}
                        name="Oluyemisi Oluwadare"
                        position="Associate, Digital Tutor"
                        details="Oluyemisi started out as a high school teacher of English Language and Literature. She strongly believes in working out the psychological and emotional factors that aid students in comprehending and excelling in their school work. She has a certificate of proficiency in the British Curriculum. She also holds a degree in English Language and a diploma in Dramatic Arts from Obafemi Awolowo University. She advocates individually-paced learning and habitually applies this in her teaching. In her free time, she enjoys listening to good music, motivating others, and social work."
                        />       
                    <TeamBox   
                        other2="true"                    
                        image={require('../../../assets/img/Segun.jpg')}
                        name="Segun Shofola"
                        position="Associate, Video Production"
                        details="A calm media professional, Segun studied Mass Communication at the Federal Polytechnic, Kwara State, Nigeria after which he enhanced his video production skills at PEFTI Film Institute. His professional journey started at DAAR Communications where he worked as Video Editor for seven years, after which he joined Masters Sports as a producer and director. Prior to joining Afrilearn, Segun has brought his wealth of experience to life with the successful delivery of ground-breaking projects like Knorr Taste Quest and Pecadomor with R2tv. He loves playing video games and hopes to tour the world’s continents someday."
                        />     
                    <TeamBox   
                        other2="true"                    
                        image={require('../../../assets/img/Feyikemi.jpg')}
                        name="Feyikemi Alaka"
                        position="Associate, Product Design & Communication"
                        details="Feyikemi holds a degree in Computer Science from the University of Ibadan. A discerning designer who believes in building user-friendly products through a design lens, Folakemi started off her career as a UI/UX Designer at Cloudware Technologies and also worked as a freelancer on various design projects. Feyikemi is a problem solver that loves working on solutions that improve people's lives and contribute to the growth of the design community. Prior to joining Afrilearn, she has designed varied products from Hospital Management System, Ecommerce to E-learning applications. Feyikemi now works on Afrilearn’s user experience, and loves pixel-nudging them until they're perfect! When she's not busy improving a design, she enjoys watching movies or taking a walk with her headset plugged in."
                        />                 
                </div>            
            </div>  
            <div id="aboutFifthSection" className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="boldFont center">Our Board</h1>
                    </div>  
                </div>  
                <div className="row">
                    <TeamBox 
                        image={require('../../../assets/img/Sunday.jpg')}
                        other1="true"
                        name="Sunday Olorunsheyi"
                        position="Co-founder, Pertinence Group"
                        details="A global business leader with over 20 years building businesses across different sectors, Sunday Olorunsheyi is Co-founder of the multi-billion Pertinence Group (owners of ABC and VIP Gardens with a team of over 3,000 staff nationwide) and CEO of Globarel Group.
                            Sunday currently seats on the board of multiple thriving businesses including Pertinence Properties Limited, HostNowNow Limited, Prodigit Consulting Limited, 1st Royal Character and Values Limited, Petfam Technical Services Nigeria Limited, PettySave Limited, DataFirst Technologies, Landshares Limited and Globarel Limited. Sunday who recently concluded his third Masters in Global Management from Salford University, United Kingdom, is also a faculty member at The African Leadership forum.
                            "/>
                    <TeamBox 
                        image={require('../../../assets/img/Adeola.jpg')}                      
                        name="Olusola Adeola"
                        // other3="true"
                        position="ED, Designing Futures"
                        details="Sola is a strategic thinker and a collector of a wide variety of skills and information with the singular focus of improving the lives of the people around her. She is a builder, working to create organizational structures and systems, and effectively deploy resources. Sola has a strong passion for education development and envisions a future in which every African child gains access to quality education that would enable them to dream, create their future, live out their best lives and reshape the future of the continent.
                             Sola has over 14 years’ work experience as a strategy and organization development consultant working across the private sector, the public sector and the development sector. She has both local and global work experience in institutions such as Accenture, the Clinton Foundation, Dalberg and ESSPIN (a UKaid Initiative in Nigeria). In the non-profit sector, Sola has pioneered in a number of fields, from a start-up political party (Kowa Party) to Nigeria’s first innovation hub as the Coordinator of the FATE Institute for Venture Design (IVD), an initiative between Stanford’s Centre for Design Research (CDR) and FATE Foundation. Sola recently worked as the Executive Secretary of Freedom Foundation and subsequently, the Head of Corporate Strategy for LAT Cleveson Group (www.latcleveson.com), a diversified conglomerate with subsidiaries in maritime, agriculture and retail.
                            Given her passion for education, Sola co-founded Designing Futures, an education platform to promote innovative solutions that would empower generations to ‘design their future’. In collaboration with Incubator Africa, she led the establishment of Imaginal Education Initiative, a network organization of Imaginal Education (www.imaginaleducation.com). She often collaborates on reform initiatives in the education sector and works as a freelance consultant. Sola has co-authored Civics Textbooks published by Kachifo Ltd, used in private primary and secondary schools in Nigeria. 
                            Sola has a Bachelor of Science in Foreign Service (BSFS) from Georgetown University and a Masters in Public Administration (MPA) from Columbia University’s School of International and Public Affairs (SIPA), focused on Education Policy. She is also a Kauffman fellow (www.kauffmanfellows.org).  
                            .
                        "/>                  
                    <TeamBox 
                        image={require('../../../assets/img/Chude.jpg')}
                        name="Chude Jideonwo"
                        position="Founder, Joy Inc."
                        details="Chude Jideonwo is Co-Founder of the media group RED, and human flourishing company Joy, Inc. Chude's work centers on storytelling from across disciplines, to inspire new, human-centered narratives about politics, markets, faith, identity, and society in Africa. He is also host of #WithChude – a network of media products across TV, radio, podcast, newsletter, and blog - telling stories that enable and strengthen the mind, the heart, and the spirit.
                            RED, one of Africa’s leading media content and consulting companies, has worked on national elections and social movements in Nigeria, Ghana, Kenya, Sierra Leone and Senegal, and Joy, Inc. has worked with organizations from the Ford Motor Company to the Lagos State Government on building safe, warm spaces across business, government and culture. All of Joy, Inc.’s profits are invested in The Joy Hubs – co-working spaces and walk-in centers for young people dealing with mental health challenges, with a focus on depression and anxiety.
                        "/> 
                    <TeamBox 
                        image={require('../../../assets/img/Akinsanmi.jpeg')}
                        name="Titi Akinsanmi"
                        position="Policy Lead, Google"
                        details="Titi Akinsanmi is a Digital Policy expert who currently serves as Policy and Government Relations Lead for West and Francophone Africa at Google.
                        With 20+ years of experience, Titi has directly engaged with global policy development processes, built capacity and strategy, and is enabling the implementation of strategies as it relates to Internet governance and the digital economy.
                        A published academic, Titi holds a certificate in English common Law from University of London, BA in English from OAU, Ile-Ife; a Masters in Public Policy from the University of Witwatersrand in South Africa; and an LLM from Osgoode Law School (specializing in Privacy and Cybersecurity). She was a Fellow at the Berkman Klein Centre for Internet and Society at Harvard from 2018 – 2020, sits on the boards of digital economy, arts and youth development-related institutions, and serves on the World Economic Forum’s Global Future Council on the Digital economy."
                        />
                    <TeamBox 
                        image={require('../../../assets/img/Mary-Akpobome.jpg')}                      
                        name="Mary Akpobome"
                        other3="true"
                        position="COO, Imperium Capital Partners Plc"
                        details="Mary Akpobome is the Chief Operating Officer of Imperium Capital Partners Plc (Formerly HBCL Investment Services Plc) a private Investments company. 

                        Prior to her appointment to Imperial Capital Plc, Mary was the Executive Director, Business Banking overseeing all Corporate, Commercial, Special Projects, Intervention Schemes, Multilaterals, Agriculture and Export Businesses of Heritage Bank. 
                        
                        A Fellow of the Institute of Credit Administrators, Mary holds an MBA from the University of Lagos and a Bachelor’s degree in Theatre Arts from the University of Benin, Edo State, Nigeria. She is an Alumnus of Lagos Business School, London Business School and INSEAD (France); Mary has attended courses at Stanford Graduate School, Harvard Business School, Kellogg Executive Education and well as IMD (Switzerland).
                        
                        In 2015, following the acquisition of Enterprise Bank Limited by Heritage Bank Plc, Mary was appointed the Acting Managing Director of Enterprise Bank Limited. Her solid experience in the management of people and resources was instrumental in stabilizing the operations of the bank, improving its service orientation and preparing it for a seamless integration with Heritage Bank Plc.
                        
                        A consummate Banker with over 30 years cognate experience and vast proficiency and skills in Credit Management, Commercial and Retail strategies, Mary began her banking career with Citizens International Bank serving in different departments before joining Platinum Bank Ltd in 2001 and rose to the position of Executive Director Designate in 2008 overseeing the Service Bank of Bank PHB.
                        
                        In 2009, Mary was part of the Executive Team of the core investor that acquired the former SocietieGenerale Bank. An astute manager of people and resources, Mary is a team leader with extensive experience in the private and public sectors.
                        
                        A member of the Institute of Directors, Chartered Institute of Bankers in Scotland and Nigeria, Mary is also the co-Founder (Founded with her husband Mr. Atunyota Ali Baba Akpobome) of The Purple Girl Foundation – a Foundation focused on providing opportunities in education for young underprivileged girls.
                        
                        "
                    /> 
                    <TeamBox 
                        image={require('../../../assets/img/Ngozi.jpg')}
                        name="Ngozi Ayanru"
                        other3="true"
                        position="Managing Partner, Realty Invest"
                        details="Mrs. Ngozi Ayanru studied Management & Accounting at the Obafemi Awolowo University. She’s a fellow of the Association of Chartered Certified Accountants, UK. She has over 20years valuable work experience including the Management Development Program in First City Monument Bank which equipped her through hands-on experience in Corporate, Consumer & Retail Banking, Treasury, International Trade and Domestic Operations. She was the assistant manager at a branch of the before moving to the Oil & Gas sector in 2002.

                        In ExxonMobil, she held several supervisory roles in various functions including Taxation, Financial Reporting, Joint Venture Management, General Ledger and Balance Sheet Management which equipped her with rich cross-functional skills and commercial experience in the industry.
                        
                        She left ExxonMobil to commence her business in 2014 and is currently the Managing Partner of Realty Invest & Trust Partners (RITP) a company that focuses on real estate investments including construction, sales & acquisitions, facility management and agency. She loves houses, traveling to new places and experiencing new things, dancing, and supporting the underserved in various ways. She has been a part of the Bethesda family for almost 10 years.
                                    
                        "/>                       
                  
                    {/* <TeamBox 
                        image={require('../../../assets/img/Isaac.jpg')}
                        name="Isaac Oladipupo"
                        position="Co-founder"
                        details="Isaac started out as the youngest Journalist at Genevieve Magazine. He was pioneer Head of New Media at global mega-church Daystar, where he led the award-winning creative team to deliver 600% digital growth. He has since served as member of the Future Awards Africa Board of Judges and was nominated a World Economic Forum Young Global Leader in 2020. Isaac holds a Masters’ degree in Public & International Affairs from the University of Lagos."
                        /> */}
                    
                </div>            
            </div>
            {/* <div id="aboutThirdSection" className="container-fluid">
                <div className="row">
                    <div className="col-md-12 padOff">
                        <img className="fullWidth" src={require('../../../assets/img/gallery.png')} alt="gallery"/> 
                    </div>
                </div>
            </div>   */}
        <Footer/>
        </span>
	);
};

About.propTypes = {   
    getRoles: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
    classes: state.auth.classes   
});
export default connect(mapStateToProps, { getRoles })(About);