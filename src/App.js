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
import AddTheoryQuestion from "./components/includes/AddTheoryQuestion/AddTheoryQuestion";
import ExamResults from "./components/screens/ExamResults/ExamResults";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    // store.dispatch(getCourses());
    ReactGA.initialize("UA-141691274-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export default App;
