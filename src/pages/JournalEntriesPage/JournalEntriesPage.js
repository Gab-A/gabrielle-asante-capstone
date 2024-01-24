import { useState, useEffect, useCallback } from "react";
import getAllJournals from "../../scripts/utils/get-all-journals";
import "./JournalEntriesPage.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import journalAnimation from "../../assets/animations/journal.json";
import Lottie from "lottie-react";
import JournalEntries from "../../components/JournalEntries/JournalEntries";

export default function JournalEntriesPage() {
  const [journals, setJournals] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchQuery = useCallback((filteredJournals) => {
    setFilteredJournals(filteredJournals);
  }, []);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await getAllJournals();
        setJournals(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  if (!journals) {
    return <p>Loading</p>;
  }

  const sortedJournals = [
    ...(filteredJournals.length > 0 ? filteredJournals : journals),
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // const openModal = (journalId) => {
  //   setSelectedJournal(journalId);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setSelectedJournal(null);
  //   setIsModalOpen(false);
  // };

  // const handleDelete = async (journalId) => {
  //   try {
  //     await deleteJournalById(journalId);
  //     const updatedJournals = await getAllJournals();
  //     setJournals(updatedJournals);
  //     closeModal();
  //     console.log(`Journal with ID ${journalId} deleted successfully`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const onDelete = () => {
  //   handleDelete(selectedJournal?.id);
  // };

  // const handleExpand = (journal) => {
  //   setExpanded((selectedJournal) =>
  //     selectedJournal === journal ? null : journal
  //   );
  // };

  // const sortedJournals = [...journals].sort(
  //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
  // );

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
        {!loading ? (
          <>
            <SearchBar
              journals={journals}
              searchData={searchData}
              setSearchData={setSearchData}
              handleSearch={handleSearchQuery}
            />
            {filteredJournals.length > 0 ? (
              <JournalEntries
                journals={journals}
                sortedJournals={sortedJournals}
                setJournals={setJournals}
                filteredJournals={filteredJournals}
              />
            ) : (
              <p className="journal-entries__no-posts">No matching posts</p>
            )}
          </>
        ) : (
          <p>Loading</p>
        )}
        {/* <div className="journal-entries__wrapper">
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
        </div> */}
      </div>
    </section>
  );
}
