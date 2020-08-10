import React, {Component} from 'react'
import Sidebar from './Sidebar';
import LoginForm from './Login'
import RegisterForm from './Register'
import { Route, Switch } from "react-router-dom";

//za routes izvlacim iz baze njegove rute
import routes from "../mockRoutes/routes";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          color: "black",
          hasImage: true,
          fixedClasses: "dropdown show-dropdown open"
        };
    }

    getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/home") {
            return (
              <Route
                path={prop.layout + prop.path}
                render={props => (
                  <prop.component
                    {...props}
                    allowedActions={prop.actions}
                    handleClick={this.handleNotificationClick}
                  />
                )}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      };

    getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
        if (
        this.props.location.pathname.indexOf(
            routes[i].layout + routes[i].path
        ) !== -1
        ) {
        return routes[i].name;
        }
    }
    return "Brand";
    };
    
    render() {
        return (
            <div>
                <Sidebar {...this.props} routes={routes} image={this.state.image}
                        color={this.state.color}
                        hasImage={this.state.hasImage}/>
                <div id="main-panel" className="main-panel" ref="mainPanel">
                <Switch>{this.getRoutes(routes)}</Switch>
                </div>
            </div>
        )
    }
}

export default Home;