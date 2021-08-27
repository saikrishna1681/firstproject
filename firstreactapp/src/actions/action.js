const action = (data)=>{

	console.log('action',data);
	return {type:'INCREMENT',payload:data};
}
export default action;