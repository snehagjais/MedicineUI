import React, { useState, useEffect } from "react";
import './doctors.css';
import axios from 'axios';
import {
  Button,
  Label,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router-dom";

const DoctorsList = (props) => {
  const history = useHistory();
  const [doctorType, setDoctorType] = useState([]);
  const [doctors, setDoctors] = useState([{
    "doctor_name":"Dr. Prasad Rao Voleti",
    "hospital_name": "Medanta The Medicity, Gurgaon",
    "experience":"44 years",
    "degree":"MBBS, MD",
    "fee":1800.0
  }]);

  const [modal, setModal] = useState(false);
  const [reqModal, setReqModal] = useState(false);

  const toggle = async() => {
    if(doctorType.length == 0) {
      getDoctorSet();
    }
    setModal(!modal);
  }

  const reqToggle = async() => {
    setReqModal(!reqModal);
  }

  const [state, setState] = useState([]);
  var userObject = JSON.parse(localStorage.getItem('userObject'));

  useEffect(() => {
      let url = "http://localhost:7500/APITutorial/doctors/all";

      const getDoctors = async() => {
        axios.get(url, {
          mode: 'no-cors',
        }).then(res => {
          setDoctors(res.data);
        });
      }

      getDoctors();
  }, []);

  const getDoctorSet = () => {
    var dSet = new Set();
    doctors.map((doc) => {
      dSet.add(doc.experience);
    })

    var list = [...dSet];
    setDoctorType(list);
  }

  const handleTypeChange = (event) => {
    event.preventDefault();
    setState({...state, name: event.target.value });
  }

  const handleSubmit = () => {
    var value = state.name;

    axios.get("http://localhost:7500/APITutorial/doctors/by?name=" + value, {
      mode: 'no-cors',
    }).then(res => {
      setDoctors(res.data);
    });

    toggle();
  }

  const clearFilter = (event) => {
    event.preventDefault();

    let url = "http://localhost:7500/APITutorial/doctors/all";
    axios.get(url, {
      mode: 'no-cors',
    }).then(res => {
      setDoctors(res.data);
    });
  }

  const handleDoctorIdChange = (event) => {
    setState({...state, doctorId: event.target.value });
  }

  const handleContactChange = (event) => {
    event.preventDefault();
    setState({...state, contact: event.target.value });
  }

  const handleAgeChange = (event) => {
    event.preventDefault();
    setState({...state, age: event.target.value });
  }

  const handleSymptompChange = (event) => {
    event.preventDefault();
    setState({...state, symptomp: event.target.value });
  }

  const handleDescChange = (event) => {
    event.preventDefault();
    setState({...state, desc: event.target.value });
  }

  const handleDayChange = (event) => {
    event.preventDefault();
    setState({...state, day: event.target.value });
  }

  const handleToken = (token) => {
    console.log(token);
    handleProblemSubmit();
  }

  const handleProblemSubmit = () => {

    const problem = {
      "contact": state.contact,
      "age": state.age,
      "symptom": state.symptomp,
      "desc": state.desc,
      "sufferingDays": state.day,
      "doctorId": state.doctorId,
      "userId": userObject.id,
      "active": true
    }

    let url = "http://localhost:7500/APITutorial/problem";
    axios.post(url, problem)
    .then(res => {
      console.log(res.data);
      if(res.status == 200) {
        reqToggle();
        window.location.reload();
      }
    });
  }

  const doctorList = doctors.map((doctor) => {
    return (
      <div class="d-flex flex-row mb-4 card">
          <div class=" d-flex flex-grow-1 min-width-zero">
              <div class=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero card-body">
                  <div class="min-width-zero w-20 w-sm-100">
                      <div class="space mb-1 card-subtitle">{doctor.doctor_name}</div>
                  </div>
                  <div className="w-15 w-sm-100">
                      <p class="text-muted text-small mb-2 card-text">{doctor.degree}</p>
                  </div>
                  <div className="w-15 w-sm-100">
                  <p class="text-muted text-small mb-2 card-text">{doctor.hospital_name}</p>
                  </div>
                  <div className="w-15 w-sm-100">
                      <p class="text-muted text-small mb-2 card-text">{doctor.experience}</p>
                  </div>
                  <div className="w-15 w-sm-100">
                    <p class="text-muted text-small mb-2 card-text">{doctor.fee} Consultation Fee</p>
                  </div>
                  <div className="w-15 w-sm-100">
                    <input class="form-check-input" type="checkbox" value={doctor.id} onClick={handleDoctorIdChange}></input>
                  </div>
              </div>
          </div>
      </div>
    )
  });

    return (
        <div className="doctorList">
            <div className="row mb-2">
              <div className="col">
                <Button color="info" onClick={toggle}>
                    <i className="iconsminds-filter-2"/>Filter
                </Button>
                <Button color="light" onClick={clearFilter}>
                    <i className="iconsminds-delete-file"/>Clear Filter
                </Button>
              </div>
              <div className="col justify-content-end">
                <Button color="info" onClick={reqToggle}>
                    Send Consultation Request
                </Button>
              </div>
            </div>

            {doctorList}

            <Modal isOpen={modal} toggle={toggle} className="modal-demo">
                <ModalHeader toggle={toggle}>Filter</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleDept">Filter</Label>
                            <Input type="select" name="select" disabled="true" id="exampleDept" onChange={handleTypeChange}>
                              <option>Type</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleValue">Filter Value</Label>
                            <Input type="select" name="select" onChange={handleTypeChange}>
                              {doctorType.map((doc) => {
                                return (<option>{doc}</option>)
                              })}
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={reqModal} toggle={reqToggle} className="modal-demo">
                <ModalHeader toggle={reqToggle}>Consultation Request</ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label for="exampleContact">Contact Number</Label>
                      <Input type="number" name="number" placeholder="Add your contact number" onChange={handleContactChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleAge">Age</Label>
                      <Input type="number" name="number" placeholder="Enter your age" onChange={handleAgeChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePr">Symptomps</Label>
                      <Input type="name" name="name" placeholder="Enter your Symptomps" onChange={handleSymptompChange}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleText">Description of the Problem</Label>
                      <Input type="textarea" name="text" onChange={handleDescChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Days Suffering from</Label>
                      <Input type="select" name="select" id="exampleSelect" onChange={handleDayChange}>
                        <option value="1">1 Day</option>
                        <option value="2">2 Days</option>
                        <option value="3">3 Days</option>
                        <option value="4">4 Days</option>
                        <option value="5">5 Days</option>
                      </Input>
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                    <StripeCheckout stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233" token={handleToken}></StripeCheckout>
                    {/* <Button color="primary" onClick={handleProblemSubmit}>Submit</Button>{' '} */}
                    <Button color="secondary" onClick={reqToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
          </div>
    )
}

export default DoctorsList
