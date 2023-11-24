import axios from "axios";

const getMoods = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/journal/mood`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getMoods;
