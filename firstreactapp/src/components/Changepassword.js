import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";
import React from "react";
import axios from "axios";
import {Component} from "react";
import Cookies from "universal-cookie";

class Changepassword extends Component
{
	changepassword(event)
	{
		event.preventDefault();
		const data = new FormData(event.target);
		const old= data.get("old");
		const new_ = data.get("new");
		const cookieq = new Cookies();
		const username = cookieq.get("name");
		const newkey={user : username, old: old, new :new_};
		if(old.length*new_.length==0)
		{
			alert('the fields should not be empty');
		}
		else
		{
			axios.post("http://localhost:8000/changepassword",{user : username, old: old, new :new_})
			.then((response)=>{

				if(response.data=="yes")
				{
					alert("password changed succesfully");
					window.location.href="userhome";
				}
				else
				{
					alert("enter valid credentials");
				}
			});
		}
	}
	constructor()
	{
		super();
		const cookie = new Cookies();
    	if(cookie.get("name")==null)
    		{
    			window.location.href="login";
    		}

	}
	render()
	{
		return(
		<>
		<h1> Change Password </h1><br/>
		<form onSubmit={this.changepassword}>
		<label class="displaylabel"> Enter the Current password </label> 
		<input type="password" placeholder="current password" name="old" class="form-control"/> <br/>
		<label class="displaylabel"> Enter New password </label> 
		<input type="password" placeholder="new password" name="new" class="form-control"/> <br/>
		<Button variant="primary" type="submit"> Change Password </Button>
		</form>		

		</>

	);}
	
}
export default Changepassword;