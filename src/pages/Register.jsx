import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ellipseBackground from "../assets/svg/ellipse-background.svg";
import Google from "../assets/svg/Google.svg";
import Apple from "../assets/svg/Apple.svg";
import Facebook from "../assets/svg/Facebook.svg";
import Character from "../assets/svg/Character.svg";
import styles from "./Register.module.css";

export default function Register() {
  const [formData, setFormData] = useState({
    nama: "",
    jenisKelamin: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const {
      nama,
      jenisKelamin,
      email,
      password,
      confirmPassword,
      profilePicture,
    } = formData;

    if (!nama || !jenisKelamin || !email || !password || !confirmPassword) {
      setErrorMessage("Semua field harus diisi.");
    } else if (password !== confirmPassword) {
      setErrorMessage("Password dan Confirm Password harus sama.");
    } else {
      try {
        const response = await axios.post(
          "https://645611f25f9a4f23613a06ba.mockapi.io/account",
          {
            profilePicture,
            nama,
            jenisKelamin,
            email,
            password,
          }
        );

        alert(
          "Pendaftaran berhasil! Anda akan diarahkan ke halaman login dalam 2 detik."
        );

        // Arahkan pengguna ke halaman login setelah 2 detik
        setTimeout(() => {
          // Use React Router DOM to navigate to the login page
          // Adjust the route path as needed
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        setErrorMessage("Terjadi kesalahan saat mengirim data.");
      }
    }
  };


  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col lg={5} md={12} mt={5} mb-lg-5>
            <img
              src={ellipseBackground}
              className="img-fluid position-absolute img2 top-0"
              width="40%"
              alt="Ellipse Background"
            />
            <h1 className="text-center text-lg-start fw-bold">
              Masuk untuk Menikmati fitur kami
            </h1>
            <p className="fw-medium mt-4 font-20 text-center text-lg-start">
              jika Anda sudah memiliki akun,
              <br />
              Anda dapat
              <Link
                to="/login"
                className="btn btn-link text-decoration-none fw-bold font-20 position-relative z-index-1"
                id={styles.textWarna}
              >
                Login di sini!
              </Link>
            </p>
          </Col>
          <Col lg={4} md={12} className="align-self-center align-items-center">
            <img
              src={Character}
              alt="Character"
              width="80%"
              className="img-fluid"
            />
          </Col>
          <Col lg={3} md={12} className="align-self-start mt-5">
            <Form onSubmit={handleSubmit} id="register-form">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="nama-lengkap">Nama lengkap</Form.Label>
                <Form.Control
                  type="text"
                  id="nama"
                  aria-describedby="namaHelp"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="jenis-kelamin">Jenis kelamin</Form.Label>
                <Form.Select id="jenis-kelamin">
                  <option>-- Pilih Jenis kelamin --</option>
                  <option value="laki-laki">Laki - laki</option>
                  <option value="perempuan">Perempuan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password" id="password" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="confirm-password">
                  Confirm Password
                </Form.Label>
                <Form.Control type="password" id="confirm-password" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button
                  type="submit"
                  className="btn btn-light bg-warna text-white w-100"
                  id={styles.bgWarna}
                >
                  Submit
                </Button>
              </Form.Group>
              <div id="error-message" className="error-message">
              {errorMessage && <p>{errorMessage}</p>}
              </div>
            </Form>
            <Row className="mt-5">
              <Col xs={2}>
                <hr />
              </Col>
              <Col xs={8}>
                <p className="text-center fw-light">Atau lanjutkan dengan</p>
              </Col>
              <Col xs={2}>
                <hr />
              </Col>
            </Row>
            <Row className="text-center mt-3">
              <Col xs={4}>
                <Button className="btn btn-light" href="#" role="button">
                  <Image src={Google} alt="" />
                </Button>
              </Col>
              <Col xs={4}>
                <Button className="btn btn-light" href="#" role="button">
                  <Image src={Apple} alt="" />
                </Button>
              </Col>
              <Col xs={4}>
                <Button className="btn btn-light" href="#" role="button">
                  <Image src={Facebook} alt="" />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
