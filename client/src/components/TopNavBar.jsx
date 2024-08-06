import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import "../styles/TopNavBar.scss";

const TopNavBar = ({
  user,
  handleLogout,
  setLoginselected,
  setRegisterSelected,
  navigate,
}) => {
  return (
    <Navbar bg="light" variant="light" className="navbar">
      <Navbar.Brand onClick={() => navigate("/")}>Readr</Navbar.Brand>
        {user ? (
          <>
          <Nav class="middle-nav">
            <LinkContainer to="/Dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search">
              <Nav.Link>
                Search <FaSearch />
              </Nav.Link>
            </LinkContainer>
            </Nav>
            <Nav className="rightNav">
            <Nav.Item>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav.Item>
            </Nav>
          </>
        ) : (
          <Nav class="homepage-nav">
            <h4
              onClick={() => {
                setLoginselected(true);
                setRegisterSelected(false);
              }}
            >
              Login
            </h4>
            <h4
              onClick={() => {
                setRegisterSelected(true);
                setLoginselected(false);
              }}
            >
              Register 
            </h4>
          </Nav>
        )}
    
    </Navbar>
  );
};

export default TopNavBar;
