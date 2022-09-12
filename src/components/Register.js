import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styles from "../styles/styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    birthDate: "",
    martalStatus: "",
    gender: "",
    nationality: "",
    email: "",
    password: "",
  });
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
  const strongPassswordError = new Error(
    "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length"
  );

  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleStrongPassword = (e) => {
    const { name, value } = e.target;
    if (!strongPasswordRegex.test(value)) {
      setError(strongPassswordError.message);
      setData({ ...data, [name]: value });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  //   console.log("data: ", data);

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
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
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("age", data.age);
        formData.append("birthDate", data.birthDate);
        formData.append("maritalStatus", data.martalStatus);
        formData.append("gender", data.gender);
        formData.append("nationality", data.nationality);
        formData.append("email", data.email);
        formData.append("password", data.password);

        const submitDat = await axios.post(
          "http://localhost:5000/api/user/register",
          formData
        );
        console.log("submitDat: ", submitDat);
        setMessage(submitDat?.data?.message);
      }
    } catch (error) {
      console.log("error generated: ", error);
      setError(error.response?.data?.error);
    }
  };

  // clear message and errors after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, error]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className={styles.registerContainer}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              first name is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              last name is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="your age"
              name="age"
              value={data.age}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              age is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>birthDate</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="birth date"
              name="birthDate"
              value={data.birthDate}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              birth data is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>marital status</Form.Label>
            <Form.Select
              aria-label="martal status"
              name="martalStatus"
              value={data.martalStatus}
              onChange={handleChange}
            >
              <option>Select marital status</option>
              <option value="SINGLE">single</option>
              <option value="MARRIED">married</option>
              <option value="DIVORCED">devorced</option>
              <option value="WIDOWED">widowed</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              marital status is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="gender"
              name="gender"
              value={data?.gender}
              onChange={handleChange}
            >
              <option>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Gender is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nationality"
              name="nationality"
              value={data?.nationality}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Nationality is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              required
              type="file"
              placeholder="photo"
              name="file"
              onChange={handleFileUpload}
            />
            <Form.Control.Feedback type="invalid">
              Your photo is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="email"
              name="email"
              value={data?.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              email is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="password"
              name="password"
              value={data?.password}
              onChange={handleStrongPassword}
            />
            <Form.Control.Feedback type="invalid">
              Password is required
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="submit">Register </Button>
      </Form>
      <p className={styles.registerText}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
