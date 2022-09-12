import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import styles from "../styles/styles.module.css";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
      if (form.checkValidity() === true) {
        // login
        const response = await axios.post("/user/forgot-password", { email });
        const message = response.data.message;
        setSuccess(message);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className={styles.logincontainer}>
      <h1>Reset password</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Row} md="4" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              email is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Button type="submit">Reset Password</Button>
      </Form>
      <p className={styles.text}>
        remember password? <Link to="/login">login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
