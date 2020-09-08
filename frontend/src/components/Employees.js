import React, {Component} from 'react';
import { Container, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UserService from '../services/UserService'
import {Modal} from 'react-bootstrap'
import ModalUser from './modals/NewUserModal'

import Card from "../layouts/Card";

const thArray = ["Username", "Name", "Worker ID", "Email", "Role(s)"];

class Employees extends Component {

    constructor() {
        super()
        this.state = {
            showModal: false,
            userList: []
        }

        this.handleModal = this.handleModal.bind(this)
    }

    componentDidMount() {
        UserService.getAllUsers().then(response => {
            this.setState({userList: response.data})
        })
    }

    isActionAllowed = (actionName = "") => {
        let numbb = this.props.allowedActions.map(function(a) { return a.actionUrl; }).indexOf(actionName);
        return (numbb >= 0) ? true : false;
    }

    handleModal() {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    handleNewUser = (newUser) => {
        this.setState(prevState => ({
            userList: [...prevState.userList, newUser]
          }))
    }
    
    render() {
        return (
            <div className="content contentDiv">
                <Modal show={this.state.showModal} onHide={() => this.handleModal()}>
                    <Modal.Header closeButton>
                        ADD NEW EMPLOYEE
                    </Modal.Header>
                    <Modal.Body>
                        <ModalUser handleNewUser = {this.handleNewUser} handleModal = {this.handleModal}/>
                    </Modal.Body>
                </Modal>
            <Container fluid>
            <Row>
                <Col md={12}>  
                {this.isActionAllowed('add-employee') &&
                    <button className="btn custom-green-btn" type="button" onClick={() => this.handleModal()}><FontAwesomeIcon icon={faPlus}/>  Add employee</button>
                }
                </Col>
                </Row>
                <Row>
                <Col md={12}>
                    <Card
                    title="Employees"
                    category="List of all the warehouse employees"
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                        <Table striped hover>
                        <thead>
                            <tr>
                            {thArray.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                            })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.userList.map((item) => (
                                <tr key={item.username}>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.workerCode}</td>
                                    <td>{item.email}</td>
                                    <td>{item.roles}</td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>
                    }
                    />
                </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default Employees;