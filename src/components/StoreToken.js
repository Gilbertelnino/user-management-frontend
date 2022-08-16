import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StoreToken = () => {
  const { token } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", token);
    navigate("/");
  }, [token, navigate]);

  return null;
};
export default StoreToken;
