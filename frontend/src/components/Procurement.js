import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Modal} from 'react-bootstrap'
import { Container, Row, Col, Table } from "react-bootstrap";
import Card from "../layouts/Card";
import ModalBody from './NewProcurementModal'
import ProcurementCard from '../layouts/ProcurementCard'

const thArray = ["ID", "Name", "Edit", "Delete"];
const tdArray = [
    ["1", "Data Entry Person", "Edit", "Delete"],
    ["2", "Data Specialist",  "Edit", "Delete"],
    ["3", "Study Director",  "Edit", "Delete"],
    ["4", "Data Manager",  "Edit", "Delete"],
    ["5", "Monitor",  "Edit", "Delete"]
];

const ListP = [ {id: 1, date: "01.04.2018.", status: "ORDERED"}]

class Procurement extends Component {

    constructor() {
        super()
        this.state = {
            showModal: false
        }

        this.handleModal = this.handleModal.bind(this)
    }

    handleModal() {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    isActionAllowed = (actionName = "") => {
        let numbb = this.props.allowedActions.map(function(a) { return a.actionUrl; }).indexOf(actionName);
        return (numbb >= 0) ? true : false;
    }
    
    render() {
        return (
            <div className="content contentDiv">
                <Modal show={this.state.showModal} onHide={() => this.handleModal()} size="lg">
                    <Modal.Header closeButton>
                        Create new procurement
                    </Modal.Header>
                    <Modal.Body>
                        <ModalBody handleModal = {() => this.handleModal()}/>
                    </Modal.Body>
                </Modal>
                <Container fluid>
                    <Row>
                        <Col md={12}>  
                        {this.isActionAllowed('create-procurement') &&
                            <button className="btn custom-green-btn" onClick={() => {this.handleModal()}} type="button"><FontAwesomeIcon icon={faPlus}/> New</button>
                        }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {ListP.map((prop, key) => {
                                return <ProcurementCard id={prop.id} date={prop.date} status={prop.status} />
                            })}
                            <Card
                            title="Procurement No. 3"
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
                                    {tdArray.map((prop, key) => {
                                    return (
                                        <tr key={key}>
                                        {prop.map((prop, key) => {
                                            return <td key={key}>{prop}</td>;
                                        })}
                                        </tr>
                                    );
                                    })}
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

export default Procurement;