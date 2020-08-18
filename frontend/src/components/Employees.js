import React, {Component} from 'react';
import { Container, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Card from "../layouts/Card";

const thArray = ["ID", "Name", "Edit", "Delete"];
const tdArray = [
    ["1", "Data Entry Person", "Edit", "Delete"],
    ["2", "Data Specialist",  "Edit", "Delete"],
    ["3", "Study Director",  "Edit", "Delete"],
    ["4", "Data Manager",  "Edit", "Delete"],
    ["5", "Monitor",  "Edit", "Delete"]
];

class Employees extends Component {

    isActionAllowed = (actionName = "") => {
        let numbb = this.props.allowedActions.map(function(a) { return a.actionUrl; }).indexOf(actionName);
        return (numbb >= 0) ? true : false;
    }
    
    render() {
        return (
            <div className="content contentDiv">
            <Container fluid>
            <Row>
                <Col md={12}>  
                {this.isActionAllowed('add-employee') &&
                    <button className="btn custom-green-btn" type="button"><FontAwesomeIcon icon={faPlus}/>  Add employee</button>
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

export default Employees;