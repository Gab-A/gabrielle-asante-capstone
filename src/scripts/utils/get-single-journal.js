import axios from "axios";

const getJournalById = async (journalId) => {
  console.log("journal");
  try {
    const response = await axios.get(
      `http://localhost:8000/journal/${journalId}`
    );
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getJournalById;
