import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '../util/history';
import AuthService from '../services/AuthService';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends Component {
	constructor() {
		super()

		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		AuthService.logout().then(response => {
			localStorage.removeItem('currentUser');
			history.push('/');
		})
		.catch(err => alert(err))
	};

	render() {
		return (
			<Navbar bg="dark" variant="dark" style={{marginLeft: "-15px", marginRight: "-15px", paddingRight: "50px", paddingLeft: "50px"}}>
				<Navbar.Brand>
					<Link to="/app" style={{ color: '#fff' }}>
						MSc Warehouse
					</Link>
				</Navbar.Brand>
				<Nav className="mr-auto">
					{this.props.routes.map((route) => {
						if (route.children.length > 0)
							return <NavDropdown key={route.url} title={route.title} >
									{route.children.map(child => {
											return <LinkContainer key={child.url} className="nav-item textGrey" to={`${this.props.path}${route.url}${child.url}`}>
												<NavDropdown.Item className="stayWhite">{child.title}</NavDropdown.Item>
												</LinkContainer>
									})}
								</NavDropdown>
						return <Link
								key={route.url}
								className="nav-link"
								to={`${this.props.path}${route.url}`}>
								{route.title}
							</Link>
					})}
				</Nav>
				{this.props.routes.length ?
					(<button className="btn" onClick={this.handleLogout} style={{backgroundColor: '#f5d903'}}>Logout</button>)
					: null
				}
			</Navbar>
		);
	}
}

Navigation.propTypes = {
	routes: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	).isRequired,
	path: PropTypes.string.isRequired
};

export default Navigation;
