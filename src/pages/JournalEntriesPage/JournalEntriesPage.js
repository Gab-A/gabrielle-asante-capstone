import { useState, useEffect } from "react";
import getAllJournals from "../../scripts/utils/get-all-journals";

export default function JournalEntriesPage() {
  const [journals, setJournals] = useState(null);

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
  return (
    <section>
      <div>
        <article>
          {journals.map((journal) => (
            <div key={journal.id}>
              <p>{journal.title}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
