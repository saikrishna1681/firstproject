const initialstate={id:0,username:null};
const cakereducer = (state = initialstate,action) =>{
  console.log("action",action);
  switch(action.type){
    case "INCREMENT":{
      //return {...state,username:action.username};
      console.log(action.payload,'actionpayload');
      const k=action.payload;
      console.log('k',{...state,username:k},state);
      return {...state,
        username:k}
      }
  default:{
    //return {...state, numofcakes:state.numofcakes+1};
    console.log('aaa',state);
    return state
  }
  }
}

export default cakereducer;