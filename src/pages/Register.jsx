import { useState } from "react";
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
  // state yang di kirim
  const [formData, setFormData] = useState({
    nama: "",
    jenisKelamin: "",
    email: "",
    password: "",
    confirmPassword: "",
    noHp: "",
    bio: "",
  });
  // error message
  const [errorMessage, setErrorMessage] = useState("");
  // handle ketikan inputan
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // handle ketika di klik submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    // console.log(formData);
    // ambil data dari state form data
    const { nama, jenisKelamin, email, password, confirmPassword, noHp, bio } =
      formData;

    // ngecek setiap inputan user
    if (!nama || !jenisKelamin || !email || !password || !confirmPassword) {
      setErrorMessage("Semua field harus diisi.");
    }
    // ngecek password dan confirm password
    else if (password !== confirmPassword) {
      setErrorMessage("Password dan Confirm Password harus sama.");
    } else {
      // console.log(
      //   nama,
      //   jenisKelamin,
      //   email,
      //   password,
      //   confirmPassword,
      //   noHp,
      //   bio
      // );
      // kalo semua inputan sudah oke maka
      try {
        //
        const data = await axios.post(
          "http://localhost:3000/auth/register",
          {
            nama,
            jenisKelamin,
            email,
            password,
            confirmPassword,
            noHp,
            bio,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
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
      <Container className="mb-5">
        <Row className="align-items-center">
          <Col lg={5} md={12} mt={5} style={{ marginBottom: "5rem" }}>
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
                  onChange={handleChange} // Tambahkan ini
                  value={formData.nama} // Tambahkan ini
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="jenis-kelamin">Jenis kelamin</Form.Label>
                <Form.Select
                  id="jenisKelamin"
                  onChange={handleChange} // Tambahkan ini
                  value={formData.jenisKelamin} // Tambahkan ini
                >
                  <option>-- Pilih Jenis kelamin --</option>
                  <option value="pria">Pria</option>
                  <option value="wanita">Wanita</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  onChange={handleChange} // Tambahkan ini
                  value={formData.email} // Tambahkan ini
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  onChange={handleChange} // Tambahkan ini
                  value={formData.password} // Tambahkan ini
                  placeholder="Password (minimal 8 karakter)"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="confirm-password">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  onChange={handleChange} // Tambahkan ini
                  value={formData.confirmPassword} // Tambahkan ini
                  placeholder="Confirm Password (minimal 8 karakter)"
                />
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
