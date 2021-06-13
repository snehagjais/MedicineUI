import React, { useState, useEffect } from "react";
import './medicines.css';
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
    ModalFooter,
  } from "reactstrap";
import { useHistory } from "react-router-dom";

const Medicines = (props) => {
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = async() => {
    setModal(!modal);
  }

  const [state, setState] = useState([]);
  const [selecteMedicines, setSelectedMedicines] = useState([]);

  const [medicines, setMedicines] = useState([{
    "quantity":2,
    "composition":"Ofloxacin, Ornidazole",
    "effective_for":"Antibiotic",
    "company_name":"Anphar Organics",
    "medicine_name":"Zanocin-OZ",
    "type":"Tablet",
    "unit_price":140.0
  }]);

  useEffect(() => {
    var problem = JSON.parse(localStorage.getItem('problem'));
    let url = "http://localhost:7500/APITutorial/medicine/by?filter=symptom&name=" + problem.symptom;

      const getMedicines = async() => {
        axios.get(url, {
          mode: 'no-cors',
        }).then(res => {
          setMedicines(res.data);
        });
      }

      getMedicines();
  }, []);

  const handleTypeChange = (event) => {
    event.preventDefault();
    setState({...state, name: event.target.value });
  }

  const handleValueChange = (event) => {
    event.preventDefault();
    setState({...state, value: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let url = "http://localhost:7500/APITutorial/medicine";
    let name = state.name.toLowerCase();
    let value = state.value.toLowerCase();

    if(name == "company") {
      url = url + "/company?name=" + value;
    } else if(name == "medicine") {
      url = url + "/medicinename?name=" + value;
    } else {
      url = url + "/by?filter=" + name + "&name=" + value;
    }
    
    axios.get(url, {
      mode: 'no-cors',
    }).then(res => {
      setMedicines(res.data);
    });

    toggle();
  }

  const clearFilter = (event) => {
    event.preventDefault();

    let url = "http://localhost:7500/APITutorial/medicine/all";
    axios.get(url, {
      mode: 'no-cors',
    }).then(res => {
      setMedicines(res.data);
    });
  }

  const getDoseText = (type) => {
    let text = "";
    if(type == "Tablet") {
      text = " dose per day";
    } else {
      text = " times per day";
    }
    return text;
  }

  const addMedicineList = (medicine) => {
    let list = selecteMedicines;
    list.push(medicine);
    setSelectedMedicines(selecteMedicines);
  }

  const createPrescription = (event) => {
    event.preventDefault();

    localStorage.setItem('medicineList', JSON.stringify(selecteMedicines));
    history.push("/doctorPresciption");
  }

  const medicineList = medicines.map((medicine) => {
    return (
      <div class="d-flex flex-row mb-4 card">
          <div class=" d-flex flex-grow-1 min-width-zero">
              <div class="align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero card-body">
                  <div class="w-40 w-sm-100">
                      <div class="mb-2 card-subtitle">{medicine.medicine_name}</div>
                  </div>
                  <div class="w-15 w-sm-100">
                      <div class="mb-2 card-subtitle">{medicine.effective_for}</div>
                  </div>
                  <div className="w-15 w-sm-100">
                      <p class="text-muted text-small mb-2 card-text">{medicine.quantity + getDoseText(medicine.type)}</p>
                  </div>
                  <div className="w-15 w-sm-100">
                      <p class="text-muted text-small mb-2 card-text">{medicine.type}</p>
                  </div>
                  <div className="w-15 w-sm-100">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => addMedicineList(medicine)}></input>
                  </div>
              </div>
          </div>
      </div>
    )
  })

    return (
        <div>
            <div className="mb-2">
                <div className="text-zero top-right-button-container">
                    <Button color="info" onClick={toggle}
                        style={{ marginRight: "20px" }}>
                        <i className="iconsminds-filter-2"/>Filter
                    </Button>
                    <Button color="light" onClick={clearFilter}
                        style={{ marginRight: "20px" }}>
                        <i className="iconsminds-delete-file"/>Clear Filter
                    </Button>
                    
                    <Button color="primary" onClick={createPrescription}>Create Prescription</Button>
                </div>
            </div>
           
            <hr></hr>

            {medicineList}

            <Modal isOpen={modal} toggle={toggle} className="modal-demo">
                <ModalHeader toggle={toggle}>Filter</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleDept">Filter</Label>
                            <Input type="select" name="select" id="exampleDept" onChange={handleTypeChange}>
                              <option>Select</option>
                              <option value="symptom">Symptom</option>
                              <option value="company">Company Name</option>
                              <option value="medicine">Medicine Name</option>
                              <option value="composition">Compositon</option>
                              <option value="symptom">Supplements</option>
                              <option value="type">Type</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleValue">Filter Value</Label>
                            <Input type="name" required name="name" placeholder="FilterValue" onChange={handleValueChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Medicines
