import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import UserGroups from "./UserGroups";

function AppNavbar(props) {
  const user = props.user;

  return (
    <Navbar expand="lg" className="nav">
      <Container>
        <Link href="/" passHref={true}>
          <Navbar.Brand>Free From Class</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            {user && (
              <Link href="/my-schedule" passHref={true}>
                <Nav.Link>My Schedule</Nav.Link>
              </Link>
            )}
            {user && (
              <Link href="/groups-management" passHref={true}>
                <Nav.Link>Groups Management</Nav.Link>
              </Link>
            )}
            {user && (
              <NavDropdown title={<> My Groups</>}>
                <UserGroups />
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown
                title={
                  <>
                    Hi, {user.name}
                    <Image
                      className="ml-2"
                      src={user.picture}
                      width={24}
                      height={24}
                    />
                  </>
                }
              >
                <NavDropdown.Item className="text-danger" href="/api/logout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button data-cy="login" href="/api/login">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
