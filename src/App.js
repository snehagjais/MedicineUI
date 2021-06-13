import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from './view/user/profile';
import Header from './view/header';
import Login from './view/user/login';
import Register from './view/user/register';
import Patient from './view/patients/patient';
import Doctor from './view/doctors/doctor';
import DoctorPrescription from './view/prescription/doctorPrescription';
import UserPrescription from './view/prescription/userPrescription';

class App extends React.Component {
  render() {

    return (
      <Router>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route path="/" exact component={Profile}/>
            <Route path="/login/doctor" component={Login} />
            <Route path="/login/patient" component={Login} />
            <Route path="/register/doctor" component={Register} />
            <Route path="/register/patient" component={Register} />
            <Route path="/patient" component={Patient}/>
            <Route path="/doctor" component={Doctor}/>
            <Route path="/prescription" component={UserPrescription}/>
            <Route path="/doctorPresciption" component={DoctorPrescription}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
