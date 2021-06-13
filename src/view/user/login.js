import React, {useState} from "react";
import {Label, FormGroup, Button, Form, Input, Card, CardBody, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import './user.css';
import axios from 'axios';
import img from '../../doc.png';
import patImg from '../../pat.png';

const Login = ({match}) => {
    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let title = "";
    let logoImg = "";
    if(match.path.indexOf("doctor") > 0) {
        title = "Doctor";
        logoImg = img;
    } else if(match.path.indexOf("patient") > 0) {
        title = "Patient";
        logoImg = patImg;
    }

    const handleEmailChange = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let url = "http://localhost:7500/APITutorial/user?email=" + email + "&password=" + password;
  
        axios.get(url, {
            mode: 'no-cors',
        }).then(res => {
            if(res.status == 200) {
                var userObject = res.data[0];
                localStorage.setItem('userObject', JSON.stringify(userObject));
                history.push("/"+ title.toLowerCase());
            }
        });
    }

    return (
        <div className="container">
        <Row className="h-100 justify-content-center header">
            <h2>{title} Login</h2>
        </Row>
        <Row className="h-100 pro">
            <Col xxs="3" md="3" className="mx-auto my-auto">
                <img alt="logo" src={logoImg} className="doc"></img>
            </Col>
            <Col xxs="6" md="6" className="mx-auto my-auto">
                <Card>
                    <CardBody>
                        <Form className="av-tooltip tooltip-label-bottom">
                            <FormGroup className="form-group has-float-label">
                                <Label className="lbl"> Email </Label>
                                <Input className="form-control" type="email" name="email" onChange={handleEmailChange}/>
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                                <Label className="lbl"> Password </Label>
                                <Input className="form-control" type="password" name="password" onChange={handlePasswordChange}/>
                            </FormGroup>
                            <div className="d-flex justify-content-between align-items-center">
                            <Link to={"/register/" + title.toLowerCase()}>
                                Register
                            </Link>
                            <Button color="primary" size="lg" type="submit" onClick={handleSubmit}>Login</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        </div>
    )
}

export default Login