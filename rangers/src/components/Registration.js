
import React, {useState,useEffect} from  'react'
import { Button, Card, Navbar, Nav, Form, FormControl, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Res (props) {

    const [user, setUser] = useState ({})
    const [message,setMessage]  = useState ("")
    const handleTextBox = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = () => {

        

        fetch('http://localhost:3001/api/rangers/registration',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        }).then(response => response.json())
        .then(result => {
           if (result.id) {
            props.history.push("/login")
           }
           else {
            setMessage("Username already taken")
           }
        })
    }

    const [rangerzs,setRangerzs] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {

    

   fetch('http://localhost:3001/api/rangers').then(response => response.json())
   .then(json => {
     setRangerzs(json)
   })


  },[])

    const handleSearchBox = (e) => {
        setSearch(e.target.value)
      }
    
      const handleGetRanger = () => {
    
        fetch(`http://localhost:3001/api/rangers?search=${search}`).then(response => response.json())
       .then(json => {
         setRangerzs(json)
       })
      }

    return (
        <div>
            <Navbar bg="danger" expand="lg">
    <Navbar.Brand href="/">Lighting Collection</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Log In/Sign Up</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
            <h1>Register</h1>
            <input type="text" name="username" placeholder="Username" onChange={handleTextBox}/>
            <input type="text" name="password" placeholder="Password" onChange={handleTextBox}/>
            <Button onClick={handleLogin}>Register</Button>
            <p>{message}</p>
        </div>
    )

}

export default Res