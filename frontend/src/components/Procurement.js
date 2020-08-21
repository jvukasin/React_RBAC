import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Modal} from 'react-bootstrap'
import { Container, Row, Col } from "react-bootstrap";
import Card from "../layouts/Card";
import ModalBody from './NewProcurementModal'
import ProcurementCard from '../layouts/ProcurementCard'

const ListP = [
    {id: 1, timeCreated: "01.Jan.2018. 14:05", timeFinished: "01.Jan.2018. 14:05", status: "ORDERED", seller: "Mika", procurer: "Pera", procurementItems:
    [{ id: 1, name: "Sony nesto", quantity: 5 }, { id: 2, name: "GoPro", quantity: 13 }]
    },
    {id: 2, timeCreated: "20.Apr.2019. 17:24", timeFinished: "01.Jan.2018. 14:05", status: "COMPLETED", seller: "Mika", procurer: "Pera", procurementItems: [{
        id: 2, name: "Sony nesto", quantity: 5
    }]}
]

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

    changeItemListState(list) {
        this.setState({itemList: list})
    }

    isActionAllowed = (actionName = "") => {
        let numbb = this.props.allowedActions.map(function(a) { return a.actionUrl; }).indexOf(actionName);
        return (numbb >= 0) ? true : false;
    }
    
    render() {
        var changeItemListState = this.changeItemListState;
        const canComplete = this.isActionAllowed('complete-procurement')
        const items = (this.state.itemList && this.state.itemList.length > 0) ?
            this.state.itemList.map((item) =>
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
            </tr>
        ) : ''
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
                            <button className="btn custom-green-btn" onClick={() => {this.handleModal()}} type="button"><FontAwesomeIcon icon={faPlus}/> New Procurement</button>
                        }
                        </Col>
                    </Row>
                    <Row>
                        {ListP.map((prop, key) => {
                            return (
                                <Col md={6} key={prop.id}>
                                    <Modal show={this.state.modalProcurements} onHide={() => this.handleModalProcurements()} size="md" scrollable={true}>
                                    <Modal.Header closeButton>
                                        Procurement Items
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
                                            canComplete={canComplete}/>
                                        }
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Procurement;