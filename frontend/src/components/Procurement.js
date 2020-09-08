import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Modal} from 'react-bootstrap'
import { Container, Row, Col } from "react-bootstrap";
import Card from "../layouts/Card";
import ModalBody from './modals/NewProcurementModal'
import ProcurementCard from '../layouts/ProcurementCard'
import Services from '../services/Services'
import Swal from 'sweetalert2';

class Procurement extends Component {

    constructor() {
        super()
        this.state = {
            showModal: false,
            modalProcurements: false,
            listP: [],
            itemList: []
        }

        this.handleModal = this.handleModal.bind(this)
        this.handleModalProcurements = this.handleModalProcurements.bind(this)
        this.changeItemListState = this.changeItemListState.bind(this)
    }

    componentDidMount() {
        Services.getAllProcurements().then(response => {
            this.setState({listP: response.data})
        })
    }

    handleModal() {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    handleModalProcurements() {
        this.setState(prevState => ({
            modalProcurements: !prevState.modalProcurements
        }))
    }

    handleProcurementList = (newElement) => {
        this.setState(prevState => ({
            listP: [...prevState.listP, newElement]
          }))
    }

    changeItemListState(list) {
        this.setState({itemList: list})
    }

    completeProcurement = (id) => {
        Services.completeProcurement(id).then(response => {
            let newProc = response.data
            let items = [...this.state.listP];
            items[id-1] = newProc;
            this.setState({listP: items});
            Swal.fire({
                title: 'Success!',
                text: 'Procurement completed',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        })
    }

    isActionAllowed = (actionName = "") => {
        let numbb = this.props.allowedActions.map(function(a) { return a.actionUrl; }).indexOf(actionName);
        return (numbb >= 0) ? true : false;
    }
    
    render() {
        var changeItemListState = this.changeItemListState;
        const canComplete = this.isActionAllowed('complete-procurement')
        const items = (this.state.itemList && this.state.itemList.length > 0) ?
            this.state.itemList.map((item, index) =>
            <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
            </tr>
        ) : ''
        return (
            <div className="content contentDiv">
                <Modal show={this.state.showModal} onHide={() => this.handleModal()} size="lg">
                    <Modal.Header closeButton>
                        CREATE NEW PROCUREMENT
                    </Modal.Header>
                    <Modal.Body>
                        <ModalBody handleModal = {() => this.handleModal()} addProcurement = {this.handleProcurementList}/>
                    </Modal.Body>
                </Modal>
                <Container fluid>
                    <Row>
                        <Col md={12}>  
                        {this.isActionAllowed('create-procurement') &&
                            <button className="btn custom-green-btn" onClick={() => {this.handleModal()}} type="button"><FontAwesomeIcon icon={faPlus}/> New Procurement</button>
                        }
                        </Col>
                    </Row>
                    <Row>
                        {this.state.listP.length > 0 ? this.state.listP.map((prop, key) => {
                            return (
                                <Col md={6} key={prop.id}>
                                    <Modal show={this.state.modalProcurements} onHide={() => this.handleModalProcurements()} size="md" scrollable={true}>
                                    <Modal.Header closeButton>
                                        PROCUREMENT ITEMS
                                    </Modal.Header>
                                    <Modal.Body>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items}
                                            </tbody>
                                        </table>
                                    </Modal.Body>
                                </Modal>
                                    <Card
                                        title={"Procurement No. " + prop.id}
                                        content={
                                            <ProcurementCard
                                            procurement={prop}
                                            handleModal2={() => this.handleModalProcurements()}
                                            changeItemListState={changeItemListState.bind(this)}
                                            canComplete={canComplete}
                                            completeProcurement = {this.completeProcurement}
                                            />
                                        }
                                    />
                                </Col>
                            )
                        }) : <h4 style={{marginLeft: "5%"}}>No Procurements</h4>}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Procurement;