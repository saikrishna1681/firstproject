import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//import './App.css';
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";
import React from "react";
import { MDBContainer } from "mdbreact";
//import { Bar } from "react-chartjs-2";
import axios from "axios";
import  {Component} from "react";
import Cookies from "universal-cookie";
import cakereducer from "../reducers/cakereducer";
class Sidebar extends Component
{
  changepassword(event)
  {
    window.location.href="changepassword";
  }
  logoutuser(event)
  {
      const cook = new Cookies();
      cook.remove("name");
      localStorage.removeItem("name");
      window.location.href="login";
  }
  constructor()
  {
    const a=localStorage.getItem("name");
    super();   
       
    this.state = {
      name : a,
      admin : 0,
    };
    console.log(this.state.name);
  }
  componentDidMount()
  {
    const cookie = new Cookies();
    const id = cookie.get("name");
    axios.post("http://localhost:8000/getadminstatus",{id: id}).then(response=>{
        this.setState({admin:parseInt(response.data)});
    });
  }
    //const a = cookie.get("name");
    //this.setState({name : a});
    //axios.get("http://localhost:8000/checkcookie").then(response =>{
    //   if(response.data == "no")
    //   {
    //     window.location.href="login";
    //   }
    //   else
    //   {
    //      this.setState({name : response.data})
    //   }
    // });
	


  render(){
    return(
  <div>
    
      <>
      <ul className="horizontalbar">
     <li >
     <label> Welcome  {this.state.name} </label>
     <label>____________ </label>
     <button onClick={this.logoutuser}> Logout </button>
     <button onClick={this.changepassword}> Change Password </button> </li>
     </ul>
    </>
    
    <nav className="sideBar">
    <a href="dashboard">DashBoard</a><br/>
    {(this.state.admin)? <a href="users_list"> View Users </a> : <></>}
    {(this.state.admin)? <a href="tasklistall"> View All tasks </a> : <></>} <br/>
    <a href="tasklist">My Tasks</a>
    
    </nav>
    </div>
    )
	}
}
export default Sidebar;