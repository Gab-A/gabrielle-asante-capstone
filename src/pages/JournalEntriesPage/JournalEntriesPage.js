import { useState, useEffect } from "react";
import getAllJournals from "../../scripts/utils/get-all-journals";
import "./JournalEntriesPage.scss";
import { Link } from "react-router-dom";
import deleteJournalById from "../../scripts/utils/delete-journal";
import editImage from "../../assets/icons/edit.png";
import deleteImage from "../../assets/icons/bin.png";
import journalLogo from "../../assets/icons/old-live-journal-logo.png";
import Modal from "../../components/Modal/Modal";

export default function JournalEntriesPage() {
  const [journals, setJournals] = useState(null);
  const [expand, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState(null);
  const [modalStates, setModalStates] = useState({});

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

  const toggleModal = (journalId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [journalId]: !prevState[journalId],
    }));
  };

  const clickDeleteIcon = (journalId) => {
    console.log("Clicked delete icon with ID:", journalId);
    setOpenModal(true);
    setSelectedJournalId(journalId);
  };

  const handleModalCancel = () => {
    setOpenModal(false);
  };

  const handleDelete = async (journalId) => {
    try {
      await deleteJournalById(journalId);
      const updatedJournals = await getAllJournals();
      setJournals(updatedJournals);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpand = (journal) => {
    setExpanded((selectedJournal) =>
      selectedJournal === journal ? null : journal
    );
  };

  return (
    <section className="journal-entries">
      <h4 className="journal-entries__heading">Journal Entries</h4>
      <div className="journal-entries__logo-container">
        <h3 className="journal-entries__subheading">Your Journal Entries</h3>
        <img
          src={journalLogo}
          alt="journal entries logo"
          className="journal-entries__logo"
        />
      </div>
      <p className="journal-entries__paragraph">
        See a list of all of your journal entries here:{" "}
      </p>
      <div className="journal-entries__wrapper">
        {journals.map((journal, index) => (
          <article
            key={index}
            className={`journal-entries__card ${
              index % 2 === 0
                ? "journal-entries__card--even"
                : "journal-entries__card--odd"
            }`}
          >
            {" "}
            <div className="journal-entries__edit">
              <h4 className="journal-entries__title">{journal.title}</h4>
              <div className="journal-entries__buttons">
                <Link to={`/journal/edit/${journal.id}`}>
                  <img
                    src={editImage}
                    alt="edit icon"
                    className="journal-entries__edit-photo"
                  />
                </Link>
                <img
                  src={deleteImage}
                  alt="delete icon"
                  className="journal-entries__delete-photo"
                  onClick={() => {
                    toggleModal(journal.id);
                    clickDeleteIcon(journal.id);
                  }}
                />
                {modalStates[journal.id] && (
                  <Modal
                    setOpenModal={(value) => toggleModal(journal.id, value)}
                    handleModalCancel={handleModalCancel}
                    selectedJournalId={selectedJournalId}
                    handleDelete={handleDelete}
                    openModal={openModal}
                  />
                )}
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
    </section>
  );
}
