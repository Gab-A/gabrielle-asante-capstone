import apiRequests from "./api-requests";

const getAllJournals = async () => {
  try {
    const response = await apiRequests(`http://localhost:8000/journal`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllJournals;
