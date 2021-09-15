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
    dispatch(getRecentBlogs());
  }, []);

  const FacultyMember = ({ name, image, description }) => {
    return (
      <div className="my-3">
        <p className="uppercase">
          <strong>{name}</strong>
        </p>
        <img src={image} alt={name} height="250px" />
        <p className="my-2">{description}</p>
      </div>
    );
  };

  return (
    <div id="faculties">
      <div className="container pt-4 my-5">
        <div className="w-100 row justify-content-end mb-4">
          <div className="col-12 col-md-4 ">
            <form class="faculty-search">
              <input
                type="text"
                placeholder="Search.."
                name="search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <i class="fa fa-search text-secondary"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8">
            <h1 className="display-6 green">Faculty</h1>
            <h1 className="green">
              <strong>Meet our Faculty!</strong>
            </h1>
            <p className="intro">
              <strong>MyAfrilearn.com</strong> would love to thank every
              individual, organization, and government who has dedicated their
              time, resources, and expertise to our mission of delivering
              quality education to Africans anywhere. The vast content on{" "}
              <strong>MyAfrilearn.com</strong> is made possible by the selfless commitment of our in-house team
              alongside our network of highly experienced teachers, volunteers,
              and partners.
            </p>
            <p>________________</p>

            {filtered && filtered.length === 0 && (
              <div className="card">
                <div className="card-body text-center">
                  List of faculty members is currently empty
                </div>
              </div>
            )}
            {filtered.map((item, index) => (
              <FacultyMember
                key={index}
                name={item.name}
                image={item.image}
                description={item.description}
              />
            ))}

            <br />
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
            </p>
          </div>
          {/* <div className="col-12 col-md-4">
            <div className="display-6 mb-4">Recent Posts</div>
            {mappedBlogs.map((item, index) => (
              <a key={index} href={item.link} className="my-2 d-block green">
                {item.title}
              </a>
            ))}
            {mappedBlogs && mappedBlogs.length === 0 && (
              <div className="card">
                <div className="card-body text-center">No recent post</div>
              </div>
            )}
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
