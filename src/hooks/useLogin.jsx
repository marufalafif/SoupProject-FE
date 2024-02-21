import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const apiUrl = import.meta.env.VITE_REACT_APP_USER_API_URL + "/login";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      setFormData({
        email: "",
        password: "",
      });
      setError(null);

      // Simpan data login ke local storage
      localStorage.setItem("user", JSON.stringify(data));

      // Arahkan pengguna ke halaman berdasarkan role
      if (data.role === "admin") {
        navigate("/admin-dashboard/user");
      } else {
        navigate("/");
      }

      window.location.reload();
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleLogin,
  };
};

export default useLogin;
