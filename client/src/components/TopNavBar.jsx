import React, { useState } from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

import Dashboard from '../routes/Dashboard.jsx';
import Profile from '../routes/Profile.jsx';
import HomePage from '../routes/Homepage.jsx';
import SearchResults from './SearchResults.jsx'


const TopNavBar = ({setCurrentPage}) => {

const currentUser = { name: 'John Doe',
  email: 'johndoe@example.com',}
  // Simulate a user object
  const [user, setUser] = useState(currentUser);

  const handleLogout = () => {
    // Simulate a user logging out
    setUser(null);
  
  };

  return (
    <Navbar bg="light" variant="light" className="navbar-underline">
      <Navbar.Brand>Readr</Navbar.Brand>
      <Nav className="mr-auto">
        {user ? (
          <>
            <Nav.Item>
              <Nav.Link onClick={() => setCurrentPage('dashboard')}>Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setCurrentPage('profile')}>Profile</Nav.Link>
            </Nav.Item>
            <Form inline className="d-flex ml-auto">
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info" onClick={() => <SearchResults />}>
                Search
              </Button>
            </Form>
            <Nav.Item>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item>
              <Nav.Link onClick={() => setCurrentPage('homepage')}>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setCurrentPage('homepage')}>Register</Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </Navbar>
  );


}

export default TopNavBar;
