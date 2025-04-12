import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar-custom.css';

import { openModal } from '../../Redux/store/modalSlice';
import { updateEvent } from '../../Redux/store/eventsSlice';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
function CustomEvent({ event }) {
  return (
    <div className="rbc-event-content">
      {event.title
        ? event.title
        : new Date(event.start).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
    </div>
  );
}
function CalendarComponent() {
  const events = useSelector((state) => state.events.items);
  const dispatch = useDispatch();

  // Log out what we're rendering
  console.log('⏰ Events passed to calendar:', events);

  const handleSelectSlot = ({ start, end }) => {
    dispatch(openModal({ start, end }));
  };

  const handleEventDrop = ({ event, start, end }) => {
    dispatch(updateEvent({ ...event, start, end }));
  };


  // const handleExternalDrop = ({ start, end }, e) => {
  //   const task = JSON.parse(e.dataTransfer.getData('task'));
  //   dispatch(openModal({
  //     title: task.name,
  //     start: start.toISOString(),
  //     end: end.toISOString(),
  //     category: task.category,
  //     color: task.color
  //   }));
  // };

  return (
    <DnDCalendar
    selectable
    localizer={localizer}
    events={events}
    defaultView={Views.WEEK}
    views={{ day: true, week: true, month: true }}
    step={15}
    timeslots={1}
    onSelectSlot={handleSelectSlot}
    onEventDrop={handleEventDrop}
    onEventResize={handleEventDrop}
    components={{ event: CustomEvent }}   // ← use our custom renderer
    style={{ height: '100vh' }}
  />
  );
}

export default CalendarComponent;
