import "./Calender2.scss";
import { useState, useEffect } from "react";
import getMoods from "../../scripts/utils/get-mood";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calender2() {
  const [journalData, setJournalData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState("");

  //   const [startDate, setStartDate] = useState(new Date());
  //   return (
  //     <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  //   );

  useEffect(() => {
    const getAndSetMoods = async () => {
      try {
        const response = await getMoods();
        // console.log(response);
        setJournalData(response.data);
      } catch (error) {
        console.error(`Error fetching moods`);
      }
    };
    getAndSetMoods();
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (journalData) {
      console.log("Selected date...", date.toISOString);
      const entry = journalData.find(
        (entry) => entry.date === date.toISOString()
      );
      console.log("Fetching entry", entry);

      if (entry) {
        setSelectedMood(entry.mood);
      } else {
        setSelectedMood("");
      }
    }
  };

  return (
    <div>
      <div>
        <label>Date: </label>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
      </div>
      <div>
        <label>Mood: </label>
        <span>{selectedMood}</span>
      </div>
    </div>
  );
}
