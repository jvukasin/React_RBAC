import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

import Card from "../layouts/Card";

const thArray = ["ID", "Name", "Edit", "Delete"];
const tdArray = [
    ["1", "Data Entry Person", "Edit", "Delete"],
    ["2", "Data Specialist",  "Edit", "Delete"],
    ["3", "Study Director",  "Edit", "Delete"],
    ["4", "Data Manager",  "Edit", "Delete"],
    ["5", "Monitor",  "Edit", "Delete"]
];

class Inventory extends Component {
  isActionAllowed = (actionName = "") => {
    // return (this.props.actions.indexOf(actionName) >= 0) ? true : false;
    return true;
  }

  render() {
    console.log(this.props);
    return (
      <div className="content">
        <Container fluid>
        <Row>
          <Col md={12} right>  
          {this.isActionAllowed('create-user') &&
             <button className="btn btn-fill btn-warning float-right" type="button">Create Role</button>
           }
          </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Roles"
                category="List of the Roles"
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
    );
  }
}

export default Inventory;