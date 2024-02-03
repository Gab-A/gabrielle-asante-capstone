import axios from "axios";
import apiRequests from "./api-requests";

const getMoods = async () => {
  try {
    // const response = await axios.get(`http://localhost:8000/journal/mood`);
    const response = await apiRequests(`http://localhost:8000/journal/mood`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getMoods;
