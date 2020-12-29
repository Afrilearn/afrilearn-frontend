import React from "react";
import { Provider } from 'react-redux';
import store from './redux/store';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import Navigation from './components/includes/nav.component';

const App = () => {
 
  return (  
    <Provider store={store}>
      <Navigation/>
    </Provider> 
  );
};
export default App;