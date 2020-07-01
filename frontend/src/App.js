import React, { Component } from "react";
import "./App.css";
import Main from "./Components/Main";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPencilAlt,
  faUsers,
  faCalendarAlt,
  faPlus,
  faSearch,
  faMapMarkerAlt,
  faSuitcase,
  faEnvelope,
  faComments,
  faUserCircle,
  faLocationArrow,
  faChartPie,
  faListUl,
  faPlug,
  faScroll,
  faEdit,
  faAt,
  faKey,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPencilAlt,
  faUsers,
  faCalendarAlt,
  faPlus,
  faSearch,
  faMapMarkerAlt,
  faSuitcase,
  faEnvelope,
  faComments,
  faUserCircle,
  faLocationArrow,
  faChartPie,
  faListUl,
  faPlug,
  faScroll,
  faEdit,
  faAt,
  faKey,
  faSignOutAlt
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
