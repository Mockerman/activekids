// src/components/EventCalendar/EventCalendar.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import API from '../../services/api';
import 'react-calendar/dist/Calendar.css';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await API.get('/event');
      setEvents(res.data);
    };

    fetchEvents();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>Veranstaltungskalender</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <h3>Events am {selectedDate.toDateString()}</h3>
      <ul>
        {events
          .filter((event) => new Date(event.date).toDateString() === selectedDate.toDateString())
          .map((event) => (
            <li key={event._id}>{event.title} - {event.location}</li>
          ))}
      </ul>
    </div>
  );
};

export default EventCalendar;
