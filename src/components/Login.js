import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [data, setDate] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate({ ...data, [name]: value });
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
        const response = await axios.post("/user/login", data);
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
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
      <h1>Welcome back</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Row} md="4" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter your email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              email is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Row} md="4" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Your Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              password is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row className="mt-3">
          <Col>
            <Button type="submit">Login</Button>
          </Col>
          <Col>
            <Link to="/forgot-password" style={{ fontSize: "14px" }}>
              Forgot password?
            </Link>
          </Col>
        </Row>
      </Form>
      <p className={styles.text} style={{ marginTop: "12px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
