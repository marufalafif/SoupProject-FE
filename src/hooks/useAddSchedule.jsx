import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useAddSchedule = () => {
  const { courseId } = useParams();
  const [formData, setFormData] = useState({
    courseId: courseId,
    startTime: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validasi format tanggal menggunakan regular expression
      const dateFormatRegex =
        /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday), \d{1,2} [a-zA-Z]+ \d{4}$/;
      if (!dateFormatRegex.test(formData.startTime)) {
        throw new Error(
          "Date format does not match. Use a format like: Wednesday, 27 September 2024"
        );
      }

      console.log("formData sebelum dikirim:", formData);
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_SCHEDULE_API_URL + "/addSchedule",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        window.location.reload();
        setSuccess(true);
      } else {
        throw new Error("Gagal menambahkan schedule");
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
    handleSubmit,
  };
};

export default useAddSchedule;
