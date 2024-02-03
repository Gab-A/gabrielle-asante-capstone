import apiRequests from "./api-requests";

const deleteJournalById = async (journalId) => {
  console.log("Deleting journal:", journalId);
  try {
    // const response = await axios.delete(
    //   `http://localhost:8000/journal/${journalId}`
    // );
    const response = await apiRequests(
      `http://localhost:8000/journal/${journalId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default deleteJournalById;
