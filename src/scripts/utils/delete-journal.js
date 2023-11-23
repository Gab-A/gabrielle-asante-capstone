import axios from "axios";

const deleteJournalById = async (journalId) => {
  console.log("fetch journal");
  try {
    const response = await axios.get(
      `http://localhost:8000/journal/${journalId}`
    );
    console.log("Response", response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default deleteJournalById;
