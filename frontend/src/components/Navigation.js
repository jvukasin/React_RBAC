import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '../util/history';

class Navigation extends Component {
	handleLogout = () => {
		history.push('/');
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
					{this.props.routes.map((route) => (
						<Link
							key={route.url}
							className="nav-link"
							to={`${this.props.path}${route.url}`}>
							{route.title}
						</Link>
					))}
				</Nav>
				<button className="btn" onClick={this.handleLogout} style={{backgroundColor: '#f5d903'}}>Logout</button>
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
