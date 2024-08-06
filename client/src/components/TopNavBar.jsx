import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";

const TopNavBar = ({
  currentUser,
  handleLogout,
  setLoginSelected,
  setRegisterSelected,
  navigate,
}) => {
  return (
    <Navbar bg="light" variant="light" className="navbar-underline">
      <Navbar.Brand onClick={() => navigate("/")}>
        <img
          src={logo}
          alt="Readr"
          style={{ height: "50px", cursor: "pointer" }}
        />
      </Navbar.Brand>
      <Nav className="mr-auto">
        {currentUser ? (
          <>
            <LinkContainer to="/">
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
            <Nav.Item>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <h4
              onClick={() => {
                setLoginSelected(true);
                setRegisterSelected(false);
              }}
            >
              Login
            </h4>
            <h4
              onClick={() => {
                setRegisterSelected(true);
                setLoginSelected(false);
              }}
            >
              Register
            </h4>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default TopNavBar;
