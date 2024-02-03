import "./JournalEntries.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import deleteJournalById from "../../scripts/utils/delete-journal";
import JournalEntriesModal from "../../components/JournalEntriesModal/JournalEntriesModal";
import deleteIcon from "../../assets/icons/trash.svg";
import getAllJournals from "../../scripts/utils/get-all-journals";
import editDarkPurple from "../../assets/icons/edit-2 (3).svg";
import editMediumBlue from "../../assets/icons/edit-2 (4).svg";
import apiRequests from "../../scripts/utils/api-requests";

export default function JournalEntries({ setJournals, sortedJournals }) {
  const [expand, setExpanded] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (journalId) => {
    setSelectedJournal(journalId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJournal(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (journalId) => {
    try {
      // await deleteJournalById(journalId);
      await apiRequests(
        `http://localhost:8000/journal/${journalId}`,
        null,
        null,
        "delete"
      );
      const updatedJournals = await getAllJournals();
      setJournals(updatedJournals);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = () => {
    handleDelete(selectedJournal?.id);
  };

  const handleExpand = (journal) => {
    setExpanded((selectedJournal) =>
      selectedJournal === journal ? null : journal
    );
  };
  return (
    <>
      <div className="journal-entries__wrapper">
        {sortedJournals.map((journal, index) => (
          <article
            key={index}
            className={`journal-entries__card ${
              index % 2 === 0
                ? "journal-entries__card--even"
                : "journal-entries__card--odd"
            }`}
          >
            {" "}
            <div>
              <p className="journal-entries__date">
                {new Date(journal.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="journal-entries__title-container">
              <h4 className="journal-entries__title">{journal.title}</h4>
              <div className="journal-entries__buttons">
                <Link to={`/journal/edit/${journal.id}`}>
                  {index % 2 === 0 ? (
                    <img
                      src={editDarkPurple}
                      alt="edit icon"
                      className="journal-entries__edit"
                    />
                  ) : (
                    <img
                      src={editMediumBlue}
                      alt="edit icon"
                      className="journal-entries__edit"
                    />
                  )}
                </Link>
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  className="journal-entries__delete"
                  onClick={() => openModal(journal)}
                />
                <div
                  className="clickable-area"
                  onClick={() => openModal(journal)}
                ></div>
                <JournalEntriesModal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  selectedJournal={selectedJournal}
                  appElement={document.getElementById("root")}
                  onDelete={onDelete}
                />
              </div>
            </div>
            {!expand || expand !== journal ? (
              <button
                onClick={() => handleExpand(journal)}
                className={`journal-entries__read ${
                  index % 2 === 0
                    ? "journal-entries__read--even"
                    : "journal-entries__read--odd"
                }`}
              >
                Read More
              </button>
            ) : (
              <div>
                <p className="journal-entries__content">{journal.content}</p>
                <button
                  onClick={() => handleExpand(journal)}
                  className={`journal-entries__read ${
                    index % 2 === 0
                      ? "journal-entries__read--even"
                      : "journal-entries__read--odd"
                  }`}
                >
                  Read Less
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
