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
import happyEmoji from "../../assets/icons/smile.svg";
import sadEmoji from "../../assets/icons/sad.svg";
import anxiousEmoji from "../../assets/icons/anxious.svg";
import tiredEmoji from "../../assets/icons/tired.svg";
import stressedEmoji from "../../assets/icons/stressed.svg";
import gratefulEmoji from "../../assets/icons/grateful.svg";
import unsureEmoji from "../../assets/icons/unsure.svg";
import calmEmoji from "../../assets/icons/calm.svg";
import angryEmoji from "../../assets/icons/angry.svg";

export default function Calender({ cardsArray }) {
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

  // console.log(moods.created_at);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const formattedSelectedDate = selectedDate
    ? dayjs(selectedDate).startOf("day").format("DD-MM-YYYY")
    : "";

  const selectedDateMoods = moods.filter((mood) => {
    const formattedMoodDate = dayjs(mood.created_at)
      .startOf("day")
      .format("DD-MM-YYYY");
    return formattedMoodDate === formattedSelectedDate;
  });

  // const moodEmoji = {
  //   Grateful: gratefulEmoji,
  //   Tired: tiredEmoji,
  //   Happy: happyEmoji,
  //   Sad: sadEmoji,
  //   Angry: angryEmoji,
  //   Calm: calmEmoji,
  //   Unsure: unsureEmoji,
  //   Anxious: anxiousEmoji,
  //   Stressed: stressedEmoji,
  // };

  // const getMoodEmoji = (mood) => {
  //   return moodEmoji[mood];
  // };

  const getMoodEmoji = (mood) => {
    const card = cardsArray.find((c) => c.title === mood);
    return card?.image || null;
  };

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
            Your different moods on{" "}
            <span className="tracker__mood-formatted-date">
              {formattedSelectedDate}:{" "}
            </span>
          </h4>
          <div className="tracker__mood-container">
            {selectedDateMoods.map((mood) => (
              <article key={mood.id} className="tracker__card">
                <div className="tracker__mood-details-wrapper">
                  <p className="tracker__mood">{mood.mood}</p>
                  <img
                    src={`${getMoodEmoji(mood.mood)}`}
                    alt={mood.mood}
                    className="tracker__mood-icon"
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
      {selectedDateMoods.length === 0 && (
        <div className="tracker__no-mood-wrapper">
          <p className="tracker__no-mood">
            No moods were logged on this day{" "}
            <span className="tracker__mood-formatted-date">
              {formattedSelectedDate}
            </span>
            .
          </p>
          <Lottie
            animationData={noAnimation}
            loop={false}
            className="tracker__no-animation"
          />
        </div>
      )}
    </LocalizationProvider>
  );
}
