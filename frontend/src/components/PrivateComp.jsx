import  React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from './Loading'

export let PrivateComp=()=>{
let {user,loading}=useSelector((e)=>e.getUserReducer)
if (!loading) {

    return(
        <>
            {user? <Outlet /> : <Navigate to="/login" />}
            </>
    )
}else{
    return <Loading/>
}
}