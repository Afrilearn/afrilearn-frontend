import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import bullet from "../../../assets/img/circleBullet.png";
import logo from "../../../assets/img/logonew.png";

export default function DownloadAppsPopUp({ visible = false, toggleModal }) {
  const toggle = (e) => {
    toggleModal();
    localStorage.setItem("afriLearn:downloadAppPopUp", new Date());
  };
  return (
    <div>
      <Modal isOpen={visible} toggle={toggle} className="trendingModalClass">
        <ModalHeader toggle={toggle}>
          <img
            src={logo}
            alt="downloadMobileHeader"
            className="downloadMobileHeader"
          />
        </ModalHeader>
        <ModalBody>
          <div className="container downloadMobile">
            <div className="row">
              <div className="col-md-12 head1">
                Download the Afrilearn mobile App to enjoy more fun features
                such as:
              </div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Gamified learning challenge with friends to win weekly
                      cash prizes
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Full access to 50,000+ practice tests & solutions with
                      instant results
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Pass WAEC, JAMB-UTME, NECO, BECE & more in one sitting
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Get online Homework Help with instant solutions from
                      expert tutors
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Discover your areas of strength with real-time analytics
                      tools
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-1 desktopOnly">
                    <img src={bullet} alt="bullet" />
                  </div>
                  <div className="col-11">
                    <span>
                      Secure university admission and achieve unlimited success
                      in life
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-md-12">
                    <span className="myRow1">
                      Download the App for free to start winning now!
                    </span>
                  </div>
                </div>
                <div className="row myRow">
                  <div className="col-6">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.afrilearn"
                      target="_blank"
                    >
                      <img
                        className=""
                        src={require("../../../assets/img/playstore.png")}
                        alt="playstore"
                      />
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href="https://apps.apple.com/ng/app/afrilearn/id1587978653"
                      target="_blank"
                    >
                      {" "}
                      <img
                        className=""
                        src={require("../../../assets/img/applestore.png")}
                        alt="applestore"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary"> <Link to="/register">Register for Free</Link></Button>         
        </ModalFooter> */}
      </Modal>
    </div>
  );
}
