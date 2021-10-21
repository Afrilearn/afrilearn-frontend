import "./css/styles.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../includes/footer/footer.component";
import { getFaculty, getRecentBlogs } from "../../../redux/actions/authActions";
import slugify from "react-slugify";

export default function Faculties() {
  const blogs = useSelector((state) => state.auth.blogs);
  let mappedBlogs = [];
  mappedBlogs = blogs.map((i) => {
    return {
      _id: i._id,
      title: i.title,
      link: `https://blog.myafrilearn.com/articles/${slugify(i.title)}?id=${
        i._id
      }`,
    };
  });
  const faculties = useSelector((state) => state.auth.faculties);
  const [searchQuery, setSearchQuery] = useState("");
  let filtered = faculties;
  if (searchQuery) {
    filtered = faculties.filter(
      (item) =>
        (item.name &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFaculty());
    // dispatch(getRecentBlogs());
  }, []);

  const FacultyMember = ({ name, image, description }) => {
    return (
      <div className="faculty-member m-2 m-lg-0 my-lg-3">
        <div
          class="d-flex align-items-center flex-column image-section img"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* <img src={image} height="100%" /> */}
          {/* <div class="avatar" style={{ backgroundImage: `url(${image})` }} /> */}
        </div>
        <div class="text-section">
          <div className="member-name text-center mt-2">{name}</div>
          <p className="para">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="my-5 pt-5" id="faculties">
        <div className="">
          <h1 className="heading-text">Faculty</h1>
          <h1 className="sub-heading-text">Meet our Faculty!</h1>
          <p className="p">
            Afrilearn would like to thank every individual, organization, and
            government who has dedicated their time, resources, and expertise to
            our mission of delivering quality education to Africans anywhere.
            The vast content on Afrilearn is made possible by the selfless
            commitment of our in-house team alongside our seasoned network of
            highly experienced teachers, volunteers, and partners.
          </p>

          {filtered && filtered.length === 0 && (
            <div className="card">
              <div className="card-body text-center">
                List of faculty members is currently empty
              </div>
            </div>
          )}
          <div class="d-flex justify-content-center justify-content-lg-around flex-wrap faculty-members mt-2 mt-lg-5">
            {filtered.map((item, index) => (
              <FacultyMember
                key={index}
                name={item.name}
                image={item.image}
                description={item.description}
              />
            ))}
          </div>

          {/* <br />
          <br />
          <p>________________</p>
          <h3 className="green">
            <strong>You too can inspire Africa to love learning!</strong>
          </h3>
          <p className="lastGuy">
            By joining our network of genius tutors and content providers to
            deliver quality education for Africans anywhere. To join our ace
            team, simply send an email to{" "}
            <a href="mailto:hello@myafrilearn.com">hello@myafrilearn.com.</a>
          </p> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
