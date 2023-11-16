import React from "react";
import { Container, Row, Col, Image, Form, Button, Nav } from "react-bootstrap";
import ellipseBackground from "../assets/svg/ellipse-background.svg";
import Google from "../assets/svg/Google.svg";
import Apple from "../assets/svg/Apple.svg";
import Facebook from "../assets/svg/Facebook.svg";
import Character from "../assets/svg/Character.svg";

function Login() {
  return (
    <Container className="mt-5">
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
            <a
              href="#"
              className="btn btn-link text-decoration-none text-warna fw-bold font-20 position-relative z-index-1"
            >
              Login di sini!
            </a>
          </p>
        </Col>
        <Col lg={4} md={12} className="align-self-center align-items-center">
          <Image
            src={Character}
            alt=""
            fluid
            width="80%"
            className="img-fluid"
          />
        </Col>
        <Col lg={3} md={12} className="align-self-start mt-5">
          <Form id="login-form">
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                aria-describedby="emailHelp"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" id="password" />
            </Form.Group>
            <div className="mb-3 justify-content-end text-end">
              <Nav.Link href="#" className="text-decoration-none text-black-50">
                Pulihkan kata sandi?
              </Nav.Link>
            </div>
            <div className="mb-3">
              <Button
                type="submit"
                className="btn btn-light  text-white w-100"
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
              <p className="text-center fw-light">Or continue with</p>
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
  );
}

export default Login;
