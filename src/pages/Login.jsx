import { Container, Row, Col, Image, Form, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ellipseBackground from "../assets/svg/ellipse-background.svg";
import Google from "../assets/svg/Google.svg";
import Apple from "../assets/svg/Apple.svg";
import Facebook from "../assets/svg/Facebook.svg";
import Character from "../assets/svg/Character.svg";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const dataLocalStorage = localStorage.getItem("data");
  const userData = JSON.parse(dataLocalStorage);
  const navigate = useNavigate(); // to navigate to different pages
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(login);
    const { email, password } = login;
    if (!email || !password) {
      alert("Silahkan isi email dan password");
    }

    try {
      const { data } = await axios.post(
        `https://charming-cloak-boa.cyclic.app/auth/login`,
        {
          email,
          password,
        }
      );
      const {
        token,
        role,
        nama,
        jenisKelamin,
        _id,
        email: userEmail,
        profileImage,
        bio,
        noHp,
      } = data;
      const userData = {
        token,
        role,
        nama,
        jenisKelamin,
        email: userEmail,
        profileImage,
        bio,
        noHp,
        _id,
      };
      localStorage.setItem("data", JSON.stringify(userData));
      // Redirect the user to another page (you can replace '/dashboard' with the desired path)
      toast.success("Anda berhasil login");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Login gagal. Periksa kembali email dan password");
    }
  };

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData]);

  return (
    <>
      <div className="halaman-login">
        <ToastContainer />
        <Container className="mt-5 mb-5">
          <Image
            src={ellipseBackground}
            fluid
            className="position-absolute img2 top-1"
            width="35%"
            alt="Ellipse Background"
          />
          <Row className="align-items-center">
            <Col lg={5} md={12} className="">
              <h1 className="text-center text-lg-start fw-bold">
                Masuk untuk Menikmati fitur kami
              </h1>
              <p className="fw-medium mt-4 font-20 text-center text-lg-start">
                jika Anda belum memiliki akun,
                <br />
                Anda dapat
                <Link
                  to="/register"
                  className="btn btn-link text-decoration-none fw-bold font-20 position-relative z-index-1"
                  id={styles.textWarna}
                >
                  Daftar di sini!
                </Link>
              </p>
            </Col>
            <Col
              lg={4}
              md={12}
              className="align-self-center align-items-center"
            >
              <Image
                src={Character}
                alt=""
                fluid
                width="80%"
                className="img-fluid"
              />
            </Col>
            <Col lg={3} md={12} className="align-self-start mt-5">
              <Form id="login-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                    value={login.email}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    onChange={handleChange}
                    value={login.password}
                  />
                </Form.Group>
                <div className="mb-3 justify-content-end text-end">
                  <Nav.Link
                    href="/reset-password"
                    className="text-decoration-none text-black-50"
                  >
                    Pulihkan kata sandi?
                  </Nav.Link>
                </div>
                <div className="mb-3">
                  <Button
                    type="submit"
                    className="btn btn-light text-white w-100"
                    id={styles.bgWarna}
                  >
                    Submit
                  </Button>
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
      </div>
    </>
  );
}

export default Login;
