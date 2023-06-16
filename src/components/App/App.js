import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  format,
  set,
  isDate,
  parse,
  startOfWeek,
  endOfWeek,
  startOfToday,
  eachDayOfInterval,
  eachHourOfInterval,
} from "date-fns";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import CalendarBody from "../CalendarBody/CalendarBody";
import CalendarFooter from "../CalendarFooter/CalendarFooter";

const Wrapper = styled.div`
  max-width: 740px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 740px) {
    margin: 0 auto;
  }
`;

const App = () => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [toDelete, setToDelete] = useState("");
  const [currentWeek, setCurrentWeek] = useState(
    eachDayOfInterval({
      start: startOfWeek(today, { weekStartsOn: 1 }),
      end: endOfWeek(today, { weekStartsOn: 1 }),
    })
  );
  const startHour = set(selectedDate, { hours: 9 });
  const endHour = set(selectedDate, { hours: 22 });
  const hours = eachHourOfInterval({ start: startHour, end: endHour });

  const handleAddEvent = () => {
    let enteredDate = prompt("Enter event time:\nYYYY-MM-DD HH:mm:ss");
    const re = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (enteredDate !== null && enteredDate !== "") {
      const parsedDate = parse(enteredDate, "yyyy-MM-dd HH:mm:ss", new Date());
      if (isDate(parsedDate) && re.test(enteredDate)) {
        const eventDate = format(parsedDate, "yyyy-MM-dd HH:mm:ss");
        const eventId = format(new Date(eventDate), "yyyyMMddHHmmss");
        const event = {
          id: eventId,
          date: format(new Date(eventDate), "yyyy-MM-dd"),
          time: format(new Date(eventDate), "HH:mm"),
        };
        setEvents([...events, event]);
      } else {
        alert(
          "Invalid date format. Please enter the date in the format YYYY-MM-DD HH:mm:ss"
        );
      }
    }
  };

  const chooseToDelete = (eventId) => {
    if (eventId) {
      setToDelete(eventId);
    } else {
      setToDelete("");
    }
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((event) => event.id !== toDelete);
    setEvents(updatedEvents);
    setToDelete("");
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const toToday = () => {
    setSelectedDate(today);
    setCurrentWeek(
      eachDayOfInterval({
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 }),
      })
    );
    setCurrentDate(today);
    setToDelete("");
  };

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    } else {
      localStorage.removeItem("events");
    }
  }, [events]);

  return (
    <Wrapper>
      <CalendarHeader
        today={today}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setToDelete={setToDelete}
        onAddEvent={handleAddEvent}
      />

      <CalendarBody
        hours={hours}
        currentWeek={currentWeek}
        events={events}
        onDelete={chooseToDelete}
        toDelete={toDelete}
      />

      <CalendarFooter
        onToToday={toToday}
        toDelete={toDelete}
        onDeleteEvent={handleDeleteEvent}
      />
    </Wrapper>
  );
};

export default App;
