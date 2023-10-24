import  Modal  from 'react-bootstrap/Modal';
import React from 'react'
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import ReactAlert from '../Alert';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';

function AdminHeaderComp(props) {
    const [show, setShow] = useState(false);
let [countries,setCountries]= useState([]);
let [cityError,setCityError]= useState(false);
let [zipcodeError,setZipcodeError]= useState(false);
let [descriptionError,setDescriptionError]= useState(false);
let [imageError,setImageError]= useState(false);
let [charLength,setCharLength]= useState('0');
let searrchField=useRef();
const [myAlert, setMyAlert] = useState({display:false,color:'',sms:''});

    const handleClose = () => setShow(false);
    const handleShow = async() => {
        setShow(true);
        // fetch dropedown country list
        let data = await fetch('http://localhost:1500/categories');
        let result=await data.json();
        // console.log(result);
        setCountries(result.data)

    }
    let addNewAdvertisment=async (e)=>{

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
        if (formobj.cityimage.name ===''){
             return setImageError(true);  
        }else{
           
                setImageError(false); 
            }
      

        let myformData=new FormData();
        myformData.append('city',formobj.city)
        myformData.append('country',formobj.country)
        myformData.append('cityimage',formobj.cityimage)
        myformData.append('zipcode',formobj.zipcode)
        myformData.append('description',formobj.description)


try {
    


       let data= await fetch('http://localhost:1500/advertisment/add',{
            method:"POST",
            body:myformData,
            header:{
                "Content-Type":"multipart/form-data"
            },

           
        });
        let res=await data.json();
      
        if (res.acknowledge) {
            setShow(false);
            props.Advertismentsfn();
            alertFunc(res.sms,'success')
        }else{
            alertFunc(res.sms,'danger')

        }

    } catch (error) {
        alertFunc('some thing went wrong','danger')
    }
    }
    


    let searchCountry=(e)=>{
e.preventDefault();
if (!searrchField.current.value) {
    return false;
}
window.location.assign(`/admin/search/${searrchField.current.value}`)
// console.log(searrchField.current.value);

    }
    // this function will update state
function alertFunc(sms,color) {
    setMyAlert({display:true,color,sms})
    setTimeout(() => {
    setMyAlert({display:false,color:'',sms:''})
       
    }, 5000);
}
    return (
        <>
 
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
          <Link to="/" className="navbar-brand">Advertisements</Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Item>
  <Link to="/admin/dashboard" className="nav-link">
    Home
  </Link>
</Nav.Item>
                <Button variant="outline-light" onClick={handleShow}>Add Advertisment</Button>
              </Nav>
              <Form className="d-flex" onSubmit={searchCountry}>
                <Form.Control
                  type="search"
                  placeholder="Search Country"
                  className="me-2"
                  aria-label="Search"
                  ref={searrchField}
                />
                <Button variant="outline-light" type='submit'>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
           
     {/* custome alert */}
     {myAlert.display && <ReactAlert color={`${myAlert.color}`} sms={`${myAlert.sms}`} />}


         {/* popup box will display if add Advertiment buttom is pressed */}
       <Modal show={show} onHide={handleClose}>
       <Form onSubmit={addNewAdvertisment}>
       <Modal.Header closeButton>
         <Modal.Title>Add Advertisment</Modal.Title>
       </Modal.Header>
       <Modal.Body>
        {/* alert */}

{/* form */}

<Form.Select aria-label="Default select example" className='mb-3 ' name='country'>
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
          
        />     
      </InputGroup >
      {/* to dispaly error */}
     <b className='text-danger mb-3 ps-2' style={{display:`${cityError? 'block':'none'} `}}>Please Enter City</b>
      <InputGroup className="">
    
    <Form.Control
      aria-label="Default"
      type='number'
      aria-describedby="inputGroup-sizing-default"
      placeholder='Zip code'
      name='zipcode'
      className='my-2'
    />
  </InputGroup>
  <b className='text-danger mb-3 ps-2' style={{display:`${zipcodeError? 'block':'none'}`}}>Please Enter zipcode</b>
        <Form.Control
          as="textarea"
          className='mb-3'
          name='description'
          placeholder="About City"
          style={{ height: '100px' }}
          onInput={(e)=>setCharLength(e.target.value.length)}
        />
        <p>charactors {charLength}</p>
        <b className='text-danger mb-3 ps-2' style={{display:`${descriptionError? 'block':'none'} `}}>min length 200 charactors and max 3000</b>
     <Form.Control type="file" name='cityimage' />
    
     <b className='text-danger mb-3 ps-2' style={{display:`${imageError? 'block':'none'} `}}>Please select image</b>
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
      );
}

export default React.memo(AdminHeaderComp);