import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import {Provider} from "react-redux"
import store from './components/store';
//import '@fortawesome/fontawesome-free/css/all.min.css';  
//import 'bootstrap-css-only/css/bootstrap.min.css';  
import 'mdbreact/dist/css/mdb.css';

// const increment = () =>{
//   return{
//     type:'increment'
//   }
// }

// const decrement =() => {
//   return{
//     type:'decrement'
//   }
// }

// const direction = (state = {values : []} , action,  list) => {

//    switch(action.type){
//     case "increment" : 
//       this.setState({values : list});
//       return state;
//     default : 
//       return state;
//    }
// };
// let store = createStore(direction);




ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
