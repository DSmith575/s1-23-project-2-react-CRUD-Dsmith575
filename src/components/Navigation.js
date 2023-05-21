import { useState } from "react";
import Characters from "../components/tables/Characters.js";

// Import the following:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Student Management System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/characters">Characters</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Routes>
        <Route path="/login" />
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </Router>
  );
};

export default Navigation;