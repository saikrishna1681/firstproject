import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, {Component} from "react";
//import Button from "react-bootstrap/button";
//import Label from "react-bootstrap/Label";
import axios from "axios";
import Cookies from "universal-cookie";
class Dropuserlist extends Component
{
	constructor()
	{
		super();
		const cookie = new Cookies();
    		if(cookie.get("name")==null)
    		{
    			window.location.href="login";
    		}
		this.state={values : [],};
		axios.get("http://localhost:8000/userlist").then(response => {this.setState({values : response.data});});

	}
	render()
	{
		return(
		<select class="form-select" name="userlist">
		{this.state.values.map(arr => 
			<option value= {arr.id} key={arr.id} > {arr.id} {arr.username} </option> 
		)}
		</select>
		)
	}

}
export default Dropuserlist;