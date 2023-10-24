export let getUserReducer=(state={user:null},{type,payload})=>{
    switch (type) {
        case "getUserReq":
            return {...state,loading:true};
 
        case "getUserSuccfully":
           return {...state,user:payload.user,sms:payload.sms,loading:false};

           case "getUserfaild":
            return {...state,error:payload,loading:false}
            // login
            case "loginUserReq":
                return {...state,loading:true};
     
            case "loginUserSuccfully":
               return {...state,user:payload.user,sms:payload.sms,loading:false};
    
               case "loginUserfaild":
                return {...state,error:payload,loading:false}  
        default:
            return state

    }
}