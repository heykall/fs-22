import logo from "../assets/logo.svg";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "./navbar.css";
import { useEffect } from "react";
import { BsCaretDownFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function NavbarComponent() {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("data");
    navigate("/login");
  };
  const dataLocalStorage = localStorage.getItem("data");
  const userData = JSON.parse(dataLocalStorage);

  useEffect(() => {}, [userData]);
  return (
    <Navbar expand="lg">
      <div className="container-fluid mx-lg-5 mt-lg-4 ">
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" className="w-75" />
        </Navbar.Brand>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar.Collapse id="navbarTogglerDemo02">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Item className="nav-item mx-lg-3 text-center fw-semibold">
              <Nav.Link href="/">Beranda</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item mx-lg-3 text-center fw-semibold">
              <Nav.Link href="/tim-LiterasiKita">Tentang Kami</Nav.Link>
            </Nav.Item>
            <NavDropdown
              title="Program Kami"
              id="our-programs-dropdown"
              className="text-decoration-none text-center text-dark fw-semibold custom-dropdown"
            >
              <NavDropdown.Item
                href="/halaman-buku"
                className="text-light link-dark fw-semibold text-center"
              >
                BukuPedia
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/halaman-video"
                className="text-light link-dark fw-semibold text-center"
              >
                NontonPintar
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className=" ms-auto d-flex navbar-nav">
            {userData ? (
              <Nav.Item
                className="nav-item rounded-5 text-center font-general custom-dropdown"
                id="profil-dropdown"
              >
                <div className="dropdown">
                  <Nav.Link
                    className="nav-link fw-semibold active text-white "
                    role="button"
                    id="font-general"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      id="user-avatar"
                      className="img-fluid border border-white border-2 rounded-circle"
                      style={{ width: "30px", height: "30px" }}
                      src={userData.profileImage}
                      alt="user"
                    />
                    <span id="user-name">{userData.nama}</span>
                    <BsCaretDownFill className="ms-1" />{" "}
                    {/* Icon panah ke bawah */}
                  </Nav.Link>
                  <div className="dropdown-menu text-center">
                    <div
                      className="dropdown-item text-light link-dark fw-semibold text-center"
                      onClick={handleProfile}
                    >
                      Profile
                    </div>
                    <div className="dropdown-divider"></div>
                    <div
                      className="dropdown-item text-light link-dark fw-semibold text-center"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item
                  className="nav-item mt-3 text-center font-general"
                  id="login"
                >
                  <Nav.Link
                    className="btn btn-link text-decoration-none text-primary fw-bold"
                    href="/login"
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className="nav-item mt-2 text-center font-general"
                  id="regsiter"
                >
                  <Nav.Link
                    className="btn btn-link text-decoration-none text-primary fw-bold"
                    href="/register"
                  >
                    <Button className="fw-bold">Daftar</Button>
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarComponent;
