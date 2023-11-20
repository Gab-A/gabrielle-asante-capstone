import axios from "axios";

const getAllQuotes = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/quotes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllQuotes;
