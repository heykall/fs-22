import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setResetPassword({ ...resetPassword, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://charming-cloak-boa.cyclic.app/auth/reset-password",
        resetPassword
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="reset-password">
        <Container>
          <Row className="justify-content-center">
            <Col lg={3} md={12} className="align-self-start mt-5">
              <Form id="reset-password-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                    value={resetPassword.email}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="newPassword"
                    onChange={handleChange}
                    value={resetPassword.newPassword}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    onChange={handleChange}
                    value={resetPassword.confirmPassword}
                  />
                </Form.Group>
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
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}

export default ResetPassword;
