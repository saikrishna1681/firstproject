import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";
import React from "react";
import Cookies from "universal-cookie";
const Signup=()=> {
	return(
	<div className="Signup">
    <br/>
    <br/>
    <h1>Signup </h1>
    <Form action="http://localhost:8000/createuser/" method="POST">
    <Form.Group >
     <Form.Label > User Name < /Form.Label> 
     <Form.Control type="text" name="username" placeholder="User Name" /> 
     <br/>
     <Form.Label> Password </Form.Label> 
     <Form.Control type="password" name="password" placeholder="Password" color='Red' /> 
     <Form.Text>Password must be atleast 8 characters long</Form.Text>
     <br/>
     <br/>
     <Form.Label > Email < /Form.Label> 
     <Form.Control type="email" name="email" placeholder="Email" /> 
     <br/>
     <Button variant="primary" type="submit"> Submit </Button>
    </Form.Group><br/>
    <Form.Group>
    <Form.Text>Already have an account? </Form.Text>
    <a href="login" > Click here </a>
    </Form.Group><br/>
    <Form.Group>
    <Form.Text>Forgot password </Form.Text>
    <a href="forgotpassword" > Click here </a>
    </Form.Group>
    </Form>
    </div>
	);
}
export default Signup;