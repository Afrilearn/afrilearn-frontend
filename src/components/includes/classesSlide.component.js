import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubjectBadgeForSlick from "./subjectBadgeForSlick/subjectBadgeForSlick.component";

export default class ClassesSlide extends Component {
  state = {
    terms: [
      {
        _id: 1,
        name: "First Term",
        classes: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
      },
      {
        _id: 2,
        name: "Second Term",
        classes: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
      },
      {
        _id: 3,
        name: "Third Term",
        classes: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
      },
    ],
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
          <div key={item._id}>
            <SubjectBadgeForSlick item={item} terms={this.state.terms} />
          </div>
        ))}
      </Slider>
    );
  }
}
