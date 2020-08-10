import React, {Component} from 'react'
import { NavLink } from "react-router-dom";
import NavbarLinks from "./Navbar/NavbarLinks";

import logo from "../logo.svg";

class Sidebar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        width: window.innerWidth
      };
    }

    activeRoute(routeName) {
      return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    render() { 
      return (
        <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}>
          {this.props.hasImage ? (
            <div className="sidebar-background" style={{backgroundColor: '#17252A'}} />
          ) : (
            null
          )}
        <div className="logo">
          <a
            href="home"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
            href="home"
            className="simple-text logo-normal"
          >
            MSc Project 
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <NavbarLinks /> : null}
            {this.props.routes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    )}
}

export default Sidebar;