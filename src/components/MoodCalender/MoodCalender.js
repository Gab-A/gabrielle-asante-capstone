import "./MoodCalender.scss";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, Day } from "@mui/x-date-pickers/DateCalendar";
import getMoods from "../../scripts/utils/get-mood";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

export default function Calender() {
  const [moods, setMoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const getAndSetMoods = async () => {
      try {
        const response = await getMoods();
        // console.log(response);
        setMoods(response);
        if (response.length > 0) {
          setSelectedDate(response[0].date);
        }
      } catch (error) {
        console.error(`Error fetching moods`);
      }
    };
    getAndSetMoods();
  }, []);

  //   const handleDateChange = (event) => {
  //     const newDate = event.target.value;
  //     setSelectedDate(newDate);
  //   };

  //   // Ensure formattedSelectedDate is always defined
  //   const formattedSelectedDate = selectedDate
  //     ? dayjs(selectedDate).startOf("day").format("YYYY-MM-DD")
  //     : "";

  //   console.log("selectedDate", selectedDate);
  //   console.log("formattedSelectedDate", formattedSelectedDate);
  //   console.log("moods", moods);

  //   const selectedDateMoods = moods.filter((mood) => {
  //     const formattedMoodDate = dayjs(mood.created_at)
  //       .startOf("day")
  //       .format("YYYY-MM-DD");
  //     return formattedMoodDate === formattedSelectedDate;
  //   });

  //   console.log("selectedDateMoods", selectedDateMoods);

  //   return (
  //     <LocalizationProvider dateAdapter={AdapterDayjs}>
  //       <div>
  //         <label htmlFor="dateInput">Select Date: </label>
  //         <input
  //           type="date"
  //           id="dateInput"
  //           value={selectedDate || ""}
  //           onChange={handleDateChange}
  //         />
  //       </div>

  //       {selectedDateMoods.length > 0 && (
  //         <div>
  //           <p>Moods for {formattedSelectedDate}:</p>
  //           <ul>
  //             {selectedDateMoods.map((mood, index) => (
  //               <li key={index}>{mood.mood}</li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}
  //     </LocalizationProvider>
  //   );
  // }
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Ensure formattedSelectedDate is always defined
  const formattedSelectedDate = selectedDate
    ? dayjs(selectedDate).startOf("day").format("YYYY-MM-DD")
    : "";

  // console.log("selectedDate", selectedDate);
  // console.log("formattedSelectedDate", formattedSelectedDate);
  // console.log("moods", moods);

  const selectedDateMoods = moods.filter((mood) => {
    const formattedMoodDate = dayjs(mood.created_at)
      .startOf("day")
      .format("YYYY-MM-DD");
    return formattedMoodDate === formattedSelectedDate;
  });

  // console.log("selectedDateMoods", selectedDateMoods);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate || null}
        onChange={handleDateChange}
        className="tracker__calender"
      />

      {selectedDateMoods.length > 0 && (
        <div className="tracker__mood-wrapper">
          <h4 className="tracker__different-moods">
            Your different moods on the {formattedSelectedDate}:
          </h4>
          <div className="tracker__mood-container">
            {selectedDateMoods.map((mood, index) => (
              <article key={mood.id} className="tracker__card">
                {mood.mood}
              </article>
            ))}
          </div>
        </div>
      )}
    </LocalizationProvider>
  );
}
