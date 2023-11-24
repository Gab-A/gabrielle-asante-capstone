import { useState, useEffect } from "react";
import getAllJournals from "../../scripts/utils/get-all-journals";
import "./JournalEntriesPage.scss";
import { Link, useParams } from "react-router-dom";
import deleteJournalById from "../../scripts/utils/delete-journal";
import editImage from "../../assets/icons/edit.png";
import deleteImage from "../../assets/icons/bin.png";

export default function JournalEntriesPage() {
  const [journals, setJournals] = useState(null);
  const [expand, setExpanded] = useState(false);
  // const [delete, setDelete] = useState(false)

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await getAllJournals();
        // console.log(response);
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

  // const handleDelete = async (journalId) => {
  //   try {
  //     const response = await deleteJournalById(journalId)
  //   }
  // }

  // Here creating a function to update the journal. And getting a specific one by it's id.
  // And then using that function when the button is clicked.

  // const handleUpdate = (journalId) => {
  //   onEditJournal(journalId);
  // };

  const handleExpand = (journal) => {
    setExpanded((selectedJournal) =>
      selectedJournal === journal ? null : journal
    );
  };
  // console.log(journalEntry);
  return (
    <section className="journal-entries">
      <h2 className="journal-entries__heading">Your Journal Entries</h2>
      <div className="journal-entries__wrapper">
        {journals.map((journal, index) => (
          <article key={index} className="journal-entries__card">
            {" "}
            <div className="journal-entries__edit">
              <h4 className="journal-entries__title">{journal.title}</h4>
              <div className="journal-entries__buttons">
                <Link to={`/journal/edit/${journal.id}`}>
                  <img
                    src={editImage}
                    alt="edit image"
                    className="journal-entries__edit-photo"
                  />
                </Link>
                {/* <Link to={`/journal/edit/${journal.id}`}>Edit</Link> */}
                <img
                  src={deleteImage}
                  alt="delete image"
                  className="journal-entries__delete-photo"
                />
              </div>
            </div>
            {!expand || expand !== journal ? (
              <button
                onClick={() => handleExpand(journal)}
                className="journal-entries__read"
              >
                Read More
              </button>
            ) : (
              <div>
                <p className="journal-entries__content">{journal.content}</p>
                <button
                  onClick={() => handleExpand(journal)}
                  className="journal-entries__read"
                >
                  Read Less
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
