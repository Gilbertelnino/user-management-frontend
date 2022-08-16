import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/styles.module.css";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavbarHeader = () => {
  const navigate = useNavigate();
  // logout user by remove token from localStorage
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const [user, setUser] = useState("");
  const [docState, setDocState] = useState("");

  useEffect(() => {
    // fetch user data from backend
    async function fetchData() {
      const result = await axios.get(`/user/profile`);
      const data = result?.data?.data?.user;
      const doc = result?.data?.data?.doc;
      setDocState(doc?.state);
      setUser(data?.profileUrl);
    }
    fetchData();
  }, []);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <img src={user} className={styles.avatar} alt="profile" />
            {docState === "VERIFIED" && <Badge bg="info">&#10003;</Badge>}
          </div>
          <Button variant="primary" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
    </>
  );
};

export default NavbarHeader;
