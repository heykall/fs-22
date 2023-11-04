import React from 'react';
import logo from '../assets/logo.svg';
import { Dropdown } from 'react-bootstrap';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid mx-lg-5 mt-lg-4">
        <a href="#" className="navbar-brand">
          <img src={logo} alt="logo" className="w-75" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-lg-3 text-center" id="font-general">
              <a className="nav-link active fw-medium" aria-current="page" href="../index.html">Beranda</a>
            </li>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="about-us-dropdown" className='text-decoration-none text-dark fw-medium'>
                Tentang Kami
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ backgroundColor: '#1ea7d1'}}>
                <Dropdown.Item href="#" className='text-light link-info'>Visi dan Misi</Dropdown.Item>
                <Dropdown.Item href="#" className='text-light link-info'>Tim LiterasiKita</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="our-programs-dropdown" className='text-decoration-none text-dark fw-medium'>
                Program Kami
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ backgroundColor: '#1ea7d1'}}>
                <Dropdown.Item href="#" className='text-light link-info'>BukuPedia</Dropdown.Item>
                <Dropdown.Item href="../halaman-video/index.html" className='text-light link-info'>NontonPintar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <ul className="d-flex navbar-nav">
            <li className="nav-item dropdown mx-lg-5 mt-lg-3 text-center" id="font-general">
              <a className="nav-link fw-medium active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Bahasa Indonesia</a>
              <ul className="dropdown-menu" id="warna">
                <li>
                  <a className="dropdown-item text-white bg-transparent" id="font-general" href="#">Bahasa Indonesia</a>
                </li>
                <li>
                  <a className="dropdown-item text-white bg-transparent" id="font-general" href="#">English</a>
                </li>
              </ul>
            </li>
            <li className="nav-item mt-3 text-center font-general" id="login">
              <a className="btn btn-link text-decoration-none text-warna fw-bold" href="../login/index.html">Login</a>
            </li>
            <li className="nav-item mt-3 text-center font-general" id="register">
              <a className="btn btn-primary text-warna fw-bold" href="../Sign Up/index.html" role="button">Daftar</a>
            </li>
            <li className="nav-item dropdown rounded-5 text-center" id="profil-dropdown" style={{ display: 'none' }}>
              <a className="nav-link fw-medium active dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="font-general">
                <img id="user-avatar" className="img-fluid border border-white border-2 rounded-circle" src="" alt="user" />
                <span id="user-name"></span>
              </a>
              <ul className="dropdown-menu" id="profil-dropdown">
                <li id="font-general">
                  <a className="dropdown-item text-center text-white bg-transparent" type="button" href="#">Profile</a>
                </li>
                <hr className="border border-white my-lg-1" />
                <li id="font-general">
                  <a id="logout-button" className="dropdown-item text-center text-white bg-transparent" href="#">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
