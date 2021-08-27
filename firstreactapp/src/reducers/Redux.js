// import {createStore} from "redux";
// import {Provider} from "react-redux";
// import {useDispatch,useSelector} from "react-redux";
// import axios from "axios";
// //import await from "axios";
// import wait from "react";
// import {connect} from "react-redux";
// import store from "../components/store";
// import cakereducer from "./cakereducer";

// //import store from 

// //const initial = {id:0 , username : 'cricket'};
// // const initialstate={numofcakes: 10};
// // const cakereducer = (state = initialstate,action) =>{
// //   switch(action.type){
// //     case "increment":
// //       console.log(state);
// //       return {...state, numofcakes:state.numofcakes+1}
// //   default:
// //     return state;
// //   }
// // }
// //  const store = createStore(cakereducer);


// // export const accessdata = (state = initial,action) =>{
// //    switch(action.type){
// //       case "login":{
// //         return {...state,id:action.payload.id,username:action.payload.name};
// //       }
// //       case "logout":{
// //         return {...state,id:0,username:'cricket'};
// //       }
// //       default :{
// //         console.log(state);
// //         return state;
// //       }
// //   }
// // }
// //export const store = createStore(accessdata);
// const Redux = (props) =>{

// 	//dispatch()
// 	//const dispach = useDispatch();
// 	//const cakes = props.numofcakes;
// 	//const kk = useSelector((state)=>state.numofcakes);
// 	//console.log(props);
// 	const dispath= useDispatch();
// 	return(
// 		<>
// 		<h1>aa {props.numofcakes}</h1>
// 		<button onClick = {()=>store.dispatch({type:'increment'})}>Click Here </button>
// 		</>
// 		);

// }

// //export store;
//  const mapStatetoProps= (state , props) =>{
//  	console.log(props);
//  	console.log('aaa');
//  	return{
//  		numofcakes:state.numofcakes,
//  	}
//  }
// const mapDispatchtoProps = (dispatch)=>{
// 	return {
// 		cakereducer : ()=>store.dispatch({type:'increment'}),
// 	}

// }
// connect(mapStatetoProps,mapDispatchtoProps)(Redux);
// const unsubscriber  = store.subscribe(()=>console.log('aa',store.getState().numofcakes));
// function Aa(){
// const dispatch = useDispatch();
// dispatch(cakereducer({type:'increment'}));
// dispatch(cakereducer());
// }

// export default Redux;
