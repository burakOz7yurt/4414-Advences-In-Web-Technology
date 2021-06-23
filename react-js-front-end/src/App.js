import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./authontication/login.component";
import Register from "./authontication/register.component";
import Profile from "./authontication/profile.component";
import HeaderComponent from "./components/HeaderComponent";
import UserAboutComponent from "./components/UserAboutComponent";
import StartScreen from "./components/StartScreen";
import AdvertsListComponent from "./components/AdvertsListComponent";
import TradesmenListComponent from "./components/TradesmenListComponent";

class App extends Component {


  render() {

    return (
      <div>
         <HeaderComponent></HeaderComponent>
          <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={StartScreen} />
            <Route exact path={["/home"]} component={TradesmenListComponent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={UserAboutComponent} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/alladverts" component={AdvertsListComponent} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
