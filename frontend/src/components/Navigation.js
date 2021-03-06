import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '../util/history';
import AuthService from '../services/AuthService';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends Component {
	constructor() {
		super()

		this.handleLogout = this.handleLogout.bind(this)
		this.handleTree = this.handleTree.bind(this)
		this.handleSubTree = this.handleSubTree.bind(this)
	}

	handleLogout() {
		AuthService.logout().then(response => {
			localStorage.removeItem('currentUser');
			history.push('/');
		})
		.catch(err => alert(err))
	};

	handleSubTree(parent, route) {
		var completeRoute = parent.url + route.url
		return <Dropdown key={route.url} className="dropright">
				<Dropdown.Toggle as={Link} className="nav-link textGrey">
					{route.title}
				</Dropdown.Toggle>
				<Dropdown.Menu>
				{route.children.map(child => {
						if(child.children.length > 0)
							return this.handleSubTree(route, child)
						return <LinkContainer key={child.url} className="nav-item textGrey" to={`${this.props.path}${completeRoute}${child.url}`}>
								<Dropdown.Item className="stayWhite">{child.title}</Dropdown.Item>
							</LinkContainer>
				})}
				</Dropdown.Menu>
			</Dropdown>
	}

	handleTree(parent, route) {
		if (route.children.length > 0) {
			return this.handleSubTree(parent, route)
		} else {
			return <LinkContainer key={route.url} className="nav-item textGrey" to={`${this.props.path}${parent.url}${route.url}`}>
				<NavDropdown.Item as={Link} className="stayWhite">{route.title}</NavDropdown.Item>
				</LinkContainer>
		}
	}

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
						return route.children.length > 0 ?
						<NavDropdown key={route.url} title={route.title} color="black">
							{route.children.map(child => {
								return this.handleTree(route, child)
							})}
						</NavDropdown> :
						<Link
							key={route.url}
							className="nav-link"
							to={`${this.props.path}${route.url}`}>
							{route.title}
						</Link>
						}
					)}
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
