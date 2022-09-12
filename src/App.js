import ProfilePage from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import StoreToken from "./components/StoreToken";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Routes>
      <Route index element={<ProfilePage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="verify/:token" element={<StoreToken />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token/:email" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
