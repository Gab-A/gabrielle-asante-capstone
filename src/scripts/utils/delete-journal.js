import axios from "axios";

const deleteJournalById = async (journalId) => {
  console.log("Deleting journal:", journalId);
  try {
    const response = await axios.delete(
      `http://localhost:8000/journal/${journalId}`
    );
    // console.log(" Delete Response", response);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default deleteJournalById;
