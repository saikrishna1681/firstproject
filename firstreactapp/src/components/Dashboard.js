import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, {Component} from "react";
import Button from "react-bootstrap/button";
//import Label from "react-bootstrap/Label";
import axios from "axios";
import Sidebar from "./Sidebar";
import Cookies from "universal-cookie";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import wait from "react";
import Piechart from 'highcharts-react-official';
//import await from "axios";
class Dashboard extends Component
{	
	constructor()
	{
		super();
		this.state = {values : [],options : {}};

	}
	componentDidMount()
	{
		//super();
		
    	const cookie = new Cookies();
		
    		if(cookie.get("name")==null)
    		{
    			window.location.href="login";
    		}
			//const name = cookie.get("name");
			const name= cookie.get("name");
			const title = {text: "Your Performance" };
			const data=[['Completed in time',],['Completed late',],['In Progress',],['No activity',],['Overdue',]]

			axios.post("http://localhost:8000/tasklistuserstats",{name : name}).then((response) => {
			this.setState({values: response.data});
			const color = ['green','green','red','green'];
			const options = {chart:{type : 'pie'},title: {text:'Your Performance'}, tooltip:{pointFormat: '<b>{point.percentage:.1f}%</b>'},
				
				series: {showInLegend:true,data: [['Completed in time',this.state.values[0]],['Completed late',this.state.values[1]],['In Progress',this.state.values[2]],['No activity',this.state.values[4]],['Overdue',this.state.values[5]]]}};
			this.setState({options: options});
		});
    	//console.log(this.state);
    	 	
	}
	render(){
		return(

			<>
			<Sidebar/><br/><br/>
			<label className="blue_color2">  : {this.state.values[0]}</label><br/><br/>
			<label className="blue_color2">Tasks Pending : {this.state.values[1]}</label><br/><br/>
			<Piechart options={this.state.options}/>
			</>


	)};
}

export default Dashboard;