import axios from "axios";

const getAllJournals = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/journal`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllJournals;
