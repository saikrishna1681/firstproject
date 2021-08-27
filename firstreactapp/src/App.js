import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";
import React from "react";
import Login from './components/Login';
import Signup from "./components/Signup";
import {BrowserRouter,Route} from 'react-router-dom';
import Userhome from "./components/Userhome";
import Sidebar from "./components/Sidebar";
import User_list_component from "./components/User_list_component";
import axios from "axios";
//import fetch from "fetch";
import Taskform from "./components/Taskform";
import User_tasklist from "./components/User_tasklist";
import Task_list_all from "./components/Task_list_all";
import Filtertask from "./components/Filtertask";
import Forgotpassword from "./components/Forgotpassword";
import Changepassword from "./components/Changepassword";
import Testfile from "./components/testfile";
import {createStore} from "redux";
import {Provider} from "react-redux";
import Redux from './reducers/Redux';
import {useSelector} from "react-redux";
import Dashboard from "./components/Dashboard";
import store from "./components/store";
const App=(list_p)=>{

  
  
  const list=[
      {
        username:'saikrishna',
        email:'skrishna@iitk.ac.in',
      },

      {
        username:'ssk',
        email:'kk@xyz.com',
      },

     ];



  return (



  <div className="App">
  <BrowserRouter>

  <Route path="/login">
  <Login />
  </Route>

  <Route path="/signup">
  <Signup />
  </Route>

  <Route path="/userhome">
  < Userhome />
  </Route>

  <Route path="/sidebar">
  < Sidebar />
  </Route>

  <Route path="/users_list">
   <User_list_component  />
  </Route>
  <Route path ="/taskform">
  <Taskform/>
  </Route>
  
  <Route path="/tasklist">
  <User_tasklist/>
  </Route>

  <Route path="/logout">
  <User_tasklist/>
  </Route>

  <Route path="/tasklistall">
  <Task_list_all/>
  </Route>

  <Route path="/filtertask">
  <Filtertask/>
  </Route>

  <Route path="/forgotpassword">
  <Forgotpassword/>
  </Route>

  <Route path="/changepassword">
  <Changepassword/>
  </Route>

   <Route path="/testfile">
   <Testfile/>
   </Route>

   <Route path="/aaa">
   <Redux numofcakes='100' /> 
   </Route>
   <Route path="/dashboard">
   <Dashboard/>
   </Route>
   
   

  </BrowserRouter>
  </div>

 
  )

}
//export store;
export default App;
