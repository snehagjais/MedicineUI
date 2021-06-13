import React, {useState, useEffect} from "react";
import {Button, Label, Row, Table } from "reactstrap";
import axios from 'axios';
import './prescription.css';

const UserPrescription = () => {
    const [prescription, setPrescription] = useState();
    const [medicines, setMedicines] = useState([]);

    var userObject = JSON.parse(localStorage.getItem('userObject'));
    var problem = JSON.parse(localStorage.getItem('problem'));

    useEffect(() => {
        const getPrescription = () => {
          let url = "http://localhost:7500/APITutorial/prescription?userId="+userObject.id +"&problemId=" + problem.problemId;
          axios.get(url, {
            mode: 'no-cors',
          }).then(res => {
            setPrescription(res.data[0]);
            setMedicines(JSON.parse(res.data[0].medicines));
          });
        }
  
        getPrescription();
    }, []);

    const medicineList = medicines.map((med) => {
        return (
            <tr>
                <td>{med.name}</td>
                <td>{med.composition}</td>
                <td>{med.dose}</td>
                <td>{med.type}</td>
            </tr>
        )
    });

    const print = (event) => {
        event.preventDefault();
        window.print();
    }
    
    return (
        <>
        <Row className="h-100 justify-content-center header">
            <h2>User Prescription</h2>
        </Row>

        <div className="left">
            <Row className="justify-content-start left">
                <Label className="lab">Doctor Name : </Label>
                {prescription ? prescription.doctorName : ""}
            </Row>
            <Row className="justify-content-start left">
                <Label className="lab">User Name : </Label>
                {prescription ? prescription.userName : ""}
            </Row>
            <Row className="justify-content-start left">
                <Label className="lab">Doctor's Suggestion : </Label>
                {prescription ? prescription.description : ""}
            </Row>
            <Row className="justify-content-start left">
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
                <Button color="primary" onClick={print}>Print</Button>
            </Row>
        </div>
        </>
    )
}

export default UserPrescription