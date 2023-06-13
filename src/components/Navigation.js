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
import CreateCharacter from "./form/createCharacterForm.js";
import CharacterUpdateForm from "./form/updateCharacterForm.js";
import CharacterDelete from "./form/deleteCharacterForm.js";
import Characters from "./tables/character.js";
import Elements from "./tables/Elements.js";
import Rarities from "./tables/rarity.js";

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
              <NavLink href="/update">Update</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/delete">Delete</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/characters">Characters</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/elements">Element</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/rarities">Rarities</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Routes>
        <Route path="/create" element={<CreateCharacter />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="/rarities" element={<Rarities />} />
        <Route path="/update" element={<CharacterUpdateForm />} />
        <Route path="/delete" element={<CharacterDelete />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
