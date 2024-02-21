import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useCreatePassword = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [passwordData, setPasswordData] = useState({
    email: userData.email,
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePassword = async () => {
    try {
      setLoading(true);

      const apiUrl =
        import.meta.env.VITE_REACT_APP_USER_API_URL + "/ResetPassword";

      if (passwordData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      if (passwordData.password !== passwordData.confirmPassword) {
        throw new Error("Password and Confirm Password do not match");
      }

      const response = await axios.post(apiUrl, passwordData);

      if (response.status !== 200) {
        throw new Error("Password creation failed");
      }

      localStorage.removeItem("user");

      navigate("/login");

      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    passwordData,
    loading,
    error,
    handleChange,
    handleCreatePassword,
  };
};

export default useCreatePassword;
