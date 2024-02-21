import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useUpdatePayment = () => {
  const { paymentId } = useParams();
  const [formData, setFormData] = useState({
    paymentName: "",
    paymentStatus: "",
    imageFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_PAYMENT_API_URL
          }/GetPayment?paymentId=${paymentId}`
        );

        const paymentData = response.data;

        setFormData({
          paymentName: paymentData.paymentName,
          paymentStatus: paymentData.paymentStatus,
        });
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      }
    };

    fetchData();
  }, [paymentId]);

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

  const handleSubmit = async (e, paymentId) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_PAYMENT_API_URL
        }/UpdatePayment?paymentId=${paymentId}`,
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
        throw new Error("Failed to update payment");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
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

export default useUpdatePayment;
