import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, {Component} from "react";
import Button from "react-bootstrap/button";
//import Label from "react-bootstrap/Label";
import axios from "axios";
import Sidebar from "./Sidebar";
import Cookies from "universal-cookie";
import {useDispatch,useSelector} from "react-redux";
class User_list_component extends Component
{
	deleteuser(event)
	{
		axios.post("http://localhost:8000/deleteuser",{id : event}).then(response => {

			alert('user succesfully deleted');
			window.location.href="users_list";
		});
	};
	constructor(props){
		super()
		const cookie = new Cookies();
    		if(cookie.get("name")==null)
    		{
    			window.location.href="login";
    		}
		 this.state={ 
		 	values : [],
		 };
			//document.write("value");
			//console.log("value");
			 //axios.get("http://localhost:8000/deleteuser/{this.id}").then(response=>{
			// 	window.location.href="userlist";
			 //});
			 //window.location.href="list";
		//axios.get("http://localhost:8000/userlist").then(response => this.setState({value :response.data}) );
		axios.get("http://localhost:8000/userlist").then(response => { this.setState({values : response.data});});;
		//axios.get("http://localhost:8000/deleteuser",[{}]).then(response => { this.setState({values : response.data});});
		
	}


	render(){
		return(
			<div className="Container">
			<Sidebar/>
			<br/><br/>
			<div className="rightdisplay">
			<>
			 {this.state.values.map((arr)=>
		 		<div>
		 	<label className="blue_color" value = {arr.id}>{arr.id}</label>
		 	<button value = {arr.id} onClick={()=>this.deleteuser(arr.id)}>Delete </button><br/><br/>
		 	<a href="#" className="link_class" > {arr.email} </a> <br/><br/><hr/>
		 		</div>
		 	)}
			</>
			</div>
			</div>
			)
	}		
	
}

export default User_list_component;