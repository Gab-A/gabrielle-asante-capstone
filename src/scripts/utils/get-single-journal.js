import apiRequests from "./api-requests";

const getJournalById = async (journalId) => {
  try {
    const response = await apiRequests(
      `http://localhost:8000/journal/${journalId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getJournalById;
