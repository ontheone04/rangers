import React, { useEffect, useState } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Card, Navbar, Nav, Form, FormControl, NavDropdown, Col, Row, CardGroup, CardDeck, CardColumns } from 'react-bootstrap';
import { BeakerIcon, ZapIcon, CheckIcon } from '@primer/octicons-react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {

  const [rangerzs, setRangerzs] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {

    handleGetAll()

    //  fetch('http://localhost:3001/api/rangers').then(response => response.json())
    //  .then(json => {
    //    setRangerzs(json)
    //  })


  }, [])

  const handleGetAll = () => {
    fetch('http://localhost:3001/api/rangers').then(response => response.json())
      .then(json => {
        setRangerzs(json)
      })
  }



  const handleGetInfo = () => {

    fetch(`http://localhost:3001/api/rangers?search=${search}`).then(response => response.json())
      .then(json => {
        setRangerzs(json)
      })
  }

  const formatfigURL = (photo) => {
    return `http://localhost:3001/${photo}`
  }
  const addToCollection = (rangerid) => {
    const token = localStorage.getItem("jsonwebtoken")
    fetch(`http://localhost:3001/api/rangers/addToCollection`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: "bearer " + token
      },
      body: JSON.stringify({ rangerid: rangerid })
    }).then(resp => resp.json()).then(resp => console.log(resp))
  }

  const rangerItems = rangerzs.map(rangerzs => {
    const link = `/figinfo/${rangerzs.id}`

    return <div>
      
 
      
        <Card bg="secondary" style={{ width: '30rem' }}>
          <div><NavLink to={link}>
            <Card.Img variant="top" fluid src={formatfigURL(rangerzs.photo)}  /></NavLink>
          </div>
          <Card.Body >
            <Card.Title>{rangerzs.name}</Card.Title>
            <Card.Text>
              <div>{rangerzs.wave}</div>
              <div>{rangerzs.price}</div>
            </Card.Text>
            <Button onClick={() => addToCollection(rangerzs.id)} variant="danger"><CheckIcon size={16} /></Button>
          </Card.Body>
        </Card>
      
      {/* </Col> */}
      {/* </Row> */}
    </div>


  })






  const handleSearchBox = (e) => {
    setSearch(e.target.value)
  }

  const handleGetRanger = () => {

    fetch(`http://localhost:3001/api/rangers?search=${search}`).then(response => response.json())
      .then(json => {
        setRangerzs(json)
      })
  }
  const logout = () => {
    localStorage.clear();
    window.localStorage.href = '/';
  }
  return (
    <div> <Navbar bg="danger" expand="lg">
      <Navbar.Brand href="/">Lighting Collection</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Log In/Sign Up</Nav.Link>
          <Nav.Link href="/collection">My Collecton</Nav.Link>
          <NavDropdown title="Aston" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" onClick={logout}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" name="search" onChange={handleSearchBox} placeholder="Search" />
          <Button onClick={handleGetRanger}>Find Ranger</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    <CardColumns>
      {rangerItems}</CardColumns>
      
    </div>
  );

}

export default App;
