import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import DataService from "../services/Services"
import StatsCard from "../layouts/StatCard"
import Card from "../layouts/Card";
import {Modal} from 'react-bootstrap'
import ModalBody from './modals/EditInventoryModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faBoxes, faUsers, faArrowAltCircleRight, faArrowAltCircleLeft, faWarehouse, faBuilding } from '@fortawesome/free-solid-svg-icons';

class Inventory extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      inventory: [],
      stats: {},
      showModal: false,
      item: {}
    }
    this.getInventory = this.getInventory.bind(this)
    this.getStats = this.getStats.bind(this)
    this.handleModal = this.handleModal.bind(this)
  }
  
  isActionAllowed = (actionName = "") => {
    let numbb = this.props.allowedActions.map(function(a) { return a.actionUrl; }).indexOf(actionName);
    return (numbb >= 0) ? true : false;
  }

  componentDidMount() {
    this.getInventory();
    this.isActionAllowed('system-stats') && this.getStats()
  }

  getInventory() {
    DataService.getInventory().then(response => {
      this.setState({ inventory: response.data})
    })
  }

  getStats() {
    DataService.getStats().then(response => {
      this.setState({stats: response.data})
    })
  }

  handleModal(data) {
    this.setState({item: data})
    this.setState(prevState => ({
        showModal: !prevState.showModal
    }))
  }

  changeQuantity = (data) => {
    let id = data.id
    let items = [...this.state.inventory];
    items[id-1] = data;
    this.setState({inventory: items});
  }

  render() {
    return (
      <div className="content contentDiv">
        <Modal show={this.state.showModal} onHide={() => this.handleModal()}>
            <Modal.Header closeButton>
                EDIT
            </Modal.Header>
            <Modal.Body>
                <ModalBody handleModal = {() => this.handleModal()} changeQuantity = {this.changeQuantity} item={this.state.item}/>
            </Modal.Body>
        </Modal>
        <Container fluid>
          {Object.keys(this.state.stats).length !== 0 &&
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                    bigIcon={<FontAwesomeIcon icon={faBoxes} style={{color:"burlywood"}}/>}
                    statsText="No. of inventory items"
                    statsValue={this.state.stats.noOfItems}
                    statsIcon={<FontAwesomeIcon icon={faWarehouse}/>}
                    statsIconText="In the warehouse"
                  />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                    bigIcon={<FontAwesomeIcon icon={faUsers} style={{color:"#3232ff"}}/>}
                    statsText="No. of employees"
                    statsValue={this.state.stats.noOfEmployees}
                    statsIcon={<FontAwesomeIcon icon={faBuilding}/>}
                    statsIconText="In the company"
                  />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                    bigIcon={<FontAwesomeIcon icon={faArrowAltCircleRight} style={{color:"orange"}}/>}
                    statsText="Ordered procurements"
                    statsValue={this.state.stats.orderedProcurements}
                    statsIcon={<FontAwesomeIcon icon={faCalendar}/>}
                    statsIconText="From 01.01.2020."
                  />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                    bigIcon={<FontAwesomeIcon icon={faArrowAltCircleLeft} style={{color:"green"}}/>}
                    statsText="Completed procurements"
                    statsValue={this.state.stats.completedProcurements}
                    statsIcon={<FontAwesomeIcon icon={faCalendar}/>}
                    statsIconText="From 01.01.2020."
                  />
            </Col>
          </Row>
          }
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Brand</th>
                        <th>Price (eur)</th>
                        <th>Quantity</th>
                        {this.isActionAllowed('edit-inventory') && <th>Edit</th> }
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.inventory.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.articleDTO.name}</td>
                          <td>{item.articleDTO.code}</td>
                          <td>{item.articleDTO.brand}</td>
                          <td>{item.articleDTO.price}</td>
                          <td>{item.quantity}</td>
                          {this.isActionAllowed('edit-inventory') && <td><button className="btn btn-link btn-small-padding" onClick={() => this.handleModal(item)}>Edit</button></td> }
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