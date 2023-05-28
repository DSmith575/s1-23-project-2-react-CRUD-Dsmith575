/**
 * Navigation for handling routes
 *
 * File handles routing
 *
 * @file: navigation.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-21
 * @updated: 2023-05-28
 */

import { useState } from "react";
import Characters from "./tables/character.js";
import CharacterForm from "./form/createCharacterForm.js";
import Elements from "./tables/elements.js";

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
        <NavbarBrand href="/">API</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/create">Create</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/characters">Characters</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/elements">Element</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Routes>
        <Route path="/create" element={<CharacterForm />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/elements" element={<Elements />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
