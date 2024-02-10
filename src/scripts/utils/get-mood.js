import apiRequests from "./api-requests";

const getMoods = async () => {
  try {
    const response = await apiRequests(`http://localhost:8000/journal/mood`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getMoods;
