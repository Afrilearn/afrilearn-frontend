import React, { useEffect } from "react";
import { Provider } from "react-redux";
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


const App = () => {
  useEffect(() => {
    // store.dispatch(loadUser());
    // store.dispatch(getCourses());
  
  });
  
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export default App;

