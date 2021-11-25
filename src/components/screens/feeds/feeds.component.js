import {
  faEye,
  faHashtag,
  faMapMarkerAlt,
  faSearch,
  faSort,
  faThumbsUp,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as secondThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
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
import EmojiIcon from "../../../assets/img/EmojiIcon.svg";
import { NavLink, Redirect, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAPostToFeed,
  commentToAPost,
  feedInputChange,
  followAUser,
  getAUserProfile,
  getCourseAndRelatedSubjectsForFeed,
  getMyFollowers,
  getMyFollowings,
  getPostsInFeed,
  getUsersInFeed,
  likeAPost,
  likeAPostComment,
  seachUsersInFeed,
  searchPostsInFeed,
  unlikeAPost,
  unlikeAPostComment,
} from "../../../redux/actions/feedActions";
import moment from "moment";
import Picker from "emoji-picker-react";
import { getRoles } from "../../../redux/actions/authActions";

const Feeds = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.feed.posts);
  const postsLoading = useSelector((state) => state.feed.postsLoading);
  const followings = useSelector((state) => state.feed.followings);
  const followers = useSelector((state) => state.feed.followers);
  const connections = useSelector((state) => state.feed.connections);
  const courses = useSelector((state) => state.feed.courses);
  const subjects = useSelector((state) => state.feed.subjects);
  const lessons = useSelector((state) => state.feed.lessons);
  const profile = useSelector((state) => state.feed.profile);
  const profileLoading = useSelector((state) => state.feed.profileLoading);
  const sendingPost = useSelector((state) => state.feed.sendingPost);
  const text = useSelector((state) => state.feed.text);
  const image = useSelector((state) => state.feed.image);
  const visibility = useSelector((state) => state.feed.visibility);
  const coursesLoading = useSelector((state) => state.feed.coursesLoading);
  const subjectId = useSelector((state) => state.feed.subjectId);
  const courseId = useSelector((state) => state.feed.courseId);
  const lessonId = useSelector((state) => state.feed.lessonId);
  const commentText = useSelector((state) => state.feed.commentText);
  const commentImage = useSelector((state) => state.feed.commentImage);
  const usersInFeed = useSelector((state) => state.feed.usersInFeed);
  const usersInFeedLoading = useSelector(
    (state) => state.feed.usersInFeedLoading
  );
  const roles = useSelector((state) => state.auth.roles);
  const sortBy = useSelector((state) => state.feed.sortBy);
  const followUnfollowLoading = useSelector(
    (state) => state.feed.followUnfollowLoading
  );

  useEffect(() => {
    dispatch(getPostsInFeed());
    dispatch(getMyFollowings());
    dispatch(getMyFollowers());
    dispatch(getUsersInFeed());
    dispatch(getCourseAndRelatedSubjectsForFeed());
    if (roles.length === 0) {
      dispatch(getRoles());
    }
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    dispatch(feedInputChange("text", text + emojiObject.emoji));
  };

  const usersToFollow = connections
    .filter(
      (item) => user && user.followings && !user.followings.includes(item._id)
    )
    .slice(0, 6);
  let connectionsTodisplay = connections;
  let followersTodisplay = followers;
  let followingsTodisplay = followings;
  if (sortBy) {
    connectionsTodisplay = connections.filter((item) => item.role === sortBy);
    followingsTodisplay = followings.filter(
      (item) =>
        item.userId && item.userId.role && item.userId.role._id === sortBy
    );
    followersTodisplay = followers.filter(
      (item) =>
        item.followerId &&
        item.followerId.role &&
        item.followerId.role._id === sortBy
    );
  }

  const CustomBadge = ({ role }) => {
    return role === "5fd08fba50964811309722d5" ? (
      <img src={StudentIndicator} className="mr-2" />
    ) : role === "602f3ce39b146b3201c2dc1d" ? (
      <img src={TeacherIndicator} className="mr-2" />
    ) : role === "607ededa2712163504210684" ? (
      <img src={SchoolIndicator} className="mr-2" />
    ) : role === "606ed82e70f40e18e029165e" ? (
      <img src={StudentIndicator} className="mr-2" />
    ) : (
      <img src={StudentIndicator} className="mr-2" />
    );
  };

  const Avartar = ({ follower, className }) => {
    return (
      <NavLink
        to={`${url}/profile`}
        className={`avartar ${className}`}
        style={{
          backgroundImage: `url(${follower && follower.profilePhotoUrl})`,
        }}
        onClick={() => {
          dispatch(getAUserProfile(follower && follower._id));
        }}
        title={follower && follower.fullName}
      >
        {follower &&
          !follower.profilePhotoUrl &&
          follower.fullName &&
          follower.fullName.slice(0, 2)}
      </NavLink>
    );
  };

  const FollowButton = ({ user: item }) => {
    return (
      <button
        className="btn green-bg text-white btn-sm d-flex align-items-center justify-content-center"
        onClick={() => {
          dispatch(followAUser(item._id));
        }}
        disabled={followUnfollowLoading}
      >
        {followUnfollowLoading && (
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        {!followUnfollowLoading &&
        user &&
        user.followings &&
        user.followings.includes(item._id)
          ? "Unfollow"
          : "Follow"}
      </button>
    );
  };

  const FollowerItem = ({ user: item }) => {
    return (
      <div className="who-to-follow row justify-content-between align-items-center border-bottom py-3  light-grey-border">
        <div className="col-8">
          <div className="d-flex justify-content-start align-items-center">
            <Avartar follower={item} />
            <span className="mx-2 cursor">
              <NavLink
                to={`${url}/profile`}
                onClick={() => {
                  dispatch(getAUserProfile(item._id));
                }}
              >
                {item.fullName}
              </NavLink>
            </span>
            <CustomBadge role={item.role && item.role._id} />
          </div>
        </div>
        <div className="col-auto">
          <FollowButton user={item} />
        </div>
      </div>
    );
  };

  const FollowingItem = ({ user: item }) => {
    return (
      <div className="who-to-follow row justify-content-between align-items-center border-bottom py-3  light-grey-border">
        <div className="col-8">
          <div className="d-flex justify-content-start align-items-center">
            <Avartar follower={item} />
            <span className="mx-2 cursor">
              <NavLink
                to={`${url}/profile`}
                onClick={() => {
                  dispatch(getAUserProfile(item && item._id));
                }}
              >
                {item && item.fullName}
              </NavLink>
            </span>
            <CustomBadge role={item && item.role && item && item.role._id} />
          </div>
        </div>
        <div className="col-auto">
          <button
            className="btn green-bg text-white btn-sm d-flex align-items-center justify-content-center"
            onClick={() => {
              dispatch(followAUser(item && item._id));
            }}
            disabled={followUnfollowLoading}
          >
            {followUnfollowLoading ? (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Unfollow"
            )}
          </button>
        </div>
      </div>
    );
  };

  const ConnectionItem = (props) => {
    return (
      <div className="who-to-follow row justify-content-between align-items-center border-bottom py-3  light-grey-border">
        <div className="col-8">
          <div className="d-flex justify-content-start align-items-center">
            <Avartar follower={props.follower} />

            <span className="mx-2 cursor">
              <NavLink
                to={`${url}/profile`}
                onClick={() => {
                  dispatch(
                    getAUserProfile(props.follower && props.follower._id)
                  );
                }}
              >
                {props.follower && props.follower.fullName}
              </NavLink>
            </span>
            <CustomBadge role={props.follower && props.follower.role} />
          </div>
        </div>
        <div className="col-auto">
          <FollowButton user={props.follower} />
        </div>
      </div>
    );
  };

  const MyConnections = (props) => {
    return (
      <div>
        <div className="border-bottom py-2  grey-border d-flex align-items-center">
          <h1 className="">Connections</h1>
          {usersInFeedLoading && (
            <div
              class="spinner-border ms-auto"
              role="status"
              aria-hidden="true"
            ></div>
          )}
        </div>
        <div className="search-box-section">
          {connectionsTodisplay.length > 0 &&
            connectionsTodisplay.map((item) => (
              <ConnectionItem follower={item} />
            ))}
        </div>
        {connectionsTodisplay.length === 0 && (
          <CustomEmpty text="Oops! Nothing here yet." />
        )}
      </div>
    );
  };

  const Profile = () => {
    return (
      <div>
        <div className="border-bottom py-2  grey-border search-box-section">
          <h1 className="">
            <img
              src={GreenLeftArrow}
              alt=""
              className="mr-2 cursor"
              onClick={() => {
                props.history.goBack();
              }}
            />
            {profile.fullName}
          </h1>
        </div>
        <div className="search-box-section border-bottom light-grey-border">
          <div className="who-to-follow row justify-content-between align-items-center py-3">
            <div className="col-auto mb-2">
              <Avartar follower={profile} />
            </div>
            <div className="col-md-9 col-12 d-flex justify-content-between align-items-center">
              <div className="text-center feed-para">
                <span className="cursor">
                  <NavLink to={`${url}/followers`}>Followers</NavLink>
                </span>
                <span className="green d-block">
                  {profile.followers && profile.followers.length}
                </span>
              </div>
              <div className="text-center feed-para">
                <span className="cursor">
                  <NavLink to={`${url}/followings`}>Followings</NavLink>
                </span>
                <span className="green d-block">
                  {profile.followings && profile.followings.length}
                </span>
              </div>
              <button className="btn green-bg text-white btn-sm">Follow</button>
            </div>
            <p className="feed-para">{profile.email}</p>

            <p className="grey-text">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />{" "}
              {profile.state}
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
                <div className="col-md-6 col-auto text-start">
                  {profile.enrolledCourses &&
                    profile.enrolledCourses.length &&
                    profile.enrolledCourses.length > 0 &&
                    profile.enrolledCourses[0] &&
                    profile.enrolledCourses[0].courseId &&
                    profile.enrolledCourses[0].courseId.name}
                </div>
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
                  {profile.role &&
                  profile.role._id === "5fd08fba50964811309722d5" ? (
                    <div>
                      <img src={StudentIndicator} className="mr-2" /> Student
                    </div>
                  ) : profile.role &&
                    profile.role._id === "602f3ce39b146b3201c2dc1d" ? (
                    <div>
                      <img src={TeacherIndicator} className="mr-2" /> Teacher
                    </div>
                  ) : profile.role &&
                    profile.role._id === "607ededa2712163504210684" ? (
                    <div>
                      <img src={SchoolIndicator} className="mr-2" /> School
                    </div>
                  ) : profile.role &&
                    profile.role._id === "606ed82e70f40e18e029165e" ? (
                    <div>
                      <img src={StudentIndicator} className="mr-2" /> Parent
                    </div>
                  ) : (
                    <div>
                      <img src={StudentIndicator} className="mr-2" />{" "}
                      Administrator
                    </div>
                  )}
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
          Opss! You have not followed any user. Click&nbsp;
          <NavLink to={`${url}/connections`} class="green">
            connections&nbsp;
          </NavLink>
          to follow other users
        </p>
      </div>
    );
  };
  const CustomEmpty = ({ text }) => {
    return (
      <div className="search-box-section empty-state my-5">
        <img src={EmptyState} alt="Empty state" />
        <p className="my-4 grey-text feed-para">{text}</p>
      </div>
    );
  };

  const MyFollowers = (props) => {
    return (
      <div>
        <div className="border-bottom py-2  grey-border">
          <h1 className="">
            <span className="green mr-2">
              {followersTodisplay && followersTodisplay.length}
            </span>
            Follower
            {followersTodisplay && followersTodisplay.length > 1 && "s"}
          </h1>
        </div>
        <div className="search-box-section">
          {followersTodisplay.length > 0 &&
            followersTodisplay.map((item) => (
              <FollowerItem user={item && item.followerId} />
            ))}
        </div>
        {followersTodisplay.length === 0 && (
          <CustomEmpty text="Your followers will show here. You do not have any follower yet." />
        )}
      </div>
    );
  };

  const MyFollowings = (props) => {
    return (
      <div>
        <div className="border-bottom py-2  grey-border">
          <h1 className="">
            <span className="green mr-2">
              {followingsTodisplay && followingsTodisplay.length}
            </span>
            Following
            {followingsTodisplay && followingsTodisplay.length > 1 && "s"}
          </h1>
        </div>
        <div className="search-box-section">
          {followingsTodisplay.length > 0 &&
            followingsTodisplay.map((item) => (
              <FollowingItem user={item && item.userId} />
            ))}
        </div>
        {followingsTodisplay.length === 0 && <EmptyFollow />}
      </div>
    );
  };

  const WhoTofollow = (props) => {
    return (
      <div className="who-to-follow row justify-content-between align-items-center border-bottom py-3  light-grey-border">
        <div className="col-8">
          <div className="d-flex justify-content-between align-items-center">
            <Avartar follower={props.follower} />
            <span className="mx-2 text-truncate">
              <NavLink
                to={`${url}/profile`}
                onClick={() => {
                  dispatch(
                    getAUserProfile(props.follower && props.follower._id)
                  );
                }}
              >
                {props.follower.fullName}
              </NavLink>
            </span>
            <img
              src={StudentIndicator}
              height="50%"
              alt=""
              className="ml-auto"
            />
          </div>
        </div>
        <div className="col-auto">
          <FollowButton user={props.follower} />
        </div>
      </div>
    );
  };

  let { path, url } = useRouteMatch();

  window.addEventListener("scroll", () => {
    const sideBarOffset = document.querySelector(".sticky-part-one");
    const sideBarTwoOffset = document.querySelector(".sticky-part-two");
    const mainSection = document.querySelector(".sticky-part.col-md-7");
    if (sideBarOffset && window.scrollY > sideBarOffset.clientTop) {
      sideBarOffset.classList.add("sticky-now-one");
      mainSection.classList.add("middle-now");
    } else {
      sideBarOffset && sideBarOffset.classList.remove("sticky-now-one");
      mainSection && mainSection.classList.remove("middle-now");
    }
    if (sideBarTwoOffset && window.scrollY > sideBarTwoOffset.clientTop) {
      sideBarTwoOffset.classList.add("sticky-now-two");
      mainSection.classList.add("middle-now");
    } else {
      sideBarTwoOffset && sideBarTwoOffset.classList.remove("sticky-now-two");
      mainSection && mainSection.classList.remove("middle-now");
    }
  });

  return (
    <div id="feeds">
      <div className="negative_margin"></div>

      <div className="row mb-4 px-4">
        <div className="col-md-2 col-12 hide-900"></div>
        <div className="col-12 col-md-7">
          <div className="container">
            <div id="feedsSearchSection" className="">
              <div className=" search-box row justify-content-center mt-2">
                {props.location.pathname !== "/feeds/my-feeds" && (
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
                        onChange={(e) => {
                          e.preventDefault();
                          dispatch(feedInputChange("sortBy", e.target.value));
                        }}
                      >
                        <option value="" className="bg-dark">
                          All roles
                        </option>
                        {roles.map((role) => (
                          <option value={role._id} className="bg-dark">
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {props.location.pathname === "/feeds/my-feeds" ? (
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
                        placeholder="Use # to search post"
                        onChange={(e) => {
                          dispatch(searchPostsInFeed(e.target.value));
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div class="col-8">
                    <div class="input-group my-2 search-with-dropdown">
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
                        onChange={(e) => {
                          dispatch(seachUsersInFeed(e.target.value));
                        }}
                        id="searchResultsDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul
                        class="dropdown-menu "
                        aria-labelledby="searchResultsDropdown"
                      >
                        <div className="dropdown-for-search bg-dark">
                          {usersInFeed.map((user) => (
                            <NavLink
                              to={`${url}/profile`}
                              onClick={() => {
                                dispatch(getAUserProfile(user._id));
                              }}
                            >
                              <li class="list-group-item bg-dark">
                                {user.fullName}
                              </li>
                            </NavLink>
                          ))}
                        </div>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-12 hide-900"></div>
      </div>
      <div className="show-900">
        <ul class="nav mobile-nav-items" id="myTab" role="tablist">
          <li class="m-2 " role="">
            <NavLink to={`${url}/my-feeds`} className="mobile-nav-item">
              My Feeds
            </NavLink>
          </li>
          <li role="presentation" className="m-2 ">
            <NavLink to={`${url}/connections`} className="mobile-nav-item">
              My Connections
            </NavLink>
          </li>
          <li role="presentation" className="m-2 ">
            <NavLink
              to={`${url}/profile`}
              className="mobile-nav-item"
              onClick={() => {
                dispatch(getAUserProfile(user._id));
              }}
            >
              My Profile
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="row g-3 px-4 position-relative">
        <div className="col-12 col-md-2 sticky-part sticky-part-one hide-900 pb-5">
          <div id="feedsLeftSideSection" className="p-3 mb-5 ">
            <div className="who-to-follow row justify-content-between align-items-center  border-bottom py-2  grey-border">
              <div className="d-flex justify-content-between">
                <h5 className="">My Profile</h5>
                <img src={StudentIndicator} alt="" />
              </div>
            </div>

            <div className="who-to-follow row justify-content-between align-items-center p-2">
              <NavLink
                to={`${url}/profile`}
                onClick={() => {
                  dispatch(getAUserProfile(user._id));
                }}
              >
                <div className="d-flex align-items-center mt-2 mb-4">
                  <Avartar follower={user} />
                  <span className="ml-2">{user.fullName}</span>
                </div>
              </NavLink>
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-center">
                  <span>
                    <NavLink to={`${url}/followers`}>Followers</NavLink>
                  </span>
                  <span className="green d-block">
                    {followers && followers.length}
                  </span>
                </div>
                <div className="text-center">
                  <span>
                    <NavLink to={`${url}/followings`}>Followings</NavLink>
                  </span>
                  <span className="green d-block">
                    {followings && followings.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div id="feedsLeftSideSection" className="p-3 ">
            <ul class="nav" id="myTab" role="tablist">
              <li class="" role="">
                <NavLink to={`${url}/my-feeds`}>My Feeds</NavLink>
              </li>
              <li role="presentation">
                <NavLink to={`${url}/connections`} class="mainNav-item">
                  My Connections
                </NavLink>
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
                    value="public"
                    id="flexCheckDefault1"
                    defaultChecked
                    onChange={(e) =>
                      dispatch(feedInputChange("visibility", e.target.value))
                    }
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
                    value="followersOnly"
                    id="flexCheckDefault"
                    onChange={(e) =>
                      dispatch(feedInputChange("visibility", e.target.value))
                    }
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
        </div>
        <div className="col-12 col-md-7 sticky-part pb-5 ">
          <div id="feedsMainSection" className="p-3">
            <Redirect from={`${path}`} to={`${path}/my-feeds`} />
            <Route path={`${path}/connections`}>
              <div>
                <MyConnections />
              </div>
            </Route>
            <Route path={`${path}/search`}>
              <div>
                <usersInFeed />
              </div>
            </Route>
            <Route path={`${path}/profile`}>
              <div>
                {profileLoading ? (
                  <div class="text-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading profile...</p>
                  </div>
                ) : (
                  <Profile props={props} />
                )}
              </div>
            </Route>
            <Route path={`${path}/followers`}>
              <div>
                <MyFollowers />
              </div>
            </Route>

            <Route path={`${path}/followings`}>
              <div>
                <MyFollowings />
              </div>
            </Route>
            <Route path={`${path}/my-feeds`}>
              <div>
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
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const postData = new FormData();
                              postData.append("visibility", visibility);
                              postData.append("text", text);
                              if (image) {
                                postData.append("image", image);
                              }
                              if (subjectId) {
                                postData.append("subjectId", subjectId);
                              }
                              if (courseId) {
                                postData.append("courseId", courseId);
                              }
                              if (lessonId) {
                                postData.append("lessonId", lessonId);
                              }

                              dispatch(addAPostToFeed(postData));
                            }}
                          >
                            <div className="w-100 grey-border bg-transparent border-top-0 border-end-0 border-start-0 border-radius-0 border-bottom border-light py-2 text-light">
                              <input
                                type="text"
                                className="w-100  bg-transparent border-top-0 border-end-0 border-start-0 border-bottom-0 border-radius-0 py-2 text-light"
                                placeholder="Start a conversation..."
                                value={text}
                                onChange={(e) => {
                                  e.preventDefault();
                                  const nn = e.target.value;
                                  dispatch(feedInputChange("text", nn));
                                }}
                              />
                              {image && (
                                <div
                                  alt=""
                                  className="comment-image-preview"
                                  style={{
                                    backgroundImage: `url(${
                                      image && URL.createObjectURL(image)
                                    })`,
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTimes}
                                    className="comment-image-preview-close"
                                    onClick={() => {
                                      dispatch(feedInputChange("image", null));
                                    }}
                                  />
                                </div>
                              )}{" "}
                            </div>

                            <div className="d-flex align-items-center my-3 position-relative">
                              <FontAwesomeIcon
                                icon={faHashtag}
                                className="mr-3 green"
                                size="lg"
                                data-bs-toggle="collapse"
                                href="#hashTags"
                                role="button"
                                aria-expanded="false"
                                aria-controls="hashTags"
                              />

                              <div class="dropdown">
                                <img
                                  src={EmojiIcon}
                                  className="mr-3"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                />
                                <div
                                  class="dropdown-menu emojiSelector"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <Picker onEmojiClick={onEmojiClick} />
                                </div>
                              </div>

                              <input
                                type="file"
                                name="postImage"
                                id="postImage"
                                className="hidden-label"
                                onChange={(e) => {
                                  e.preventDefault();
                                  dispatch(
                                    feedInputChange("image", e.target.files[0])
                                  );
                                }}
                              />
                              <label htmlFor="postImage" className="mb-0 ">
                                <img
                                  src={ImageIcon}
                                  alt=""
                                  className="mr-3 cursor"
                                />
                              </label>

                              <button
                                class="btn btn-sm button-green ml-auto px-3"
                                type="submit"
                                disabled={sendingPost}
                              >
                                {sendingPost && (
                                  <span
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                  ></span>
                                )}
                                Post
                              </button>
                            </div>

                            <div class="collapse" id="hashTags">
                              {coursesLoading && (
                                <span
                                  class="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              )}
                              <div className="d-flex align-items-center mt-5 justify-content-between">
                                <div class="col-3 px-0">
                                  <div class="input-group my-2">
                                    <select
                                      id="inputState"
                                      class="form-select  bg-transparent text-white grey-border"
                                      onChange={(e) => {
                                        e.preventDefault();
                                        const targetCourse = courses.find(
                                          (item) => item._id === e.target.value
                                        );
                                        dispatch(
                                          feedInputChange(
                                            "courseId",
                                            e.target.value
                                          )
                                        );
                                        dispatch(
                                          feedInputChange(
                                            "subjects",
                                            targetCourse.relatedSubjects
                                          )
                                        );
                                      }}
                                    >
                                      <option selected className="bg-dark">
                                        Class
                                      </option>
                                      {courses.map((course) => (
                                        <option
                                          value={course._id}
                                          className="bg-dark"
                                        >
                                          {course.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div class="col-3 px-0">
                                  <div class="input-group my-2">
                                    <select
                                      id="inputState"
                                      class="form-select  bg-transparent text-white grey-border"
                                      onChange={(e) => {
                                        e.preventDefault();
                                        const targetSubject = subjects.find(
                                          (item) => item._id === e.target.value
                                        );
                                        dispatch(
                                          feedInputChange(
                                            "lessons",
                                            targetSubject.relatedLessons
                                          )
                                        );
                                        dispatch(
                                          feedInputChange(
                                            "subjectId",
                                            e.target.value
                                          )
                                        );
                                      }}
                                    >
                                      <option selected className="bg-dark">
                                        Subject
                                      </option>
                                      {subjects.map((subject) => (
                                        <option
                                          value={subject._id}
                                          className="bg-dark"
                                        >
                                          {subject.mainSubjectId &&
                                            subject.mainSubjectId.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div class="col-3 px-0">
                                  <div class="input-group my-2">
                                    <select
                                      id="inputState"
                                      class="form-select  bg-transparent text-white grey-border"
                                      onChange={(e) => {
                                        dispatch(
                                          feedInputChange(
                                            "lessonId",
                                            e.target.value
                                          )
                                        );
                                      }}
                                    >
                                      <option selected className="bg-dark">
                                        Topic
                                      </option>
                                      {lessons.map((lesson) => (
                                        <option
                                          value={lesson._id}
                                          className="bg-dark"
                                        >
                                          {lesson.title}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!postsLoading && posts.length === 0 && (
                    <CustomEmpty text="Be the first to add a post. Posts in your feed will show here." />
                  )}

                  {postsLoading && (
                    <div className="card bg-transparent border light-grey-border my-3">
                      <div className="card-body">
                        <div className="search-box-section border-bottom light-grey-border">
                          <div class="text-center">
                            <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                            <p>Loading Feeds...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {!postsLoading &&
                    posts.map((post) => (
                      <div className="card bg-transparent border light-grey-border my-3">
                        <div className="card-body">
                          <div className="search-box-section border-bottom light-grey-border">
                            <div className="d-flex justify-content-start align-items-center align-items-center  ">
                              <Avartar
                                follower={post.userId}
                                className="mr-2"
                              />
                              <div className="">
                                <span>
                                  <NavLink
                                    to={`${url}/profile`}
                                    onClick={() => {
                                      dispatch(
                                        getAUserProfile(
                                          post.userId && post.userId._id
                                        )
                                      );
                                    }}
                                  >
                                    {post.userId && post.userId.fullName}
                                  </NavLink>
                                </span>
                                <small className="grey-text d-block">
                                  {moment(post.createdAt).format(
                                    "MMMM Do YYYY"
                                  )}
                                </small>
                              </div>
                            </div>
                            <p className="my-3 feed-para">{post.text}</p>
                            {post.imageUrl && (
                              <div
                                className="feed-post-image rounded-3 my-3 image-fluid"
                                style={{
                                  backgroundImage: `url(${post.imageUrl})`,
                                }}
                              ></div>
                            )}
                            <p>
                              {post.courseName && (
                                <span className="green mr-3 feed-para">
                                  #{post.courseName}
                                </span>
                              )}
                              {post.subjectName && (
                                <span className="green mr-3 feed-para">
                                  #{post.subjectName}
                                </span>
                              )}
                              {post.lessonName && (
                                <span className="green mr-3 feed-para">
                                  #{post.lessonName}
                                </span>
                              )}
                            </p>
                            <div>
                              <span
                                className="mr-4 cursor "
                                onClick={() => {
                                  if (
                                    post.likes &&
                                    post.likes.includes(user._id)
                                  ) {
                                    //remove like
                                    dispatch(unlikeAPost(post._id));
                                  } else {
                                    //add like
                                    dispatch(likeAPost(post._id));
                                  }
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    post.likes && post.likes.includes(user._id)
                                      ? faThumbsUp
                                      : secondThumbsUp
                                  }
                                  size="lg"
                                  className="mr-1 like-button"
                                />
                                {post.likes && post.likes.length}
                              </span>
                              <span
                                className="mr-4 cursor-pointer"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapseComments${post._id}`}
                                aria-expanded="false"
                                aria-controls={`collapseComments${post._id}`}
                              >
                                <img src={ChatIcon} alt="" className="mr-3" />{" "}
                                {post.comments && post.comments.length}
                              </span>
                            </div>
                          </div>

                          <div className="search-box-section py-3">
                            <div className="d-flex justify-content-start align-items-start my-2">
                              <Avartar follower={user} className="mr-2" />
                              <div className="w-100 light-grey-border border p-1 rounded">
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const commentData = new FormData();
                                    commentData.append("text", commentText);
                                    if (commentImage) {
                                      commentData.append("image", commentImage);
                                    }
                                    dispatch(
                                      commentToAPost(post._id, commentData)
                                    );
                                  }}
                                >
                                  <div className="w-100  border-0 d-flex align-items-center p-1">
                                    <input
                                      required
                                      type="text"
                                      name="comment"
                                      value={commentText}
                                      className="w-100 form-control  bg-transparent border-0 text-white"
                                      placeholder="Add a comment..."
                                      onChange={(e) => {
                                        e.preventDefault();
                                        dispatch(
                                          feedInputChange(
                                            "commentText",
                                            e.target.value
                                          )
                                        );
                                      }}
                                    />
                                    <input
                                      type="file"
                                      name="postImageButton"
                                      id="postImageButton"
                                      className="hidden-label"
                                      onChange={(e) => {
                                        e.preventDefault();
                                        dispatch(
                                          feedInputChange(
                                            "commentImage",
                                            e.target.files[0]
                                          )
                                        );
                                      }}
                                    />
                                    <label
                                      htmlFor="postImageButton"
                                      className="mb-0"
                                    >
                                      <img
                                        src={ImageIcon}
                                        alt=""
                                        className="mr-3 cursor"
                                      />
                                    </label>
                                    <input
                                      type="submit"
                                      name="sendCommentButton"
                                      id="sendCommentButton"
                                      className="hidden-label"
                                    />
                                    <label
                                      htmlFor="sendCommentButton"
                                      className="mb-0"
                                    >
                                      <img
                                        src={SendIcon}
                                        alt=""
                                        className="mr-3 cursor"
                                      />
                                    </label>
                                  </div>
                                </form>{" "}
                                {commentImage && (
                                  <div
                                    alt=""
                                    className="comment-image-preview"
                                    style={{
                                      backgroundImage: `url(${
                                        commentImage &&
                                        URL.createObjectURL(commentImage)
                                      })`,
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTimes}
                                      className="comment-image-preview-close"
                                      onClick={() => {
                                        dispatch(
                                          feedInputChange("commentImage", null)
                                        );
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {post.comments && post.comments.length > 0 && (
                            <div
                              className="search-box-section border-bottom light-grey-border py-3 collapse"
                              id={`collapseComments${post._id}`}
                            >
                              <p className="green">Comments</p>
                              {post.comments &&
                                post.comments.map((comment) => (
                                  <div className="d-flex justify-content-start align-items-start my-2">
                                    <Avartar
                                      follower={comment.userId}
                                      className="mr-2"
                                    />

                                    <div className="">
                                      <span>
                                        <NavLink
                                          to={`${url}/profile`}
                                          onClick={() => {
                                            dispatch(
                                              getAUserProfile(
                                                comment.userId &&
                                                  comment.userId._id
                                              )
                                            );
                                          }}
                                        >
                                          {comment.userId &&
                                            comment.userId.fullName}
                                        </NavLink>
                                      </span>
                                      <small className="grey-text ml-2">
                                        {moment(comment.createdAt).fromNow()}
                                      </small>
                                      <p className="feed-para">
                                        {comment.text}
                                      </p>
                                      {comment.imageUrl && (
                                        <div
                                          className="feed-comment-image rounded-3 my-3 image-fluid"
                                          style={{
                                            backgroundImage: `url(${comment.imageUrl})`,
                                          }}
                                        ></div>
                                      )}
                                      <div>
                                        <span
                                          className="mr-4 cursor "
                                          onClick={() => {
                                            if (
                                              comment.likes &&
                                              comment.likes.includes(user._id)
                                            ) {
                                              //remove like
                                              dispatch(
                                                unlikeAPostComment(comment._id)
                                              );
                                            } else {
                                              //add like
                                              dispatch(
                                                likeAPostComment(comment._id)
                                              );
                                            }
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              comment.likes &&
                                              comment.likes.includes(user._id)
                                                ? faThumbsUp
                                                : secondThumbsUp
                                            }
                                            size="lg"
                                            className="mr-1 like-button"
                                          />
                                          {comment.likes &&
                                            comment.likes.length}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Route>
          </div>
        </div>
        <div className="col-12 col-md-3 sticky-part sticky-part-two hide-900 pb-5">
          <div id="feedsRightSideSection" className="p-3 ">
            <div className="who-to-follow row justify-content-between align-items-center  border-bottom py-2  grey-border">
              <h1 className="">Who to follow</h1>
            </div>

            {usersToFollow.length === 0 && (
              <CustomEmpty text="Oops, nothing here yet!" />
            )}
            {usersToFollow.map((item) => (
              <WhoTofollow follower={item} />
            ))}
            <div className="py-2">
              <span className="green cursor">
                <NavLink to={`${url}/connections`}>Show more</NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
