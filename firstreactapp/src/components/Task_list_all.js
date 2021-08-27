import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";
import React from "react";
import axios from "axios";
import {Component} from "react";
import Sidebar from "./Sidebar";
import Cookies from "universal-cookie";
//import Form from "react-bootstrap/form";

class Task_list_all extends Component
{
	filterbyname(event)
	{
		//const ele =document.getElementById("searchbar");
		//const key =ele.value;
		const key=this.state.searchvalue;
		//alert(this.state.searchvalue);
		if(key.length==0)
		{
			alert("enter a name to be filtered");
		}
		else{
		localStorage.setItem("filter",key);
		window.location.href="filtertask";
		}
	}
	change(event)
	{
		window.location.href="taskform"
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
			searchvalue:'0',
		};
		const aaa = cookie.get("name");
		axios.get("http://localhost:8000/tasklistall").then(response => {
			this.setState({tasks : response.data});
		});
		
	}
	render(){
		return(
			<>
			<Sidebar />
			<div className="rightdisplay1">
			<br/><br/>
			<input type="text" id="searchbar"  name="searchbar" className="search" placeholder="search tasks by name" onChange={(e)=>this.setState({'searchvalue':e.target.value})}  ></input> <button onClick={()=>this.filterbyname()}>  Search </button><br/><br/>
			<button onClick={this.change}  > Create new Task </button>  <br/><br/><br/><br/><hr/>
			<label className="label_class" > Assigned To </label>
			<label className="label_class" > Assigned by </label>
			<label className="label_class" > Title </label>
			<label className="label_class" > Description </label>
			<label className="label_class" > Date </label> 
			<label className="label_class" > Status </label>  <br/> <br/><hr/>
			</div>			
			{this.state.tasks.map((task) => 
				<div className="rightdisplay1">
				 <label className="blue_color1" name="title">{task.assignee} </label> 
				 <label className="blue_color1" name="title">{task.assignor} </label> 
				 <label className="blue_color1" name="title">{task.title} </label>
				 <label className="blue_color1" name="description">{task.description} </label>
				<label className="blue_color1" name="duedate">{task.due_date} </label>
				{(task.task_status==2)?<label className="blue_color1"> Task  Completed </label> : <></>}
				{(task.task_status==1)?<label className="blue_color1"> In Progress </label> : <></>}
				{(task.task_status==0)?<label className="blue_color1"> No activity </label> : <></>}	
				<button className="btn btn-primary"> Delete Task </button>
				<button className="btn btn-success"> Update Task </button>
				<br/><br/>
				<hr/> 
				</div>

			)}
			
			</>


		)
	}
}
export default Task_list_all;