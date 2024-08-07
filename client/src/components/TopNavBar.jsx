import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../styles/TopNavBar.css";
import logo from "../assets/logo.png";

const TopNavBar = ({
  user,
  handleLogout,
  setLoginSelected,
  setRegisterSelected,
  navigate,
}) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="Readr"
              className="d-inline-block align-left"
            />
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          {user ? (
            <>
              <Nav className="me-auto middle-nav">
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
              </Nav>
              <Nav className="ms-auto right-nav">
                <Nav.Item>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav.Item>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ms-auto homepage-nav">
                <Nav.Item>
                  <Nav.Link
                    onClick={() => {
                      setLoginSelected(true);
                      setRegisterSelected(false);
                    }}
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => {
                      setRegisterSelected(true);
                      setLoginSelected(false);
                    }}
                  >
                    Register
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
