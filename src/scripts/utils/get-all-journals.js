import axios from "axios";
import apiRequests from "./api-requests";

const getAllJournals = async () => {
  try {
    // const response = await axios.get(`http://localhost:8000/journal`);
    const response = await apiRequests(`http://localhost:8000/journal`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllJournals;
