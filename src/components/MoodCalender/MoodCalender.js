import "./MoodCalender.scss";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import getMoods from "../../scripts/utils/get-mood";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Lottie from "lottie-react";
import noAnimation from "../../assets/animations/no.json";

export default function Calender({ cardsArray }) {
  const [selectedDateMoods, setSelectedDateMoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const getAndSetMoods = async () => {
      try {
        const response = await getMoods();
        setSelectedDateMoods(response);
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
    ? dayjs(selectedDate).startOf("day").format("DD-MM-YYYY")
    : "";

  const filterSelectedDateMoods = selectedDateMoods.filter((mood) => {
    const formattedMoodDate = dayjs(mood.created_at)
      .startOf("day")
      .format("DD-MM-YYYY");
    return formattedMoodDate === formattedSelectedDate;
  });

  const getMoodEmoji = (mood) => {
    const card = cardsArray.find((c) => c.title === mood);
    return card?.image || null;
  };

  return (
    <div className="tracker__mood-calender-wrapper">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate || null}
          onChange={handleDateChange}
          className="tracker__calender"
        />
        <div className="tracker__mood-details-wrapper">
          <h4 className="tracker__text">
            Get on track to see your different moods. It is exciting to so see
            how much you have evolved.
          </h4>
          {filterSelectedDateMoods.length > 0 && (
            <div className="tracker__mood-wrapper">
              <h4 className="tracker__different-moods">
                Your different moods on{" "}
                <span className="tracker__mood-formatted-date">
                  {formattedSelectedDate}:
                </span>
              </h4>
              <div className="tracker__mood-container">
                {filterSelectedDateMoods.map((mood) => (
                  <article key={mood.id} className="tracker__card">
                    <div className="tracker__mood-display-wrapper">
                      <p className="tracker__mood">{mood.mood}</p>
                      <img
                        src={`${getMoodEmoji(mood.mood)}`}
                        alt={mood.mood}
                        className="tracker__mood-emoji"
                      />
                      <p className="tracker__mood-time">
                        {mood.created_at.slice(11, 16)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
          {filterSelectedDateMoods.length === 0 && (
            <div className="tracker__no-mood-wrapper">
              <p className="tracker__no-mood">
                No moods were logged on this date
                <span className="tracker__mood-formatted-date">
                  {""}
                  {formattedSelectedDate}
                </span>
              </p>
              <Lottie
                animationData={noAnimation}
                loop={false}
                className="tracker__no-animation"
              />
            </div>
          )}
        </div>
      </LocalizationProvider>
    </div>
  );
}
