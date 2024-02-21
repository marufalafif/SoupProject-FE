import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "guest",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateInputs = () => {
    // Validasi semua input tidak boleh kosong
    for (const key in formData) {
      if (formData[key].trim() === "") {
        throw new Error("All fields must be filled out.");
      }
    }

    // Validasi nama harus mengandung huruf
    if (!/^[a-zA-Z ]+$/.test(formData.username)) {
      throw new Error("Name should contain only letters.");
    }

    // Validasi email menggunakan regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error("Invalid email format.");
    }

    // Validasi password harus sama dengan confirmPassword
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    // Validasi password minimal 8 karakter
    if (formData.password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }
  };

  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Validasi input sebelum mengirim data
      validateInputs();

      const apiUrl =
        import.meta.env.VITE_REACT_APP_USER_API_URL + "/CreateUser";
      const response = await axios.post(apiUrl, formData);

      if (response.status === 201) {
        setSuccessMessage("Registration successful! You can now login.");

        // Arahkan pengguna ke halaman email confirmation
        navigate("/emailConfirmation");

        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setSuccessMessage(null);
        throw new Error("Registration failed. Please try again.");
      }
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    error,
    successMessage,
    isLoading,
    handleInputChange,
    handleSignUp,
  };
};

export default useRegister;
