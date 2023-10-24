import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { loginUserAction} from '../redux/userAction'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function LoginForm() {
let {user}=useSelector((e)=>e.getUserReducer)

    let dispatch=useDispatch();
    let [formField,setFormFields]=useState({email:'alishan@gmail.com',password:"alishan"})

    let changeValue=(e)=>{
        setFormFields((pre)=>{
    return {...pre,[e.target.name]:e.target.value}
        });
        
    }
    




    let loginUser=(e)=>{
        e.preventDefault();

        if (!formField.email) {
            return
            
        }
        if (!formField.password) {
            return
            
        }
        dispatch(loginUserAction(formField))

    }
    
  return (
    <>
  {user ? <Navigate to="/admin/dashboard" /> : null}
    <MDBContainer  className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

<form onSubmit={(e)=>loginUser(e)}>
          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlEM' value={formField.email} onChange={(e)=>changeValue(e)} name='email' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControPS' value={formField.password} onChange={(e)=>changeValue(e)} password='password' type='password' size="lg"/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
           
          </div>
          <Button variant="primary" className='w-100' size="lg" type='submit'>
         Login
        </Button>
          </form>
        


        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </>
  );
}

export default LoginForm;