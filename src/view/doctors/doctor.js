import React, {useState, useEffect} from "react";
import './doctors.css';
import Medicine from '../medicines/Medicine';
import axios from 'axios';
import {Label, FormGroup, Button, Form, CardSubtitle, Modal, ModalHeader, 
    ModalBody, ModalFooter, CardText, Card, CardTitle, Row, Col } from "reactstrap";

const Doctor = () => {
    
    const [reqModal, setReqModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [problems, setProblems] = useState([]);
    const [modalInfo, setModalInfo] = useState();

    useEffect(() => {
        var userObject = JSON.parse(localStorage.getItem('userObject'));
        let url = "http://localhost:7500/APITutorial/problem?name=doctor&id="+userObject.id;
  
        const getProblems = async() => {
          axios.get(url, {
            mode: 'no-cors',
          }).then(res => {
            setProblems(res.data);
          });
        }
  
        getProblems();
    }, []);

    const reqToggle = () => {
        setReqModal(!reqModal);
    }

    const toggle = async() => {
        reqToggle();
        setModal(!modal);
    }

    const detailClick = (problem) => {
        localStorage.setItem('problem', JSON.stringify(problem));
        setModalInfo(problem);
        reqToggle();
    }

    const DetailModalContent = () => {
        return (
            <Modal isOpen={reqModal} toggle={reqToggle} className="modal-demo">
            <ModalHeader toggle={reqToggle}>Patient Request</ModalHeader>
            <ModalBody>
                <Form>
                <FormGroup>
                    <Label for="exampleContact" className="lab">Contact Number</Label>
                    <Label>{modalInfo.contact}</Label>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleAge" className="lab">Age</Label>
                    <Label>{modalInfo.age}</Label>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePr" className="lab">Symptomps</Label>
                    <Label>{modalInfo.symptom}</Label>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText" className="lab">Description of the Problem</Label>
                    <Label>{modalInfo.desc}</Label>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect" className="lab">Days Suffering from</Label>
                    <Label>{modalInfo.sufferingDays + " days"}</Label>
                </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Search Medicine For Users</Button>
                <Button color="secondary" onClick={reqToggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        );
    }

    const problemList = problems.map((problem) => {
        return (
            <Col sm="4" className="justify-content-start">
                <Card body>
                    <CardTitle tag="h5">{problem.userName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{problem.symptom}</CardSubtitle>
                    <CardText>{problem.desc}</CardText>
                    <CardText>{problem.sufferingDays}</CardText>
                    {problem.active == false ?
                    <Button color="primary" className="det" onClick={(e) => detailClick(problem)}>View Details</Button> :
                    <Button color="primary" className="det" disabled="true">Already Prescribed</Button>
                    }
                </Card>
            </Col>
        );
    })

    return (
        <>
        <Row className="h-100 justify-content-center header">
            <h2>Patient Requests</h2>
        </Row>

        <Row className="justify-content-center">
            {problemList}
        </Row>

        <Modal isOpen={modal} toggle={toggle} className="modal-demo">
            <ModalHeader toggle={toggle}>Search Medicines</ModalHeader>
            <ModalBody>
                <Medicine></Medicine>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>

        {reqModal ? <DetailModalContent></DetailModalContent> : null}
        </>
    )
}

export default Doctor