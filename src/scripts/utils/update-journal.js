const updateJournal = async (journalId, newJournalEntry) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/journal${journalId}`,
      newJournalEntry
    );
  } catch (error) {
    console.log(error);
  }
};
