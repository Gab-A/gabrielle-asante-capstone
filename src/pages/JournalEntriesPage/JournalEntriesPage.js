import { useState, useEffect } from "react";
import getAllJournals from "../../scripts/utils/get-all-journals";
import "./JournalEntriesPage.scss";
import { Link } from "react-router-dom";

export default function JournalEntriesPage({ journalEntry, onEditJournal }) {
  const [journals, setJournals] = useState(null);
  const [expand, setExpanded] = useState(false);
  // const [delete, setDelete] = useState(false)

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await getAllJournals();
        console.log(response);
        setJournals(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJournals();
  }, []);

  if (!journals) {
    return <p>Loading</p>;
  }

  const handleUpdate = (journalId) => {
    onEditJournal(journalId);
  };

  const handleExpand = (journal) => {
    setExpanded((selectedJournal) =>
      selectedJournal === journal ? null : journal
    );
  };
  return (
    <article className="journal-entries">
      <div className="journal-entries__wrapper">
        {journals.map((journal, index) => (
          <div key={index}>
            {" "}
            <div className="journal-entries__edit">
              <h4>{journal.title}</h4>
              <button onClick={() => handleUpdate(journalEntry.id)}>
                <Link to="/journal">Edit</Link>
              </button>
              <button>Delete</button>
            </div>
            {!expand || expand !== journal ? (
              <button onClick={() => handleExpand(journal)}>Read More</button>
            ) : (
              <div>
                <p>{journal.content}</p>

                <button onClick={() => handleExpand(journal)}>Read Less</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
