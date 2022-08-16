import ProfilePage from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import StoreToken from "./components/StoreToken";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<ProfilePage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="verify/:token" element={<StoreToken />} />
    </Routes>
  );
}

export default App;
