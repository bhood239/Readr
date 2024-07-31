import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const TopNavBar = ({ user, handleLogout }) => {
  return (
    <Navbar bg="light" variant="light" className="navbar-underline">
      <Navbar.Brand>Readr</Navbar.Brand>
      <Nav className="mr-auto">
        {user ? (
          <>
            <LinkContainer to="/Dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Search">
              <Nav.Link>Search <FaSearch /></Nav.Link>
            </LinkContainer>
            <Nav.Item>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <LinkContainer to="/">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default TopNavBar;