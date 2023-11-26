import axios from "axios";

const getJournalById = async (journalId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/journal/${journalId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getJournalById;
