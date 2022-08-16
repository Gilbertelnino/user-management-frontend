import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import NavbarHeader from "./Navbar";
import styles from "../styles/styles.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [document, setDocument] = useState("");
  const [prevDoc, setPrevDoc] = useState({
    idNumber: "",
    documentURL: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setDocument(file);
  };
  const handleIdNumberChange = (e) => {
    const { value } = e.target;
    setPrevDoc({ ...prevDoc, idNumber: value });
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
        formData.append("doc", document);
        formData.append("IDNumber", prevDoc.idNumber);
        const submitDat = await axios.post("/user/document/add", formData);
        setMessage(submitDat.data.message);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const token = localStorage.getItem("token");

  // fetch user data from backend
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    birthDate: "",
    martalStatus: "",
    gender: "",
    nationality: "",
    email: "",
    password: "",
    photoUrl: "",
    idNumber: "",
  });

  useEffect(() => {
    // fetch user data from backend
    async function fetchData() {
      const result = await axios.get(`/user/profile`);

      const user = result?.data?.data?.user;
      const doc = result?.data?.data?.doc;
      setUser({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        birthDate: user.birthDate,
        martalStatus: user.maritalStatus,
        gender: user.gender,
        nationality: user.nationality,
        email: user.email,
        profileUrl: user.profileUrl,
      });
      setPrevDoc({
        idNumber: doc.IDNumber,
        documentURL: doc.officialDocument,
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, error]);

  return (
    <>
      <NavbarHeader />
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.profileimage__container}>
            <div className={styles.profileimage}>
              <img
                src={user?.profileUrl}
                className={styles.image}
                alt="profile"
              />
            </div>
          </div>
          <div className={styles.profileinfo}>
            <div className={styles.generalinfo}>
              <h3> General information</h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      value={user?.firstName}
                      name="firstName"
                      readOnly
                      disabled
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
                      value={user?.lastName}
                      name="lastName"
                      readOnly
                      disabled
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
                      value={user?.age}
                      name="age"
                      readOnly
                      disabled
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
                      value={user?.birthDate}
                      name="birthDate"
                      readOnly
                      disabled
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
                      value={user?.martalStatus}
                      disabled
                    >
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
                      value={user?.gender}
                      disabled
                    >
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
                      value={user?.nationality}
                      readOnly
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      Nationality is required
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="email"
                      name="email"
                      value={user?.email}
                      readOnly
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      email is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <div className={styles.verifiedinfo}>
                  <h3>Verified information</h3>
                </div>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Identification number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="identification number"
                      value={prevDoc.idNumber}
                      onChange={handleIdNumberChange}
                      name="idNumber"
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Identification document</Form.Label>
                    {!prevDoc?.documentURL ? (
                      <Form.Control
                        type="file"
                        placeholder="document"
                        onChange={handleFileUpload}
                      />
                    ) : (
                      <img
                        src={prevDoc.documentURL}
                        alt="document"
                        style={{ width: "200px", height: "200px" }}
                      />
                    )}
                  </Form.Group>
                </Row>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                {!prevDoc?.documentURL && (
                  <Button type="submit">Add document</Button>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
