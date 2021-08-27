import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";
import React from "react";
import axios from "axios";
import {Component} from "react";
import Cookies from "universal-cookie";
import {useDispatch} from 'react-redux';
import store from "./store";
import cakereducer from "../reducers/cakereducer";
import {connect} from 'react-redux';
import action from "../actions/action";
class Login extends Component {
    //axios.get("http://localhost:8000/loginuser/");  http://localhost:8000/loginuser
    constructor(props){
    super(props);

    // axios.get("http://localhost:8000/checkcookie").then(response =>{
    //         if(response.data == "no")
    //         {
    //             //window.location.href="login";
    //         }
    //         else
    //         {
    //             window.location.href="userhome";
    //             //console.log(response);
    //         }
    //     });
    const cookie = new Cookies();
    if(localStorage.getItem("name")==null)
    {

    }
    else
    {
        window.location.href="userhome";
    }
    //if(cookie.get("name"))
    this.state={
        username:'sai',
        password:'sai'
    };

    this.handlesubmit = event=>{
        // const { name, value } = event.target;
        // this.setState({ [name]:value});

        event.preventDefault();
    const data = new FormData(event.target);
    // NOTE: you access FormData fields with `data.get(fieldName)`    
    const username = data.get("username");
    const password= data.get("password");
    const data_={username:username,password:password};
        // axios.get("http://localhost:8000/login").then(function (response){
        //     console.log(response);
        // });
        // res= axios.post("http://localhost:8000/loginuser",
        //     {username:this.state.username,
        //         password:this.state.password
        //     }).then(res=>{console.log("res");}).error(err=>{console.log("okkk");});

        axios.post("http://localhost:8000/loginuser",data_ )
            .then((response) => {
                //window.location.href="userhome";
                //console.log(response.data[0]);
                if(response.data[0]=="loggedin"){
                //window.location.href = "userhome";
                //store.dispatch({type:'increment',data:username});
                this.props.action(username);
                console.log(username,'username');
                const cookiea=new Cookies();
                cookiea.set('name',response.data[1],{path:'/'});
                localStorage.setItem("name",username);
                
                //store.dispatch({type:'aa'});
                //store.dispatch({type:'INCREMENT',payload:'sss'});
                alert("aa");
                //dispatch(action : {type:"login",payload:{id:response.data[1],username:username}})
                //window.location.href="userhome";
                this.props.history.push('/userhome');
                //store.subscribe(()=>console.log(store.getState(),'jgg'));
                }
                else
                {
                    alert("invalid credentials");
                }
            })
            .catch((err) => {
                console.log(err);
                // alert(err);
            });
            //window.location.href="userhome";
    };
}
    render(){
	return(
	<div>
    <br/>
    <br/>
    <h1> LOGIN </h1>
    <Form onSubmit= {this.handlesubmit}>
    <Form.Group >
     <Form.Label color="primary"> User Name < /Form.Label> 
     <Form.Control type="text" name="username" placeholder="User Name" /> 
    </Form.Group>
    <br/>
    <Form.Group>
     <Form.Label class="displaylabel"> Password </Form.Label> 
     <Form.Control type="password" name="password" placeholder="Password"  /> 
     <Form.Text className="text-muted" >Password must be atleast 8 characters long </Form.Text>
    </Form.Group>
    <br/>
    <Form.Group>
     <Button variant="primary" type="submit"  > Submit </Button>
    </Form.Group>
    <br/>
    <Form.Group>
    <Form.Text>New user ? </Form.Text>
    <a href="signup" > Click here </a>
    </Form.Group><br/>
    <Form.Group>
    <Form.Text>Forgot Password </Form.Text>
    <a href="forgotpassword" > Click here </a>
    </Form.Group>
    </Form>
    </div>
	);
}}

export default connect(null,{action})(Login);
