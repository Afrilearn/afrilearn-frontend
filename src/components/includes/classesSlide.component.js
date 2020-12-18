import React, { Component } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faPlay,
  faBookReader,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class ClassesSlide extends Component {
  allowPopUp = (id) => {
    this.props.handlePopUp(id);
    this.hidden();
  };
  visible = () => {
    const slicks = document.querySelectorAll(".slick-list");
    for (let index = 0; index < slicks.length; index++) {
      const slick = slicks[index];
      slick.style.overflow = "visible";
    }
  };
  hidden = () => {
    const slicks = document.querySelectorAll(".slick-list");
    for (let index = 0; index < slicks.length; index++) {
      const slick = slicks[index];
      slick.style.overflow = "hidden";
    }
  };

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      initialSlide: 0,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Slider {...settings}>
        {this.props.data.map((item) => (
          <div
            key={item._id}
            className="classes_page_classlist_section_class_subject"
            onClick={() => this.allowPopUp(item._id)}
            onMouseOver={this.visible}
            onMouseLeave={this.hidden}
          >
            <div className="classes_page_classlist_section_class_subject_img">
              <img
                className="classes_page_classlist_section_class_subject_image"
                src={item.image}
                alt="see this"
              ></img>
            </div>
            <div className="classes_page_classlist_section_class_subject_details">
              <div className="classes_page_classlist_section_class_subject_details_icons">
                <div className="classes_page_classlist_section_class_subject_details_icon">
                  <FontAwesomeIcon icon={faPlay} style={{ height: "15px" }} />
                </div>
                <div className="classes_page_classlist_section_class_subject_details_icon">
                  <div className="classes_page_classlist_section_class_subject_details_icon_popup">
                    1300 Compiled Notes
                  </div>

                  <FontAwesomeIcon
                    icon={faBookReader}
                    style={{ height: "15px" }}
                  />
                </div>
                <div className="classes_page_classlist_section_class_subject_details_icon">
                  <div className="classes_page_classlist_section_class_subject_details_icon_popup">
                    13,000 Registered Students
                  </div>
                  <FontAwesomeIcon
                    icon={faUserAlt}
                    style={{ height: "15px" }}
                  />
                </div>
                <div className="classes_page_classlist_section_class_subject_details_icon last_icon">
                  <div className="classes_page_classlist_section_class_subject_details_icon_popup">
                    More Info
                  </div>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{ height: "15px" }}
                  />
                </div>
              </div>
              <p className="classes_page_classlist_section_class_subject_details_para">
                116 Video Lessons
              </p>
              <div className="classes_page_classlist_section_class_subject_details_terms">
                <span>03</span> Terms
              </div>
            </div>
          </div>
        ))}
      </Slider>
    );
  }
}
