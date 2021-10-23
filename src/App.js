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
import ReactGA from "react-ga";
import FeedBackPopUp from "./components/includes/FeedBackPopUp/FeedBackPopUp";
import moment from "moment";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    //FeedBack Pop Up
    setTimeout(() => {
      const isAuthenticated = store.getState().auth.isAuthenticated;
      if (
        !localStorage.getItem("afriLearn:lastFeedBack") ||
        moment().diff(
          moment(localStorage.getItem("afriLearn:lastFeedBack")),
          "days"
        ) >= 7
      ) {
        if (isAuthenticated) {
          setShowFeedBackPopUp(true);
        }
      }
    }, 10000);
    //FeedBack Pop Up
    ReactGA.initialize("UA-141691274-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  const [showFeedBackPopUp, setShowFeedBackPopUp] = useState(false);

  return (
    <Provider store={store}>
      <FeedBackPopUp
        visible={showFeedBackPopUp}
        toggleModal={() => setShowFeedBackPopUp(false)}
      />
      <Navigation />
    </Provider>
  );
};
export default App;
