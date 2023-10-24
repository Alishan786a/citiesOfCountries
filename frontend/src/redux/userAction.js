import axios from 'axios'
export let getUser=()=>async (dispatch)=>{
try {
    dispatch({type:'getUserReq'});
    let {data}=await axios('http://localhost:1500/user/me',{withCredentials:true});
    // console.log(data);
    dispatch({type:"getUserSuccfully",payload:data})
} catch (error) {
    dispatch({type:"getUserfaild",payload:error})
    
}
};
export let loginUserAction=(formdata)=>async (dispatch)=>{
    // console.log(formdata);
    let headerInfo={
        headers:{'Content-type':"application/json"},
        withCredentials:true
    }
    
    try {
        dispatch({type:'loginUserReq'});

        let {data}=await axios.post('http://localhost:1500/user/login',formdata,headerInfo);
        console.log(data);
        dispatch({type:"loginUserSuccfully",payload:data})
    } catch (error) {
        dispatch({type:"loginUserfaild",payload:error})
        
    }
    };
    