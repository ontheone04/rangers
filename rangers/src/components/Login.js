import React, {useState, useEffect} from  'react'
import { Button, Card, Navbar, Nav, NavDropdown, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login (props) {

    const [user, setUser] = useState ({})

    const handleTextBox = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleGetInfo = () => {

        fetch(`http://localhost:3001/api/rangers?search=${search}`).then(response => response.json())
       .then(json => {
         setRangerzs(json)
       })
      }
      const logout = () => {
        localStorage.clear();
        window.localStorage.href = '/';
      }

    const handleLogin = () => {

        

        fetch('http://localhost:3001/api/rangers',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                console.log(result)
                localStorage.setItem('jsonwebtoken',result.token)
                props.history.push("/")
            } else {

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
        <NavDropdown title={user.username} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" onClick={logout}>Log Out</NavDropdown.Item>
          </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
            <h1>Login</h1>
            <input type="text" name="username" placeholder="username" onChange={handleTextBox}/>
            <input type="password" name="password" placeholder="password" onChange={handleTextBox}/>
            <Button onClick={handleLogin}>Log In</Button>
            <Nav.Link href="/Registration"><Button>Sign Up</Button></Nav.Link>
        </div>
    )

}

export default Login