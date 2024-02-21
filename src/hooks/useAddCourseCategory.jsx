import { useState } from "react";
import axios from "axios";

const useAddCourseCategory = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDesc: "",
    categoryStatus: "",
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
        import.meta.env.VITE_REACT_APP_CATEGORY_API_URL + "/AddCategory",
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
        throw new Error("Gagal menambahkan kursus");
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

export default useAddCourseCategory;
