import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import styles from "../styles/styles.module.css";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  //   get token and email from url
  const params = useParams();
  const validToken = params?.token;
  const email = params?.email;

  // handle change
  const handleChange = (e) => {
    setPassword(e.target.value);
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
        const response = await axios.patch(
          `/user/reset-password/${validToken}/${email}`,
          { password }
        );
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
          <Form.Group as={Row} md="6" controlId="validationCustom01">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter new password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              password is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Button type="submit">change Password</Button>
      </Form>
      <p className={styles.text}>
        <Link to="/login">login</Link>
      </p>
    </div>
  );
};

export default ResetPassword;
