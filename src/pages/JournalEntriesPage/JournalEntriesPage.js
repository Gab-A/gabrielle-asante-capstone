import { useState, useEffect } from "react";
import getAllJournals from "../../scripts/utils/get-all-journals";
import "./JournalEntriesPage.scss";
import { Link } from "react-router-dom";
import deleteJournalById from "../../scripts/utils/delete-journal";
import journalAnimation from "../../assets/animations/journal.json";
import deleteIcon from "../../assets/icons/trash.svg";
import editDarkPurple from "../../assets/icons/edit-2 (3).svg";
import editMediumBlue from "../../assets/icons/edit-2 (4).svg";
import Lottie from "lottie-react";
import JournalEntriesModal from "../../components/JournalEntriesModal/JournalEntriesModal";

export default function JournalEntriesPage() {
  const [journals, setJournals] = useState(null);
  const [expand, setExpanded] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await getAllJournals();
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
      await deleteJournalById(journalId);
      const updatedJournals = await getAllJournals();
      setJournals(updatedJournals);
      closeModal();
      console.log(`Journal with ID ${journalId} deleted successfully`);
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

  const sortedJournals = [...journals].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <section className="journal-entries">
      <div className="journal-entries__container">
        <div className="journal-entries__logo-container">
          <h3 className="journal-entries__heading">Your Journal Entries</h3>
          <Lottie
            animationData={journalAnimation}
            className="journal-entries__logo"
            loop={false}
          />
        </div>
        <p className="journal-entries__subheading">
          See a list of all your entries here:
        </p>
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
      </div>
    </section>
  );
}
