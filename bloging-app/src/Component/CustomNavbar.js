import React, { useEffect, useState } from 'react';
import '../css/Navbar.css'; 
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { doLogout, getUserDetail, isLoggedIn } from '../auth';
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Define isOpen state
  const toggle = () => setIsOpen(!isOpen); // Define toggle function
  
   const [login,setLogin]=useState(false);
   const [user,setUser]=useState(undefined);

   useEffect(()=>{
    setLogin(isLoggedIn())
    setUser(getUserDetail())
   },[login])
   
   const logout=()=>{
        doLogout(()=>{
          setLogin(false);
          navigate("/");
        })
   }

  return (
    
    <div>
      <Navbar  light expand="md" className="navbar-custom">
        <NavbarBrand >OWN-BLOGS</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/aboutUs">
                About Us
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink href="/user/dashboard">
                Add Post
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="/create">
               Signup
              </NavLink>
            </NavItem> */}
            <NavItem>
             
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <Nav navbar> {/* Changed from "nav" to "Nav" */}
          {
            login && (
            <>  <NavItem>
              <NavLink  onClick={logout}> 
                Logout
              </NavLink>
            </NavItem>
               <NavItem>
               <NavLink> {/* Add the href attribute for Profile */}
          {user?.name}
        </NavLink>
             </NavItem>
             </>
            )
          }
          {
            !login &&(
              <>
              <NavItem>
              <NavLink href="/login"> {/* Moved "Login" NavLink to the Nav element */}
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup"> {/* Moved "Signup" NavLink to the Nav element */}
                Signup
              </NavLink>
            </NavItem>
              </>
            )
          } 
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
