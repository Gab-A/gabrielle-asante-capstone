import "./MoodCalender.scss";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, Day } from "@mui/x-date-pickers/DateCalendar";
import getMoods from "../../scripts/utils/get-mood";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Lottie from "lottie-react";
import noAnimation from "../../assets/animations/no.json";

export default function Calender() {
  const [moods, setMoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const getAndSetMoods = async () => {
      try {
        const response = await getMoods();
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

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const formattedSelectedDate = selectedDate
    ? dayjs(selectedDate).startOf("day").format("YYYY-MM-DD")
    : "";

  const selectedDateMoods = moods.filter((mood) => {
    const formattedMoodDate = dayjs(mood.created_at)
      .startOf("day")
      .format("YYYY-MM-DD");
    return formattedMoodDate === formattedSelectedDate;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate || null}
        onChange={handleDateChange}
        className="tracker__calender"
      />
      <h4 className="tracker__text">
        Get on track to see your different moods. It is exciting to so see how
        much you have evolved.
      </h4>
      <p></p>

      {selectedDateMoods.length > 0 && (
        <div className="tracker__mood-wrapper">
          <h4 className="tracker__different-moods">
            Your different moods logged on {formattedSelectedDate}:
          </h4>
          <div className="tracker__mood-container">
            {selectedDateMoods.map((mood, index) => (
              <article key={mood.id} className="tracker__card">
                <p className="tracker__mood">{mood.mood}</p>
              </article>
            ))}
          </div>
        </div>
      )}
      {selectedDateMoods.length === 0 && (
        <div className="tracker__no-mood-wrapper">
          <p className="tracker__no-mood">
            No moods were logged on this day {formattedSelectedDate}.
          </p>
          <Lottie
            animationData={noAnimation}
            className="tracker__no-animation"
          />
        </div>
      )}
    </LocalizationProvider>
  );
}
