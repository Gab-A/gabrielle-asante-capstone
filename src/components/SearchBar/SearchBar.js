import "./SearchBar.scss";
import { useEffect } from "react";

export default function SearchBar({
  journals,
  searchData,
  setSearchData,
  handleSearch,
}) {
  useEffect(() => {
    if (Array.isArray(journals) && journals.length > 0) {
      const filteredJournals = journals
        .filter(
          (journal) =>
            journal.title.toLowerCase().includes(searchData.toLowerCase()) ||
            journal.content.toLowerCase().includes(searchData.toLowerCase())
        )
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      handleSearch(filteredJournals);
      console.log("Filtered Journals", filteredJournals);
    } else {
      console.error("No journals available yet.");
    }
  }, [journals, searchData, handleSearch]);

  const handleSearchChange = (e) => {
    setSearchData((prevSearchData) => e.target.value);
  };

  return (
    <div className="journal-entries__search-wrapper">
      <input
        type="search"
        className="journal-entries__search"
        placeholder="Search"
        value={searchData}
        name="search"
        id="search"
        onChange={handleSearchChange}
      />
    </div>
  );
}
