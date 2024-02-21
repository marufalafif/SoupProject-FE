import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useUpdateCourseCategory = () => {
  const { categoryId } = useParams();
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDesc: "",
    categoryStatus: "",
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
            import.meta.env.VITE_REACT_APP_CATEGORY_API_URL
          }/GetCategory?categoryId=${categoryId}`
        );

        const categoryData = response.data;

        setFormData({
          categoryName: categoryData.categoryName,
          categoryDesc: categoryData.categoryDesc,
          categoryStatus: categoryData.categoryStatus,
        });
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      }
    };

    fetchData();
  }, [categoryId]);

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

  const handleSubmit = async (e, categoryId) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_CATEGORY_API_URL
        }/UpdateCategory?categoryId=${categoryId}`,
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
        throw new Error("Failed to update category");
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

export default useUpdateCourseCategory;
