import { useState, useEffect } from "react";
import getAllJournals from "../../scripts/utils/get-all-journals";
import "./JournalEntriesPage.scss";
import { Link } from "react-router-dom";
import deleteJournalById from "../../scripts/utils/delete-journal";
import editImage from "../../assets/icons/edit.png";
import deleteImage from "../../assets/icons/bin.png";
import journalLogo from "../../assets/icons/old-live-journal-logo.png";
import journalAnimation from "../../assets/animations/journal.json";
import deleteIcon from "../../assets/icons/trash.svg";
// import editIcon from "../../assets/icons/edit-2.svg";
// import editAirBlue from "../../assets/icons/edit-2 (5).svg";
// import editIconTwo from "../../assets/icons/edit-2 (2).svg";
import editDarkPurple from "../../assets/icons/edit-2 (3).svg";
import editMediumBlue from "../../assets/icons/edit-2 (4).svg";
import Lottie from "lottie-react";
import JournalEntriesModal from "../../components/JournalEntriesModal/JournalEntriesModal";

export default function JournalEntriesPage() {
  const [journals, setJournals] = useState(null);
  const [expand, setExpanded] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);
  // const [modalStates, setModalStates] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

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

  // const toggleModal = (journalId) => {
  //   setModalStates((prevState) => ({
  //     ...prevState,
  //     [journalId]: !prevState[journalId],
  //   }));
  // };

  const openModal = (journalId) => {
    setSelectedJournal(journalId);
    setIsModalOpen(true);
    console.log("Modal should be open now");
  };

  const closeModal = () => {
    setSelectedJournal(null);
    setIsModalOpen(false);
    console.log("Modal should be closed now");
  };

  // const clickDeleteIcon = (journalId) => {
  //   setOpenModal(true);
  //   setSelectedJournalId(journalId);
  // };

  // const handleModalCancel = () => {
  //   setOpenModal(false);
  // };

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
        {/* <h4 className="journal-entries__heading">Journal Entries</h4> */}
        <div className="journal-entries__logo-container">
          <h3 className="journal-entries__heading">Your Journal Entries</h3>
          <Lottie
            animationData={journalAnimation}
            className="journal-entries__logo"
            loop={false}
          />
        </div>
        <p className="journal-entries__subheading">
          See a list of all of your journal entries here:{" "}
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

                    // onClick={() => {
                    //   toggleModal(journal.id);
                    //   clickDeleteIcon(journal.id);
                    // }}
                  />
                  <div
                    className="clickable-area"
                    onClick={() => openModal(journal)}
                  ></div>
                  {/* {modalStates[journal.id] && (
                    <Modal
                      setOpenModal={(value) => toggleModal(journal.id, value)}
                      handleModalCancel={handleModalCancel}
                      selectedJournalId={selectedJournalId}
                      handleDelete={handleDelete}
                      openModal={openModal}
                    />
                  )} */}
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
