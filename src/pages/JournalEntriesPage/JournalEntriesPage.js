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
              <p className="journal-entries__no-posts">No matching entries</p>
            )}
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </section>
  );
}
