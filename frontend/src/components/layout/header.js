import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function HeaderComp() {
    let searrchField=useRef();
let navigate=useNavigate()

    let searchCountry=(e)=>{
e.preventDefault();
if (!searrchField.current.value) {
    return false;
}
window.location.assign(`/advertisment/search/${searrchField.current.value}`)
console.log(searrchField.current.value);

    }
    return (
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
  <Link to="/" className="nav-link">
    Home
  </Link>
</Nav.Item>
<Nav.Item>
  <Link to="/admin/dashboard" className="nav-link">
    Admin
  </Link>
</Nav.Item>

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
      );
}

export default HeaderComp;