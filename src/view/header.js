import React from "react";
import { useHistory } from "react-router";
import {Button} from "reactstrap";

const Header = () => {
    const history = useHistory();

    const logOut = (event) => {
        event.preventDefault();
        history.push("/");
    }
    
    return (
        <div className="App-header">
            <div className="row">
                <div className="col-10">
                    <h1>SMART HEALTH CONSULTING</h1>
                </div>
                <div className="col-2">
                    <Button color="secondary" className="log" onClick={logOut}>LogOut</Button>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default Header;