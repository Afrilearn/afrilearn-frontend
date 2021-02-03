import React from "react";
import Slider from "react-slick";
import Box from "./subjectBox.component";
import { connect } from "react-redux";

class SimpleSlider extends React.Component {
  subjectList() {
    let courses = this.props.courses;
    courses = courses.filter((el) => el._id === this.props.id);
    if (courses.length) {
      let subjectsArray = courses[0].relatedSubjects;
      // eslint-disable-next-line array-callback-return
      return subjectsArray.map((item) => {
        return (
          <Box
            image={item.mainSubjectId.imageUrl}
            compiledNotes={item.relatedLessons.length}
            registeredUsers={50000}
            subjectName={item.mainSubjectId.name}
            introText={item.mainSubjectId.introText} 
            lessons={item.relatedLessons}
            courseName={courses[0].name}
          />
        );
      });
    }
  }

  render() {
    var settings = {
      dots: true,
      autoplay: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
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
    return <Slider {...settings}>{this.subjectList()}</Slider>;
  }
}
const mapStateToProps = (state) => ({
  courses: state.course.courses,
});

export default connect(mapStateToProps, null)(SimpleSlider);
