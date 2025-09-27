import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  NavbarToggler,
  Collapse
} from 'reactstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md" className="mb-4 px-3">
      <NavbarBrand tag={Link} to="/">BookSwap</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Browse</NavLink>
          </NavItem>
          {user && (
            <>
              <NavItem>
                <NavLink tag={Link} to="/post">Post Book</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/mine">My Listings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/transactions">My Transactions</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
        <Nav navbar>
          {!user ? (
            <>
              <NavItem><NavLink tag={Link} to="/login">Login</NavLink></NavItem>
              <NavItem><NavLink tag={Link} to="/signup">Signup</NavLink></NavItem>
            </>
          ) : (
            <Button color="secondary" onClick={logout}>Logout</Button>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}
