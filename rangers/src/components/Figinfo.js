import React from 'react'
import { useEffect, useState } from 'react'
import { Card, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'
import './Comic.css'

function Figinfo(props) {
  const [rangerzs, setRangerzs] = useState([])
  const formatfigURL = (photo) => {
    return `http://localhost:3001/${photo}`
  }

  const [search] = useState('')



  //const handleGetRanger = () => {
  console.log(search)
  // props.history.push (`/search/${search}`)
  //     fetch(`http://localhost:3001/api/rangers?search=${search}`).then(response => response.json())
  //    .then(json => {
  //        console.log(json)
  //      setRangerzs(json.map)
  //    })
  // }

  useEffect(() => {
    const id = props.match.params.id
    fetch(`http://localhost:3001/api/rangers/${id}`).then(response => response.json())
      .then(json => {
        setRangerzs(json.map(test => {
          return (<div>

            <Navbar bg="danger" expand="lg">
              <Navbar.Brand href="/">Lighting Collection</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/login">Log In/Sign Up</Nav.Link>
                  <Nav.Link href="/collection">My Collecton</Nav.Link>

                </Nav>

              </Navbar.Collapse>
            </Navbar>
            {/* <Card className="bg-dark text-white">
  <Card.Img src={formatfigURL(test.photo2)} alt="Card image" />
  <Card.ImgOverlay>
    <Card.Title>{test.name}</Card.Title>
    <Card.Text>
      This is a wider card with supporting text below as a natural lead-in to
      additional content. This content is a little bit longer.
    </Card.Text>
    <Card.Text>Last updated 3 mins ago</Card.Text>
  </Card.ImgOverlay>
</Card> */}
            <div>
              <div class="news-item hero-item"><img src={formatfigURL(test.photo2)} /></div>
              
              <div class="news-item standard-item"><img src={formatfigURL(test.photo3)} /></div>
              <div class="news-item standard-item"><img src={formatfigURL(test.photo4)} /></div>
              <div class="news-item standard-item"><img src={formatfigURL(test.photo5)} /></div>
            </div>
          </div>)
        }))

        console.log(json)
      })
  }, [props.match.params.id])

  return (
    <div class="wrapper">{rangerzs}</div>

  )

}

export default Figinfo