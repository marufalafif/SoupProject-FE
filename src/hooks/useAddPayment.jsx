import { useState } from "react";
import axios from "axios";

const useAddPayment = () => {
  const [formData, setFormData] = useState({
    paymentName: "",
    paymentStatus: "",
    imageFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      imageFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_PAYMENT_API_URL + "/AddPayment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        throw new Error("Gagal menambahkan payment method");
      }
    } catch (error) {
      setError(error.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    success,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useAddPayment;
