import { Switch, Route, Link } from "react-router-dom";
import React, { Component } from 'react'
import AuthService from "../services/auth.service";
import "../App.css"
import UserService from "../services/user.service";

   {/*
       <div className="navbar-brand btn "
                    style={{backgroundColor:'red'}}
                    ><a href="https://javaguides.net" className="navbar-brand">Get My Adverts</a></div>
                   
    */}
 class HeaderComponent extends Component {
  
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
          kur:''
        };
      }
    
      componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        }

          UserService.getKur().then((res)=>{
              this.setState({ kur: res.data});
          });
      

      }
    
      logOut() {
        AuthService.logout();
      }
    
      render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
        return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
          Where is My Tradesmen?
          </Link>
          <div className="navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={"/alladverts"} className="nav-link ">
              Get All Adverts
              </Link>
            </li>
            <li >
              <Link to={"/home"} className="nav-link ">
              Get All Tradesmens
              </Link>
            </li>
            <h3 style={{backgroundColor:'yellow'}}>{this.state.kur}</h3>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item ">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item ">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        </div>       
        )
    }
}

export default HeaderComponent;