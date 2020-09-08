import React, {useState, useEffect} from 'react'
import UserService from '../services/UserService'
import { Container, Row, Col } from "react-bootstrap";
import Service from '../services/Services'
import {Modal} from 'react-bootstrap'
import ModalBody from '../components/modals/AppointmentModal'
import Card from "../layouts/Card";
import ProcurementCard from '../layouts/ProcurementCard'

export default function Profile({allowedActions}) {

    const [user, setUser] = useState();
    const [procurements, setProcurements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalHR, setShowModalHR] = useState(false);
    const [itemList, setItemList] = useState();
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        UserService.getUser().then(response => {
            setUser(response.data);
        })
        Service.getUserProcurements().then(response => {
            setProcurements(response.data);
        })
    }, [])

    const isActionAllowed = (actionName = "") => {
        let numbb = allowedActions.map(function(a) { return a.actionUrl; }).indexOf(actionName);
        return (numbb >= 0) ? true : false;
    }

    const handleModalProcurements = () => {
        return (
            setShowModal(prevState => !prevState)
        )
    }

    const handleModalHR = () => {
        return (
            setShowModalHR(prevState => !prevState)
        )
    }

    const changeItemListState = (list) => {
        setItemList(list)
    }

    const handleAppointment = (appointmentInfo) => {
        setAppointment(appointmentInfo);
    }

    const items = (itemList && itemList.length > 0) ?
            itemList.map((item, index) =>
            <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
            </tr>
        ) : '';

    return (
        <Container fluid>
            <Modal show={showModalHR} onHide={() => handleModalHR()}>
                <Modal.Header closeButton>
                    MAKE APPOINTMENT
                </Modal.Header>
                <Modal.Body>
                    <ModalBody handleAppointment = {handleAppointment} actions={allowedActions} handleModal = {handleModalHR}/>
                </Modal.Body>
            </Modal>
            <div style={{marginLeft: "5%", marginRight: "5%", marginTop: "3%"}}>
                {user && 
                <div style={{marginBottom: "4%"}}>
                    <div className="row">
                    <div className="col-lg-9">
                        <h2>{user.name}</h2>
                    </div>
                    {Object.keys(appointment).length == 0 ?
                        (<div className="col-lg-3">
                            <button className="btn btn-primary" onClick={() => handleModalHR()}>Make HR appointment</button>
                        </div>)
                        :
                        (<div className="col-lg-3">
                            Scheduled appointment: <span style={{marginLeft: "3%"}}><button className="btn btn-link">Change</button></span><br/>
                            Date: {appointment.date} <br/> Time: {appointment.time}
                        </div>)
                    }
                    
                    </div>
                    
                    <p>Username: {user.username}</p>
                    <hr/>
                    <p>Role(s): {user.roles}</p>
                    <p>Email: {user.email}</p>
                    <p>Worker ID: {user.workerCode}</p>
                </div>
                }
                {isActionAllowed('my-procurements') && 
                <div>
                    <Row>
                        <p>My Procurements:</p>
                    </Row>
                    <Row>
                        {procurements.length > 0 &&
                        procurements.map((prop, key) => {
                            return (
                                <Col md={6} key={prop.id}>
                                    <Modal show={showModal} onHide={handleModalProcurements} size="md" scrollable={true}>
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
                                            handleModal2={handleModalProcurements}
                                            changeItemListState={changeItemListState}
                                            canComplete={false}
                                            />
                                        }
                                    />
                                </Col>
                            )
                        })
                        }
                    </Row>
                </div>
                }
            </div>
        </Container>
    )
};