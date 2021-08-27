import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";
import React from "react";
import axios from "axios";
import {Component} from "react";
import Sidebar from "./Sidebar";
import Cookies from "universal-cookie";
import {useSelector,useDispatch} from "react-redux";

class User_tasklist extends Component
{
	handlesubmit(event){
		//console.log(event);
		const a = document.getElementById(event*1);
		const status = parseInt(a.selectedOptions[0].value);
		if(a.selectedOptions[0].value=="0")
		{
			alert('select a valid call');
		}
		else
		{
			axios.post("http://localhost:8000/updatetaskstatus",{id : event,status:status}).then(response =>{
				alert("success");
				window.location.href="tasklist";
			});
		}

	}
	change()
	{
		window.location.href="taskform";
	}
	constructor(props){
		super(props);
		const cookie = new Cookies();
    		if(cookie.get("name")==null)
    		{
    			window.location.href="login";
    		}
		this.state = {
			tasks : [],
		};
	}
	componentDidMount(props){
		
		const cookie = new Cookies();
		const aaa = cookie.get("name");
		//axios.post("http://localhost:8000/getusernamefromid",{id : id}).then()
		axios.post("http://localhost:8000/getusertask",{name : aaa}).then(response => {
			this.setState({tasks : response.data});
		});
		
	}
	render(){
		return(
			<>
			<Sidebar />
			<br/><br/>
			<div className="rightdisplay1">
			<label className="label_class" > Assigned to </label>
			<label className="label_class" > Assigned by </label>
			<label className="label_class" > Title </label>
			<label className="label_class" > Description </label>
			<label className="label_class" > Date </label> 
			<label className="label_class"> Status </label>
			<label className="label_class"> selectstatus </label>
			<label className="label_class"> Update here </label>
			 <br/> <br/><hr/>
			</div>
			{this.state.tasks.map((task) => 
				<div className="rightdisplay1">
				<label className="blue_color1" name="ID">{task.id} </label>
				<label className="blue_color1" name="assignor">{task.assignor} </label>
				<label className="blue_color1" name="title">{task.title} </label>
				<label className="blue_color1" name="description">{task.description} </label>
				<label className="blue_color1" name="duedate">{task.due_date} </label>
				{(task.task_status==2)?<label className="blue_color1"> Task  Completed </label> : <></>}
				{(task.task_status==1)?<label className="blue_color1"> In Progress </label> : <></>}
				{(task.task_status==0)?<label className="blue_color1"> Task Due </label> : <></>}	
				<select id={task.id*1} name="information" class="leftalign">
				<option value= "0" > -- </option>
				<option value ="2"> Completed </option>
				<option value="1">In progress </option>
				</select> 
				<button value={task.id} onClick={()=>this.handlesubmit(task.id)} > Update Status </button> <br/> <hr/> 
				</div>)}
			
			</>


		)
	}
}
export default User_tasklist;