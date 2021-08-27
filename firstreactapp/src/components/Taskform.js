import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, {Component} from "react";
import Button from "react-bootstrap/button";
//import Label from "react-bootstrap/Label";
import axios from "axios";
import Dropuserlist from "./Dropuserlist";
import Form from "react-bootstrap/form";
//import Sidebar from "./Sidebar";
import Cookies from 'universal-cookie';
class Taskform extends Component
{
	submittask(event){
			event.preventDefault();
			const cookie = new Cookies();
			const assignor = cookie.get("name");
			const data = new FormData(event.target);
			const title = data.get("title");
			const description = data.get("description");
			const date = data.get("date");
			const username = parseInt(data.get("userlist"));
			console.log(username);
			//const list= {username : 'sai' , password : 'sai'};
			const taskdetails = {title:title , description:description , duedate:date , name:username, assignor:assignor};
			axios.post("http://localhost:8000/assigntask",{title:title , description:description , duedate:date ,name:username, assignor:assignor}).then((response) =>
			{
				//console.log("fgfkjgdfggg");
				alert("task created");
				window.location.href="userhome";
			}

			);
		}
	constructor(props)
	{
		super();
		this.state ={
			username : "sai",
		};
		const cookie = new Cookies();
    		if(cookie.get("name")==null)
    		{
    			window.location.href="login";
    		}
	}
	render()
	{
		return(
		<div>
	
	<Form   onSubmit ={this.submittask} >
    <Form.Group >
     <Form.Label color="primary"> Title < /Form.Label> 
     <Form.Control type="text" name="title" placeholder="Title" /> 
    </Form.Group>
    <br/>
    <Form.Group>
     <Form.Label> Description </Form.Label> 
     <Form.Control name="description" placeholder="description" type="text"/>
    </Form.Group>
    <br/>
    <Form.Group>
    <Form.Label> Date </Form.Label>
    <Form.Control  name="date" type="date" />  
    </Form.Group>
    <br/>
    <Form.Group>
    	<Form.Label > Select the assignee </Form.Label>
    	<Dropuserlist/>
    </Form.Group>
    <br/>
    <Form.Group>
     <Button variant="primary" type="submit"  > Submit </Button>
    </Form.Group>
    </Form>
    </div>
		)
	}
}
export default Taskform;