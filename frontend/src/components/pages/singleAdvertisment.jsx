import React, { useState } from 'react'
import { useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { useParams } from 'react-router-dom'

function SingleAdvertisment() {
    let params=useParams();
    let [advertisment,setAdvertisment]=useState({})

    useEffect(()=>{

        async function fetchSingleAdvertisment() {
            let data =await fetch(`http://localhost:1500/advertisment/${params.id}`);
            let result= await data.json();
            setAdvertisment(result.data)
console.log(result.data);
        }
        fetchSingleAdvertisment();
        
    },[])
  return (
    <>
   
   {Object.keys(advertisment).length !== 0 && <Container className='mt-2 mb-5'>
    <Row className='my-4 justify-content-md-center'>
        <Col md={8} ><img src={`http://localhost:1500/asserts/${advertisment.image}`} alt="" width='100%'/></Col>
    </Row>
    <Row className='customeClr rounded justify-content-md-center'>
        <Col xs={12} className='py-2'>  Name Of Country:<b> {advertisment.country.name}</b></Col>
        <Col xs={12} className='py-2'> Name Of City:  <b>{advertisment.city}</b></Col>
        <Col xs={12} className='py-2'> Zip Code:  <b>{advertisment.zipcode}</b></Col>
        <Col xs={12}><h2 className='text-center my-3'>About {advertisment.city}</h2></Col>
        <Col xs md={10} ><p className='description text-center'> {advertisment.description}</p></Col>

    </Row>
   </Container>}
   </>
  )
}

export default SingleAdvertisment