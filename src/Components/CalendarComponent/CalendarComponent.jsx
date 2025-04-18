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
      <div className="event-title">{event.title}</div>
      {event.category && (
        <div className={`event-category event-category--${event.category}`}>
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>
      )}
    </div>
  );
}

function CalendarComponent() {
  const events = useSelector((state) => state.events.items);
  const dispatch = useDispatch();

  const handleSelectSlot = ({ start, end }) => {
    dispatch(openModal({ start, end }));
  };

  const handleEventDrop = ({ event, start, end }) => {
    dispatch(updateEvent({ ...event, start, end }));
  };

  return (
    <DnDCalendar
      selectable
      localizer={localizer}
      events={events}
      defaultView={Views.WEEK}
      views={{ day: true, week: true, month: true }}
      step={15}
      timeslots={1}
      style={{ height: '100vh' }}
      components={{ event: CustomEvent }}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={(event) => dispatch(openModal(event))} // ✅ EDIT MODE
      onEventDrop={handleEventDrop}
      onEventResize={handleEventDrop}
      eventPropGetter={(event) => ({
        className: `rbc-event ${event.category || ''}`,
      })}
    />
  );
}

export default CalendarComponent;
