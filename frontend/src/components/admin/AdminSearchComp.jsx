import React, {  useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';

import ReactAlert from "../Alert";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import Image from "react-bootstrap/esm/Image";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

let AdminSearchComp=({advertismentList,deleteAdvertis,Advertismentsfn})=>{
    let params=useParams()
    let [advertisment,setAdvertisment]=useState([]);
let [charLength,setCharLength]= useState('0');

    const [show, setShow] = useState(false);
    const [myAlert, setMyAlert] = useState({display:false,color:'',sms:''});
    const handleClose = () => setShow(false);
    let [cityError,setCityError]= useState(false);
let [zipcodeError,setZipcodeError]= useState(false);
let [descriptionError,setDescriptionError]= useState(false);
let [countries,setCountries]= useState([]);
let countryRef=useRef()
let cityRef=useRef()
let zipcodeRef=useRef()
let descRef=useRef()
let imageRef=useRef()
let previousImgRef=useRef();
let formRef=useRef()
    function alertFunc(sms,color) {
        setMyAlert({display:true,color,sms})
        setTimeout(() => {
        setMyAlert({display:false,color:'',sms:''})
           
        }, 5000);
    }
    // update advertisment 
    let updateAdvertisment=async (e)=>{

        e.preventDefault();
        // use for validation
    
        let formdata=new FormData(e.target);
        let formobj = Object.fromEntries(formdata);
        if (!formobj.city){
            
             return setCityError(true);
        }else{
            setCityError(false);
        }  
        if (!formobj.zipcode){
             return setZipcodeError(true);  
        }else{
            setZipcodeError(false); 
        }
        if (!formobj.description){
             return setDescriptionError(true);  
        }else{
            if (formobj.description.length<100 || formobj.description.length>3000) {
                return setDescriptionError(true); 
            }else{
            setDescriptionError(false);
            }
        }
    
    
        let myformData=new FormData();
        myformData.append('city',formobj.city)
        myformData.append('country',formobj.country)
        if (formobj.cityimage.name !=='') {
            
            myformData.append('cityimage',formobj.cityimage)
        }
        myformData.append('zipcode',formobj.zipcode)
        myformData.append('description',formobj.description)
    
    
    
    
       let data= await fetch(`http://localhost:1500/advertisment/${e.target.id}`,{
            method:"PUT",
            body:myformData,
            header:{
                "Content-Type":"multipart/form-data"
            },
    
           
        });
        let res=await data.json();
        console.log(res);
        if (res.acknowledge) {
            setShow(false);
            Advertismentsfn();
            alertFunc(res.sms,'success')
        }else{
            alertFunc(res.sms,'danger')
        }
    
    
    }
    // show popup
    const handleShow = async(id) => {
        setShow(true);
        // fetch dropedown country list
        let data = await fetch('http://localhost:1500/categories');
        let result=await data.json();
        // console.log(result);
        setCountries(result.data);
// fetch data of advertisment which we want to update 

let data2 = await fetch(`http://localhost:1500/advertisment/${id}`);
let result2=await data2.json();
if (result2?.data) {
    console.log(result2);
    countryRef.current.value=result2.data.country._id;
    cityRef.current.value=result2.data.city;
    zipcodeRef.current.value=result2.data.zipcode;
    descRef.current.value=result2.data.description;
    setCharLength(result2.data.description.length)
   

    previousImgRef.current.src=`http://localhost:1500/asserts/${result2.data.image}`;

    // this will change the id of form to identify which advertisment is selected 
    formRef.current.id=result2.data._id;
}

    }
useEffect(()=>{
    // let query=`${params.country.charAt(0).toUpperCase()}${params.country.slice(1).toLowerCase()}`
    // let query =new RegExp("^" + params.country + "$", "i") 
   let newary= advertismentList.filter((e)=>e.country.name.toLowerCase() == params.country.toLowerCase());
   setAdvertisment(newary);
    console.log(newary);
},[advertismentList])
    return(
        <>
        {/* custome alert */}
    {myAlert.display && <ReactAlert color={`${myAlert.color}`} sms={`${myAlert.sms}`} />}
      
        <Container>
            <h2 className="text-center my-4">Search Result</h2>
        </Container>
        <Container>
           <Row>
            {advertisment.length !==0 ?  advertisment.map((e)=>{
return (
    <Row className="customeClr rounded my-2 align-items-center py-1" key={e._id}>
      <Col > <Image src={`http://localhost:1500/asserts/${e.image}`} height='60px' width='60px' roundedCircle /></Col>
      <Col> {e.country.name}</Col>
      <Col>{e.city}</Col>
      <Col>{e.zipcode}</Col>
      <Col xs md={2} >
<Row className="">
<Col><AiFillDelete className="text-danger fs-4" onClick={()=>{deleteAdvertis(e._id,alertFunc)}}/></Col>
<Col><AiFillEdit className="text-success fs-4"  onClick={()=>handleShow(e._id)}/></Col>
</Row>
      </Col>

     </Row>
)

            }):
            <Row><Col><h3 className="text-center mt-5">Result not found</h3></Col></Row>


            }
          </Row>
        </Container>
         {/* popup box will display if add Advertiment buttom is pressed */}
  <Modal show={show} onHide={handleClose}>
       <Form onSubmit={updateAdvertisment} id='' ref={formRef}>
       <Modal.Header closeButton>
         <Modal.Title>Update Advertisment</Modal.Title>
       </Modal.Header>
       <Modal.Body>
{/* form */}

<Form.Select aria-label="Default select example" className='mb-3 ' name='country' ref={countryRef}>
    {countries.length !==0 && countries.map((e)=>{
        return <option value={e._id} key={e._id}>{e.name}</option>
    })}
     
    </Form.Select>

      <InputGroup className="">
    
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Enter name of city'
          name='city'
          className='my-2'
          ref={cityRef}
          
        />     
      </InputGroup >
      <b className='text-danger mb-3 ps-2' style={{display:`${cityError? 'block':'none'} `}}>Please Enter City</b>
      <InputGroup className="">
    
    <Form.Control
      aria-label="Default"
      type='number'
      aria-describedby="inputGroup-sizing-default"
      placeholder='Zip code'
      name='zipcode'
      className='my-2'
      ref={zipcodeRef}
    />
  </InputGroup>
  <b className='text-danger mb-3 ps-2' style={{display:`${zipcodeError? 'block':'none'} `}}>Please Enter zipcode</b>
        <Form.Control
          as="textarea"
          className='mb-3'
          name='description'
          placeholder="About City"
          style={{ height: '100px' }}
          ref={descRef}
          onInput={(e)=>setCharLength(e.target.value.length)}
          />
          <p>charactors {charLength}</p>
        <b className='text-danger mb-3 ps-2' style={{display:`${descriptionError? 'block':'none'} `}}>min length 200 charactor and max 3000</b>
        <div className="d-flex justify-content-center my-3">

         <Image src="holder.js/171x180" rounded ref={previousImgRef} height='200px' width='220px' style={{margin:'auto'}}/>
        </div>
     <Form.Control type="file" name='cityimage' ref={imageRef}/>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Close
         </Button>
         <Button variant="primary" type='submit'>
           Save Changes
         </Button>
         
       </Modal.Footer>
       </Form>
     </Modal>
        
        </>
    )



}

export default AdminSearchComp