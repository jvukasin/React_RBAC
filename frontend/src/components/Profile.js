import React, {useState, useEffect} from 'react'
import UserService from '../services/UserService'
import { Container, Row, Col } from "react-bootstrap";
import Service from '../services/Services'
import {Modal} from 'react-bootstrap'
import Card from "../layouts/Card";
import ProcurementCard from '../layouts/ProcurementCard'

export default function Profile() {

    const [user, setUser] = useState();
    const [procurements, setProcurements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemList, setItemList] = useState();

    useEffect(() => {
        UserService.getUser().then(response => {
            setUser(response.data);
        })
        Service.getUserProcurements().then(response => {
            setProcurements(response.data);
        })
    }, [])

    const handleModalProcurements = () => {
        return (
            setShowModal(prevState => !prevState)
        )
    }

    const changeItemListState = (list) => {
        setItemList(list)
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
            <div style={{marginLeft: "5%", marginRight: "5%", marginTop: "3%"}}>
                {user && 
                <div style={{marginBottom: "4%"}}>
                    <h2>{user.name}</h2>
                    <p>Username: {user.username}</p>
                    <hr/>
                    <p>Role(s): {user.roles}</p>
                    <p>Email: {user.email}</p>
                    <p>Worker ID: {user.workerCode}</p>
                </div>
                }
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
        </Container>
    )
};