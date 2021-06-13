import React, {useState, useEffect} from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardTitle, CardText, CardSubtitle, Label, FormGroup, Form } from "reactstrap";
import DoctorsList from "../doctors/doctorsList";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './patient.css';
import StripeCheckout from "react-stripe-checkout";

const Patient = () => {
    const history = useHistory();
    const [reqModal, setReqModal] = useState(false);
    const [problems, setProblems] = useState([]);
    const [modalInfo, setModalInfo] = useState();

    const reqToggle = () => {
        setReqModal(!reqModal);
    }

    useEffect(() => {
        var userObject = JSON.parse(localStorage.getItem('userObject'));
        let url = "http://localhost:7500/APITutorial/problem?name=user&id="+userObject.id;
  
        const getProblems = async() => {
          axios.get(url, {
            mode: 'no-cors',
          }).then(res => {
            setProblems(res.data);
          });
        }
  
        getProblems();
    }, []);

    const detailClick = (problem) => {
        setModalInfo(problem);
        reqToggle();
    }

    const showPrescription = (problem) => {
        localStorage.setItem('problem', JSON.stringify(problem));
        history.push("/prescription");
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
                <Button color="secondary" onClick={reqToggle}>OK</Button>
            </ModalFooter>
        </Modal>
        );
    }

    const problemList = problems.map((problem) => {
        return (
            <Col sm="4" className="hea">
                <Card body>
                    <CardTitle tag="h5">{problem.userName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{problem.symptom}</CardSubtitle>
                    <CardText>{problem.desc}</CardText>
                    <CardText>{problem.sufferingDays}</CardText>
                    {problem.active ?
                        <Button color="primary" className="det" onClick={(e) => showPrescription(problem)}>View Prescription</Button> :
                        <Button color="primary" className="det" onClick={(e) => detailClick(problem)}>View Details</Button>
                    }
                </Card>
            </Col>
        );
    })

    return (
        <>
        <Row className="h-100 container">
            <h5 className="hea">Previous Problems</h5>
        </Row>
        <Row className="h-100 ">
            {problemList}
        </Row>
        <hr></hr>
        <Row className="h-100 justify-content-start">
            <h5 className="sea">Search for Doctor</h5>
            <Col xxs="12" md="12" className="left">
                <DoctorsList></DoctorsList>
            </Col>
        </Row>

        {reqModal ? <DetailModalContent></DetailModalContent> : null}
        </>
    )
}

export default Patient