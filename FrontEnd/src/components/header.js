import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
const Header = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink
                                data-tooltip-content="Home"
                                className='nav-link'
                                to="/">
                                Home
                            </NavLink>
                            <NavLink
                                data-tooltip-content="User"
                                className='nav-link'
                                to="/user">User
                            </NavLink>
                            <NavLink className='nav-link'
                                data-tooltip-content="Admin"
                                to="/admin">
                                Admin
                            </NavLink>

                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Tooltip
                anchorSelect=".nav-link"
                effect="solid"
                border={true}
                className='bg-danger'
            />
        </>

    );
}

export default Header;