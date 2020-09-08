import React from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default class Navbar extends React.Component {
  render() {
    return (
      <BootstrapNavbar bg="light" expand="lg">
        <BootstrapNavbar.Brand href="/">MERN</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Anasayfa</Nav.Link>
            <Nav.Link href="/urunler">Ürünler</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    );
  }
}
