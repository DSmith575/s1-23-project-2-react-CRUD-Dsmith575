import { useState } from "react";
import Characters from "../components/tables/Characters.js";
import CharacterForm from "./form/momo.js";
import Elements from "./tables/Elements.js";

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
