import {
  faComment,
  faEye,
  faFileImage,
  faFileSignature,
  faFilter,
  faHashtag,
  faHeart,
  faImage,
  faLocationArrow,
  faMapMarkerAlt,
  faSearch,
  faSmile,
  faSort,
  faThumbsUp,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./css/style.css";
import StudentIndicator from "../../../assets/img/StudentIndicator.svg";
import RankIndicator from "../../../assets/img/RankIndicator.svg";
import SchoolIndicator from "../../../assets/img/SchoolIndicator.svg";
import TeacherIndicator from "../../../assets/img/TeacherIndicator.svg";
import Dog from "../../../assets/img/Dog.svg";
import ImageIcon from "../../../assets/img/ImageIcon.svg";
import ChatIcon from "../../../assets/img/ChatIcon.svg";
import SendIcon from "../../../assets/img/SendIcon.svg";
import GreenLeftArrow from "../../../assets/img/GreenLeftArrow.svg";
import EmptyState from "../../../assets/img/EmptyState.svg";

const Feeds = (props) => {
  const six = [1, 2, 3, 4, 5, 6];
  const MyFeeds = (props) => {
    return (
      <div>
        <div className="border-bottom py-2  grey-border">
          <h1 className="">My Feeds</h1>
        </div>

        <div className="card bg-transparent border light-grey-border my-3">
          <div className="card-body">
            <div className="d-flex align-items-start search-box-section">
              <div className="mr-3">
                <span
                  className="avartar"
                  style={{ backgroundImage: `url(${Dog})` }}
                ></span>
              </div>
              <div className="w-100">
                <input
                  type="email"
                  class="w-100 bg-transparent border-top-0 border-end-0 border-start-0 border-radius-0 py-2"
                  placeholder="Start a conversation..."
                  aria-describedby="emailHelp"
                />
                <div className="d-flex align-items-center my-3">
                  <FontAwesomeIcon
                    icon={faHashtag}
                    className="mr-3 green"
                    size="lg"
                  />
                  <FontAwesomeIcon icon={faSmile} className="mr-3" size="lg" />
                  <img src={ImageIcon} alt="" className="mr-3" />
                  <button className="btn btn-sm button-green ml-auto px-3">
                    Post
                  </button>
                </div>

                <div className="d-flex align-items-center mt-5 justify-content-between">
                  <div class="col-3 px-0">
                    <div class="input-group my-2">
                      <select
                        id="inputState"
                        class="form-select  bg-transparent text-white grey-border"
                      >
                        <option selected>Class</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-3 px-0">
                    <div class="input-group my-2">
                      <select
                        id="inputState"
                        class="form-select  bg-transparent text-white grey-border"
                      >
                        <option selected>Subject</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-3 px-0">
                    <div class="input-group my-2">
                      <select
                        id="inputState"
                        class="form-select  bg-transparent text-white grey-border"
                      >
                        <option selected>Topic</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-transparent border light-grey-border my-3">
          <div className="card-body">
            <div className="search-box-section border-bottom light-grey-border">
              <div className="d-flex justify-content-start align-items-center align-items-center  ">
                <span
                  className="avartar mr-2"
                  style={{ backgroundImage: `url(${Dog})` }}
                ></span>
                <div className="">
                  <span>Muhammed Ibrahim</span>
                  <small className="grey-text d-block">
                    Lorem ipsum dolor sit.
                  </small>
                </div>
              </div>
              <p className="my-3 feed-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, totam! Excepturi odio sunt ipsum magnam quod architecto
                voluptates. Porro, placeat?
              </p>
              <p>
                <span className="green mr-3 feed-para">#JSS2</span>
                <span className="green mr-3 feed-para">#JSS2</span>
                <span className="green mr-3 feed-para">#JSS2</span>
              </p>
              <div>
                <span className="mr-4">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    size="lg"
                    className="mr-1"
                  />
                  16
                </span>
                <span className="mr-4">
                  <img src={ChatIcon} alt="" className="mr-3" /> 16
                </span>
              </div>
            </div>

            <div className="search-box-section border-bottom light-grey-border py-3">
              <p className="green">Comments</p>
              <div className="d-flex justify-content-start align-items-start my-2">
                <span
                  className="avartar mr-2"
                  style={{ backgroundImage: `url(${Dog})` }}
                ></span>
                <div className="">
                  <span>Muhammed Ibrahim</span>
                  <small className="grey-text ml-2">30 minutes ago</small>
                  <p className="feed-para">Lorem ipsum dolor sit.</p>
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        size="lg"
                        className="mr-1"
                      />
                      16
                    </span>
                    <span className="mr-4">
                      <img src={ChatIcon} alt="" className="mr-3" /> 16
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="search-box-section py-3">
              <div className="d-flex justify-content-start align-items-start my-2">
                <span
                  className="avartar mr-2"
                  style={{ backgroundImage: `url(${Dog})` }}
                ></span>
                <div className="w-100 light-grey-border border d-flex align-items-center p-1 rounded-pill">
                  <input
                    type="text"
                    name="comment"
                    className="w-100 form-control  bg-transparent border-0"
                    placeholder="Add a comment..."
                  />
                  <img src={ImageIcon} alt="" className="mr-3" />{" "}
                  <img src={SendIcon} alt="" className="mr-3" />{" "}
                  {/* <FontAwesomeIcon icon={f} className="mx-2" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-transparent border light-grey-border my-3">
          <div className="card-body">
            <div className="search-box-section border-bottom light-grey-border">
              <div className="d-flex justify-content-start align-items-center align-items-center  ">
                <span
                  className="avartar mr-2"
                  style={{ backgroundImage: `url(${Dog})` }}
                ></span>
                <div className="">
                  <span>Muhammed Ibrahim</span>
                  <small className="grey-text d-block">
                    Lorem ipsum dolor sit.
                  </small>
                </div>
              </div>
              <p className="my-3 feed-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, totam! Excepturi odio sunt ipsum magnam quod architecto
                voluptates. Porro, placeat?
              </p>
              <div
                className="feed-post-image rounded-3 my-3 image-fluid"
                style={{ backgroundImage: `url(${Dog})` }}
              ></div>
              <div>
                <span className="mr-4">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    size="lg"
                    className="mr-1"
                  />
                  16
                </span>
                <span className="mr-4">
                  <img src={ChatIcon} alt="" className="mr-3" /> 16
                </span>
              </div>
            </div>

            <div className="search-box-section border-bottom light-grey-border py-3">
              <p className="green">Comments</p>
              <div className="d-flex justify-content-start align-items-start my-2">
                <span
                  className="avartar mr-2"
                  style={{ backgroundImage: `url(${Dog})` }}
                ></span>
                <div className="">
                  <span>Muhammed Ibrahim</span>
                  <small className="grey-text ml-2">30 minutes ago</small>
                  <p className="feed-para">Lorem ipsum dolor sit.</p>
                  <div>
                    <span className="mr-4">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        size="lg"
                        className="mr-1"
                      />
                      16
                    </span>
                    <span className="mr-4">
                      <img src={ChatIcon} alt="" className="mr-3" /> 16
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="search-box-section py-3">
              <div className="d-flex justify-content-start align-items-start my-2">
                <span
                  className="avartar mr-2"
                  style={{ backgroundImage: `url(${Dog})` }}
                ></span>
                <div className="w-100 light-grey-border border d-flex align-items-center p-1 rounded-pill">
                  <input
                    type="text"
                    name="comment"
                    className="w-100 form-control  bg-transparent border-0"
                    placeholder="Add a comment..."
                  />
                  <img src={ImageIcon} alt="" className="mr-3" />{" "}
                  <img src={SendIcon} alt="" className="mr-3" />{" "}
                  {/* <FontAwesomeIcon icon={f} className="mx-2" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const MyConnections = (props) => {
    return (
      <div>
        <div className="border-bottom py-2  grey-border">
          <h1 className="">Connections</h1>
        </div>
        <div className="search-box-section">
          {six.map((item) => (
            <div className="who-to-follow row justify-content-between align-items-center border-bottom py-3  light-grey-border">
              <div className="col-8">
                <div className="d-flex justify-content-start align-items-center">
                  <span
                    className="avartar"
                    style={{ backgroundImage: `url(${Dog})` }}
                  ></span>
                  <span className="mx-2">Muhammed Ibrahim</span>
                  <img src={StudentIndicator} height="50%" alt="" />
                </div>
              </div>
              <div className="col-auto">
                <button className="btn green-bg text-white btn-sm">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const Profile = (props) => {
    return (
      <div>
        <div className="border-bottom py-2  grey-border search-box-section">
          <h1 className="">
            <img src={GreenLeftArrow} alt="" className="mr-2" /> Muhammed
            Ibrahim
          </h1>
        </div>
        <div className="search-box-section border-bottom light-grey-border">
          <div className="who-to-follow row justify-content-between align-items-center py-3">
            <div className="col-auto mb-2">
              <span
                className="avartar avartar-lg text-center"
                style={{ backgroundImage: `url(${Dog})` }}
              ></span>
            </div>
            <div className="col-md-9 col-12 d-flex justify-content-between align-items-center">
              <div className="text-center feed-para">
                <span>Followers</span>
                <span className="green d-block">69</span>
              </div>
              <div className="text-center feed-para">
                <span>Followers</span>
                <span className="green d-block">69</span>
              </div>
              <button className="btn green-bg text-white btn-sm">Follow</button>
            </div>
            <p className="feed-para">ibrahimmuhammed02@gmail.com</p>

            <p className="grey-text">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Lagos
              State, Nigeria
            </p>
          </div>
        </div>
        <div className="search-box-section feed-para">
          <div className="row ">
            <div className="col-md-6 col-12">
              <div className="row my-2">
                <div className="col-md-6 col-auto text-start grey-text">
                  Class:
                </div>
                <div className="col-md-6 col-auto text-start">JSS 1</div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-2">
                <div className="col-md-6 col-auto text-start grey-text">
                  My Rank:
                </div>
                <div className="col-md-6 col-auto text-start">
                  <img src={RankIndicator} className="mr-2" /> One Star General
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="row my-2">
                <div className="col-md-6 col-auto text-start grey-text">
                  Role:
                </div>
                <div className="col-md-6 col-auto text-start">
                  <img src={StudentIndicator} className="mr-2" /> Student
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-2">
                <div className="col-md-6 col-auto text-start grey-text">
                  My Points:
                </div>
                <div className="col-md-6 col-auto text-start">1769 points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const EmptyFollow = (props) => {
    return (
      <div className="search-box-section empty-state my-5">
        <img src={EmptyState} alt="Empty state" />
        <p className="my-4 grey-text feed-para">
          Opss! You have not followed any user. Click
          <a href="#" className="green">
            {" "}
            connections
          </a>{" "}
          to follow other users
        </p>
      </div>
    );
  };

  const MyFollowers = (props) => {
    return (
      <div>
        <div className="border-bottom py-2  grey-border">
          <h1 className="">
            <span className="green">50</span> Followers
          </h1>
          <EmptyFollow />
        </div>
      </div>
    );
  };
  const MyFollowings = (props) => {
    return (
      <div>
        <div className="border-bottom py-2  grey-border">
          <h1 className="">
            <span className="green">50</span> Followingss
          </h1>
        </div>
        <EmptyFollow />
      </div>
    );
  };

  return (
    <div id="feeds">
      <div className="negative_margin"></div>
      <div className="row mb-4 px-4">
        <div className="col-md-2 col-12"></div>
        <div className="col-12 col-md-7">
          <div className="container">
            <div id="feedsSearchSection" className="">
              <div className=" search-box row justify-content-center mt-2">
                <div class="col-4 px-0">
                  <div class="input-group input-group-lg my-2">
                    <span
                      class="input-group-text bg-transparent text-white grey-border"
                      id="basic-addon1"
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </span>
                    <select
                      id="inputState"
                      class="form-select form-select-lg bg-transparent text-white grey-border"
                    >
                      <option selected>All roles</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
                <div class="col-8">
                  <div class="input-group my-2">
                    <span
                      class="input-group-text green-bg border-end-0  grey-border"
                      id="basic-addon1"
                    >
                      <FontAwesomeIcon icon={faSearch} color="white" />
                    </span>
                    <input
                      type="text"
                      class="form-control form-control-lg bg-transparent grey-border border-start-0"
                      id="inputCity"
                      placeholder="Search users to stay connected..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-12"></div>
      </div>
      <div className="row g-3 px-4">
        <div className="col-12 col-md-2 ">
          <div id="feedsLeftSideSection" className="p-3">
            <ul class="nav" id="myTab" role="tablist">
              <li class="" role="">
                <button
                  class="nav-link mainNav-item active"
                  id="myFeeds-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#myFeeds"
                  type="button"
                  role="tab"
                  aria-controls="myFeeds"
                  aria-selected="true"
                >
                  My Feeds
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link mainNav-item"
                  id="myConnections-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#myConnections"
                  type="button"
                  role="tab"
                  aria-controls="myConnections"
                  aria-selected="false"
                >
                  My Connections
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link mainNav-item"
                  id="myProfile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#myProfile"
                  type="button"
                  role="tab"
                  aria-controls="myProfile"
                  aria-selected="false"
                >
                  My Profile
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link mainNav-item"
                  id="myFollowings-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#myFollowings"
                  type="button"
                  role="tab"
                  aria-controls="myFollowings"
                  aria-selected="false"
                >
                  My Followings
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link mainNav-item"
                  id="myFollowers-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#myFollowers"
                  type="button"
                  role="tab"
                  aria-controls="myFollowers"
                  aria-selected="false"
                >
                  My Followers
                </button>
              </li>
            </ul>
            <hr />
            <ul className="visibility-box">
              <li>
                <span>
                  <FontAwesomeIcon icon={faEye} color={"#A8A8A8"} />
                </span>
                <span className="ml-4 my-2 grey-text">Post Visibility</span>
              </li>
              <li>
                <div class="form-check">
                  <input
                    class="form-check-input visibility-input"
                    type="radio"
                    name="visibility"
                    value=""
                    id="flexCheckDefault1"
                    defaultChecked
                  />
                  <label
                    class="form-check-label visibility-label m-2"
                    for="flexCheckDefault1"
                  >
                    Public
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    class="form-check-input visibility-input"
                    type="radio"
                    name="visibility"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    class="form-check-label visibility-label m-2"
                    for="flexCheckDefault"
                  >
                    Followers Only
                  </label>
                </div>
              </li>
            </ul>

            <hr />
            <ul className="visibility-box">
              <li>
                <span>
                  <FontAwesomeIcon icon={faUsers} color={"#A8A8A8"} />
                </span>
                <span className="ml-4 my-2 grey-text">Role Indicator</span>
              </li>
              <li>
                <span>
                  <img src={StudentIndicator} alt="" />
                </span>
                <span className="ml-4 my-2">Student</span>
              </li>
              <li>
                <span>
                  <img src={TeacherIndicator} alt="" />
                </span>
                <span className="ml-4 my-2">Teacher</span>
              </li>
              <li>
                <span>
                  <img src={SchoolIndicator} alt="" />
                </span>
                <span className="ml-4 my-2">School</span>
              </li>
            </ul>
          </div>
          <div id="feedsLeftSideSection" className="p-3 my-5">
            <div className="who-to-follow row justify-content-between align-items-center  border-bottom py-2  grey-border">
              <div className="d-flex justify-content-between">
                <h5 className="">My Profile</h5>
                <img src={StudentIndicator} alt="" />
              </div>
            </div>

            <div className="who-to-follow row justify-content-between align-items-center p-2">
              <div className="d-flex align-items-center mt-2 mb-4">
                <span
                  className="avartar"
                  style={{ backgroundImage: `url(${Dog})` }}
                ></span>
                <span className="ml-2">Muhammed Ibrahim</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-center">
                  <span>Followers</span>
                  <span className="green d-block">69</span>
                </div>
                <div className="text-center">
                  <span>Followers</span>
                  <span className="green d-block">69</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-7">
          <div id="feedsMainSection" className="p-3">
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active p-3"
                id="myFeeds"
                role="tabpanel"
                aria-labelledby="myFeeds-tab"
              >
                <MyFeeds />
              </div>
              <div
                class="tab-pane fade"
                id="myConnections"
                role="tabpanel"
                aria-labelledby="myConnections-tab"
              >
                <MyConnections />
              </div>
              <div
                class="tab-pane fade"
                id="myProfile"
                role="tabpanel"
                aria-labelledby="myProfile-tab"
              >
                <Profile />
              </div>
              <div
                class="tab-pane fade"
                id="myFollowers"
                role="tabpanel"
                aria-labelledby="myFollowers-tab"
              >
                <MyFollowers />
              </div>
              <div
                class="tab-pane fade"
                id="myFollowings"
                role="tabpanel"
                aria-labelledby="myFollowings-tab"
              >
                <MyFollowings />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div id="feedsRightSideSection" className="p-3">
            <div className="who-to-follow row justify-content-between align-items-center  border-bottom py-2  grey-border">
              <h1 className="">Who to follow</h1>
            </div>

            {six.map((item) => (
              <div className="who-to-follow row justify-content-between align-items-center border-bottom py-3  light-grey-border">
                <div className="col-8">
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className="avartar"
                      style={{ backgroundImage: `url(${Dog})` }}
                    ></span>
                    <span className="mx-2">Muhammed Ibrahim</span>
                    <img src={StudentIndicator} height="50%" alt="" />
                  </div>
                </div>
                <div className="col-auto">
                  <button className="btn green-bg text-white btn-sm">
                    Follow
                  </button>
                </div>
              </div>
            ))}
            <div className="py-2">
              <span className="green cursor">Show more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
