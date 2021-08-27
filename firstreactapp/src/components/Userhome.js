import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.js';
//import "CustomStyles.css";
//import './App.css';
import "./Home.css"
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";
import React,{Component} from "react";
import Navbar from "react-bootstrap/navbar";
import Container from "react-bootstrap/container";
import Sidebar from "./Sidebar";
import axios from "axios";
import Cookies from "universal-cookie";
import store from "./store";
import {bindActionCreators} from "redux";
import cakereducer from "../reducers/cakereducer";
import {connect} from 'react-redux';
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

export class Userhome extends Component
{

  constructor(props)
  {
    super();
    console.log(props,'qqqqq');
    const cookie = new Cookies();
    //store.dispatch({type:'INCREMENT'});
    console.log(props,'yyyyyy');
        if(cookie.get("name")==null)
        {
          window.location.href="login";

        }
      //alert(store.getState().username);
      //store.dispatch({type:'aaa'});
      //const  us = store.subscribe(()=>console.log(store.getState()),'hgfhgfghh');
  }
  render()
  {
    return(
      <>
      
      <h1>{this.props.username}aaa</h1>
      </>
    )
  }

}
const mapStatetoProps = (state) =>{
  console.log(state,'sateee');
  return {id:0,username:state.cakereducer}
}
// const mapDispatchtoProps = (dispatch) =>{
//   console.log("djkfhsdhsf");
//   return bindActionCreators ({
//   cakereducer:()=>dispatch({type:'INCREMENT'})
// })
// }
export default connect(mapStatetoProps)(Userhome);
//export default Userhome;