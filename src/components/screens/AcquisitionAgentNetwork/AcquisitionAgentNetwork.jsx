import React, { useEffect } from "react";
import "./style.css";
import Bgtwo from "../../../assets/img/Bgtwo.png";
import PhoneMockup2 from "../../../assets/img/PhoneMockup2.png";
import PhoneMockup from "../../../assets/img/PhoneMockup.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import { submitAgentEntry } from "../../../redux/actions/userStoriesActions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../includes/footer/footer.component";

export default function AcquisitionAgentNetwork() {
  const ListItem = ({ text }) => {
    return (
      <div className="d-flex mb-2">
        <div className="list-box"></div>
        <p className="medium">{text}</p>
      </div>
    );
  };
  const showWarning = (message) => {
    Swal.fire({
      html: message,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      timer: 3500,
      position: "top",
    });
  };
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const agentStoryLoading = useSelector(
    (state) => state.userStory.agentStoryLoading
  );
  const agentStoryStatus = useSelector(
    (state) => state.userStory.agentStoryStatus
  );

  useEffect(() => {
    window.scrollTo(0, 0);   
    if (agentStoryStatus === "success") {
      showWarning("Your data was submitted, we will get back to you soon.");
    }
    if (agentStoryStatus === "failed") {
      showWarning("Error submitting your data, try again.");
    }
  }, [agentStoryStatus]);

  return (
    <>
    <div id="acquisition-network">
      <div id="AgentSectionOne">
        <div className="container">
          <div className="row h-100">
            <div className="col-12 col-md-6 d-flex flex-column  align-items-start justify-content-center h-100">
              <h1>Become an Agent</h1>
              <p>
                Share in our success, change lives and achieve <br /> financial
                freedom!
              </p>
              <button
                className="green-bg"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Apply Now
              </button>
            </div>
            <div className="col-12 col-md-6 h-100"></div>
          </div>
        </div>
      </div>
      <div id="AgentSectionTwo">
        <div className="container ">
          <h1 className="light text-center mb-2 mb-md-5">THE BRIEF</h1>
          <div className="row g-2 ">
            <div className="col-12 col-md-4 ">
              <div className="white-box p-3">
                <p className="small">
                  Afrilearn provides complete world-class Primary & Secondary
                  Education online (Ages 6-18) for Best Grades and Success in
                  life. Afrilearn was launched in 2019 and currently serves
                  8000+ Students, Schools, Teachers and Parents across Nigeria
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 ">
              <div className="white-box p-3">
                <p className="small">
                  We are currently hiring ACQUISITION AGENTS to register and
                  sell premium education subscription services to Schools,
                  Families and Business owners
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 ">
              <div className="white-box p-3">
                <p className="small">
                  We are looking for individuals who are results-driven,
                  passionate about education and possess exceptional sales and
                  acquisition skills. Afrilearn is the best international edtech
                  organization to build a great career in Sales while changing
                  lives — including your own
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="AgentSectionThree">
        <div className="container ">
          <div className="row g-5">
            <div className="col-12 col-md-6">
              <div>
                <h1 className="light mb-5">JOB ROLE: WHAT YOU WILL BE DOING</h1>
                <ListItem
                  text="You will work daily on the Market to REGISTER and MANAGE Schools,
              Families and Organizations from various sectors like: Real Estate,
              Banking, Development Partners, Civil Society, etc."
                />
                <ListItem text="Your main target is to sell the multi-award-winning Afrilearn Subscription packages for Schools to boost their performance and enrollment, Families to help their children achieve Best Grades and Organizations to empower to boost their sales while empowering their staff/customers’ children for success in life." />
                <ListItem text="You will be responsible for the entire sales process from prospecting to Selling the Education Subscription packages and consistent follow-up" />
                <ListItem text="Ensuring you meet and exceed individual weekly and monthly sales targets" />
                <button
                  className="green-bg mt-2 mt-md-5"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Apply Now
                </button>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className=" h-100 d-flex align-items-center justify-content-center w-100 my-3 my-md-0">
                <img src={PhoneMockup} alt="" width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="AgentSectionThree">
        <div className="container ">
          <div className="row g-5">
            <div className="col-12 col-md-6">
              <div className=" h-100 d-flex align-items-center justify-content-center w-100 my-3 my-md-0">
                <img src={Bgtwo} alt="" width="100%" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div>
                <h1 className="light mb-5">REQUIRED QUALIFICATIONS</h1>
                <ListItem text="OND/Bachelor degree" />
                <ListItem text="Outstanding sales skills and ability to convert prospects into paying clients" />
                <ListItem text="Should have a Working Android or iOS Phone" />
                <ListItem text="Sales/Marketing Experience is an added Advantage" />
                <ListItem text="Must live in Lagos" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="AgentSectionThree">
        <div className="container ">
          <div className="row g-5">
            <div className="col-12 col-md-6">
              <div>
                <h1 className="light mb-5">WHAT WE ARE OFFERING/BENEFITS</h1>
                <ListItem text="Bestselling agents steadily get ₦100,000+ per month" />
                <ListItem text="Free Marketing Tool Kit and Training from Afrilearn" />
                <ListItem text="Unlimited sales commissions of 20% of total sales with instant payment" />
                <ListItem text="Competitive Sales Bonuses and Weekly Allowances" />
                <ListItem text="Clearly Career Growth path: Sales Agent > Team Lead > Sales Manager" />
                <ListItem text="Monthly team bonding and empowerment activities" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className=" h-100 d-flex align-items-center justify-content-center w-100 my-3 my-md-0">
                <img src={PhoneMockup2} alt="" width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="AgentSectionFour">
        <div className="container text-center">
          <h1>Become an agent today</h1>
          <p>
            Join one of the world’s best online learning <br /> marketplaces.
          </p>
          <button
            className="green-bg m-auto"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Apply Now
          </button>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-4">
              <h1 className="text-center mb-3">Become an Agent</h1>
              <p className="text-center mb-3">
                Join one of the world’s best online learning marketplaces.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("data", {
                    fullName,
                    phoneNumber,
                    email,
                    state,
                    file,
                  });
                  const formData = new FormData();
                  formData.append("fullName", fullName);
                  formData.append("phoneNumber", phoneNumber);
                  formData.append("email", email);
                  formData.append("state", state);
                  formData.append("file", file);
                  dispatch(submitAgentEntry(formData));
                }}
              >
                <input
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  className="form-control form-control-lg my-4"
                  placeholder="Full Name"
                />
                <input
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="phone"
                  className="form-control form-control-lg my-4"
                  placeholder="Phone Number"
                />
                <input
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control form-control-lg my-4"
                  placeholder="Email Address"
                />
                <input
                  required
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  className="form-control form-control-lg my-4"
                  placeholder="State"
                />
                <label
                  htmlFor="selectFile"
                  className="form-control form-control-lg my-4"
                  onClick={() => {
                    console.log("Hi");
                  }}
                >
                  <input
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    className="hidden"
                    style={{ width: 0 }}
                    id="selectFile"
                  />
                  {file?.name ? (
                    <span>{file?.name}</span>
                  ) : (
                    <span>
                      <FontAwesomeIcon
                        icon={faCloudUploadAlt}
                        className="mx-2 text-secondary"
                      />
                      Upload CV in .doc, .docx, .pdf file
                    </span>
                  )}
                </label>
                <button
                  className="btn btn-lg green-bg w-100 d-flex justify-content-center my-5"
                  type="submit"
                >
                  Submit{" "}
                  {agentStoryLoading && (
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>     
    </div>
     <Footer />
     </>
  );
}
