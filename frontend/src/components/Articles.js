import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import DataService from "../services/Services"
import Card from "../layouts/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Modal} from 'react-bootstrap'
import ModalBody from './NewArticleModal'

class Articles extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      showModal: false
    }
    this.getArticles = this.getArticles.bind(this)
    this.handleModal = this.handleModal.bind(this)
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

  handleModal() {
    this.setState(prevState => ({
        showModal: !prevState.showModal
    }))
  }

  handleArticleList = (newElement) => {
    this.setState(prevState => ({
      articles: [...prevState.articles, newElement]
      }))
}

  render() {
    return (
      <div className="content contentDiv">
        <Modal show={this.state.showModal} onHide={() => this.handleModal()} size="md">
          <Modal.Header closeButton>
              ADD NEW ARTICLE
          </Modal.Header>
          <Modal.Body>
              <ModalBody handleModal = {() => this.handleModal()} addArticle = {this.handleArticleList}/>
          </Modal.Body>
        </Modal>

        <Container fluid>
          <Row>
            <Col md={12}>
            {this.isActionAllowed('add-article') &&
                    <button className="btn custom-green-btn" type="button" onClick={() => this.handleModal()}><FontAwesomeIcon icon={faPlus}/>  Add article</button>
            }
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Articles"
                category="List of all articles"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Brand</th>
                        <th>Price (eur)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.articles.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.code}</td>
                          <td>{item.brand}</td>
                          <td>{item.price}</td>
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

export default Articles;