import React, {useState, useEffect} from  'react'
import { Card, Navbar, Nav, Button, CardColumns, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import {BeakerIcon, ZapIcon, CheckIcon } from '@primer/octicons-react'
function Collection(props) {
  const [rangerDisplay,setRangerDisplay] = useState([])
  const getCollection = () => {
    
    const token = localStorage.getItem("jsonwebtoken")
    fetch (`http://localhost:3001/api/rangers/getCollection`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: "bearer "+token
      },
      //body: JSON.stringify({rangerid:rangerid})
    }).then(resp=>resp.json() ).then(resp=>setRangerItems(resp) )
  }
  const formatfigURL = (photo) => {
    return `http://localhost:3001/${photo}`
  }
  const setRangerItems = (rangers)=> {
    const rangerItems = rangers.map(rangerzs => {
      const link = `/figinfo/${rangerzs.id}`
      
      
    return <div>
     
      <Card bg="secondary" >
        <div><NavLink to={link}>
    <Card.Img variant="top" src={formatfigURL(rangerzs.photo)} /></NavLink>
        </div>
    <Card.Body >
      <Card.Title>{rangerzs.name}</Card.Title>
      <Card.Text>
      <div>{rangerzs.wave}</div>
      <div>{rangerzs.price}</div>
      </Card.Text>
      <Button variant="danger"><CheckIcon size={16} /></Button>
    </Card.Body>
  </Card>
      </div>
      
      
    })
    setRangerDisplay(rangerItems)
  } 
  useEffect(() => {
    getCollection() 
  },[])

  const logout = (props) => {
    localStorage.clear();
    window.localStorage.href = '/';
  }
  
  
    return (
    <div><Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Lighting Collection</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Log In/ Sign Up</Nav.Link>
        <NavDropdown title="{userid}" id="basic-nav-dropdown">
            <NavDropdown.Item href="/" onClick={logout}>Log Out</NavDropdown.Item>
          </NavDropdown>
      </Nav>
      
    </Navbar.Collapse>
  </Navbar>
  <CardColumns>
  {rangerDisplay}</CardColumns>
  </div>
  )
  }
export default Collection
