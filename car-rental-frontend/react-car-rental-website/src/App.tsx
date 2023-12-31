import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CarsPage from "./pages/Cars";
import AdminLogin from "./pages/AdminLoginPage";
import AdminBoard from "./pages/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/car" element={<CarsPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminpage" element={<AdminBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
