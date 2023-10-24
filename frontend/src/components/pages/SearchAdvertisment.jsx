import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from "react-router-dom";

let SearchAdvertisment=()=>{
    let params=useParams()
    let [advertisment,setAdvertisment]=useState([])
useEffect(()=>{
    async function fetchAdvertisments(){
        try {
            let data = await fetch(`http://localhost:1500/advertisment/search/${params.country}`);
            let result= await data.json();
            setAdvertisment(result.data);
           

          
        } catch (error) {
            console.log("Advertisment not fetched")
        }
    
        }
     fetchAdvertisments()
},[])
    return(
        <>
        <Container>
            <h2 className="text-center my-4">Search Result</h2>
        </Container>
        <Container>
           <Row>
            {advertisment.length !==0 ?  advertisment.map((e)=>{
return (
    <Col key={e._id} className=" d-flex justify-content-center" >
           <Card style={{ width: '18rem' }} className="mt-4">
      <Card.Img variant="top" src={`http://localhost:1500/asserts/${e.image}`} />
      <Card.Body>
        <Card.Title>{e.city}</Card.Title>
        <Card.Text>
        {e.description.length >80 ? `${e.description.slice(0,80)}...` : e.description}
        </Card.Text>
        <Button variant="primary"><Link to={`/advertisment/${e._id}`} className="text-white text-decoration-none"> Read more</Link></Button>
      </Card.Body>
    </Card>
           </Col>
)

            }):
            <Container className="mt-5">
            <h2 className="text-center my-4"> Result not Found</h2>
        </Container>

            }
           
        
           </Row>
        </Container>
        
        </>
    )



}

export default SearchAdvertisment