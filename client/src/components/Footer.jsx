import React from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/Footer.css"
import logo from "../assets/logo.png";

const Footer = ({ navigate }) => {
  return (

      <Container fluid>
        <Row className="justify-content-md-center">
          <Col className="left-nav">
            <Navbar.Brand>
              <img
                src={logo}
                alt="Readr"
                style={{ height: "30px", cursor: "pointer" }}
              />
            </Navbar.Brand>
          </Col>
          <Col className="center-nav">
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="right-nav">
            <Nav>
              <Nav.Link href="https://facebook.com" target="_blank">
                <FaFacebook />
              </Nav.Link>
              <Nav.Link href="https://twitter.com" target="_blank">
                <FaTwitter />
              </Nav.Link>
              <Nav.Link href="https://instagram.com" target="_blank">
                <FaInstagram />
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
  );
};

export default Footer;
