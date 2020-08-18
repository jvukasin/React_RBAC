import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import DataService from "../services/Services"

import Card from "../layouts/Card";

const thArray = ["ID", "Name", "Code", "Brand", "Price (eur)"];

class Inventory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
    this.getArticles = this.getArticles.bind(this)
  }
  
  isActionAllowed = (actionName = "") => {
    let numbb = this.props.allowedActions.map(function(a) { return a.actionUrl; }).indexOf(actionName);
    return (numbb >= 0) ? true : false;
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles() {
    DataService.getAllArticles().then(response => {
      this.setState({ articles: response.data})
    })
  }

  render() {
    return (
      <div className="content contentDiv">
        <Container fluid>
        <Row>
          <Col md={12}>
          </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Warehouse inventory"
                category="List of MSc inventory"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((item, index) => {
                          return <th key={index}>{item}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.articles.map((item) => (
                        <tr key={item.id}>
                          {Object.values(item).map((val, index) => (
                            <td key={index}>{val}</td>
                          ))}
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
    );
  }
}

export default Inventory;