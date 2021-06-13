import React, {useState, useEffect} from "react";
import {Button, ButtonToggle, Label, Row, Table, Modal, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';
import './prescription.css';
import { useHistory } from "react-router-dom";

const DoctorPrescription = () => {
    const history = useHistory();
    const [suggestion, setSuggestion] = useState();
    const [modal, setModal] = useState(false);
    
    const toggle = () => {
        setModal(!modal);
    }

    var userObject = JSON.parse(localStorage.getItem('userObject'));
    var problem = JSON.parse(localStorage.getItem('problem'));
    var medicines = JSON.parse(localStorage.getItem('medicineList'));

    const handleSubmit = (event) => {
        event.preventDefault();

        let medicineJson = medicines.map((med) => {
            return (
                {
                    "name" : med.medicine_name,
                    "composition": med.composition,
                    "dose" : med.quantity,
                    "type" : med.type
                }
            );
        });

        const prescrip = {
            "doctorName": userObject.name,
            "medicines" : JSON.stringify(medicineJson),
            "description" : suggestion == undefined ? "" : suggestion,
            "userName" : problem.userName,
            "userId" : problem.userId,
            "problemId" : problem.problemId
        }

        let url = "http://localhost:7500/APITutorial/prescription";
        axios.post(url, prescrip)
        .then(res => {
            console.log(res.data);
        });

        toggle();
    }

    const back = () => {
        toggle();
        history.push("/doctor");
    }

    const medicineList = medicines.map((med) => {
        return (
            <tr>
                <td>{med.medicine_name}</td>
                <td>{med.composition}</td>
                <td>{med.quantity}</td>
                <td>{med.type}</td>
            </tr>
        );
    });

    return (
        <>
        <Row className="h-100 justify-content-center header">
            <h2>Create Prescription</h2>
        </Row>

        <div className="left">
            <Row className="justify-content-start">
                <Label className="lab">Doctor Name : </Label>
                {userObject.name}
            </Row>

            <Row className="justify-content-start">
                <Label className="lab">User Name : </Label>
                {problem.userName}
            </Row>

            <Row className="justify-content-start">
                <Label className="lab">Add Extra Suggestion : </Label>
                <input className="des" placeholder="Add suggestion" type="textarea" name="text" onChange={(e) => setSuggestion(e.target.value)}></input>
            </Row>
            
            <Row className="justify-content-start">
                <Label className="lab">Medicine List : </Label>
                <br></br>
                <Table striped className="tab">
                    <thead>
                        <tr>
                        <th>Medicine Name</th>
                        <th>Composition</th>
                        <th>Dose</th>
                        <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicineList}
                    </tbody>
                </Table>
            </Row>

            <Row className="justify-content-start">
                <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </Row>

            <Modal isOpen={modal} toggle={toggle} className="modal-demo">
                <ModalBody>
                    User Prescription done !!
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={back}>OK</Button>
                </ModalFooter>
            </Modal>
        </div>
        </>
    )
}

export default DoctorPrescription