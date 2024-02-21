import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAddCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    categoryId: "",
    courseDesc: "",
    coursePrice: "",
    courseStatus: "",
    courseImage: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Periksa apakah yang diubah adalah "coursePrice"
    const newValue = name === "coursePrice" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleFileChange = (e) => {
    const courseImage = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      courseImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("formData sebelum dikirim:", formData);
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_COURSE_API_URL + "/AddCourse",
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
          navigate(
            "/admin-dashboard/course/form-add-course/add-schedule/" +
              response.data.courseId
          );
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

export default useAddCourse;
