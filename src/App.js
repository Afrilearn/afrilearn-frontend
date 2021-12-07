import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { loadUser } from "./redux/actions/authActions";
import { getCourses } from "./redux/actions/courseActions";
import Navigation from "./components/includes/nav.component";
import WhiteVersionNav from "./components/whiteVersion/common/navigation/nav.component";
import ReactGA from "react-ga";
import FeedBackPopUp from "./components/includes/FeedBackPopUp/FeedBackPopUp";
import moment from "moment";
import DownloadAppsPopUp from "./components/includes/DownloadAppsPopUp/DownloadAppsPopUp";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    //FeedBack Pop Up
    setTimeout(() => {
      const lastFeedBack = localStorage.getItem("afriLearn:lastFeedBack");
      const feedBackStatus = localStorage.getItem("afriLearn:feedBackStatus");
      const monthsSinceLastFeedBack = moment().diff(
        moment(lastFeedBack),
        "months"
      );
      const isAuthenticated = store.getState().auth.isAuthenticated;
      const daysSinceLastFeedBack = moment().diff(moment(lastFeedBack), "days");
      const userRegisteredMoreThan24HoursAgo =
        moment().diff(moment(store.getState().auth.user.createdAt), "hours") >=
        24;

      if (isAuthenticated && userRegisteredMoreThan24HoursAgo) {
        if (feedBackStatus) {
          if (feedBackStatus === "skipped") {
            if (!lastFeedBack || daysSinceLastFeedBack >= 7) {
              setShowFeedBackPopUp(true);
            }
          }
          if (feedBackStatus === "submitted") {
            if (!lastFeedBack || monthsSinceLastFeedBack >= 3) {
              setShowFeedBackPopUp(true);
            }
          }
        } else {
          if (!lastFeedBack || daysSinceLastFeedBack >= 7) {
            setShowFeedBackPopUp(true);
          }
        }
      }

      // const isAuthenticated = store.getState().auth.isAuthenticated;
      // if (
      //   !localStorage.getItem("afriLearn:lastFeedBack") ||
      //   moment().diff(
      //     moment(localStorage.getItem("afriLearn:lastFeedBack")),
      //     "days"
      //   ) >= 7
      // ) {
      //   if (isAuthenticated) {
      //     setShowFeedBackPopUp(true);
      //   }
      // }
    }, 30000);

    //FeedBack Pop Up
    setTimeout(() => {
      if (
        !localStorage.getItem("afriLearn:downloadAppPopUp") ||
        moment().diff(
          moment(localStorage.getItem("afriLearn:downloadAppPopUp")),
          "days"
        ) >= 7
      ) {
        setShowDownloadAppsPopUp(true);
      }
    }, 100000);
    ReactGA.initialize("UA-141691274-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  const [showDownloadAppsPopUp, setShowDownloadAppsPopUp] = useState(false);
  const [showFeedBackPopUp, setShowFeedBackPopUp] = useState(false);

  return (
    <Provider store={store}>
      <FeedBackPopUp
        visible={showFeedBackPopUp}
        toggleModal={() => setShowFeedBackPopUp(false)}
      />
      <DownloadAppsPopUp
        visible={showDownloadAppsPopUp}
        toggleModal={() => setShowDownloadAppsPopUp(false)}
      />
      <Navigation />
    </Provider>
  );
};
export default App;
