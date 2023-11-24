import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import getMoods from "../../scripts/utils/get-mood";
import { useState, useEffect } from "react";

export default function Calender() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const getAndSetMoods = async () => {
      try {
        const response = await getMoods();
        console.log(response);
      } catch (error) {
        console.error(`Error fetching moods`);
      }
    };
    getAndSetMoods();
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
  );
}
