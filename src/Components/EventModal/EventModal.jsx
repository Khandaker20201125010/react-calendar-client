import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../Redux/store/modalSlice';
import { createEvent, updateEvent } from '../../Redux/store/eventsSlice';
import { FaTimes, FaPlus, FaTag, FaCalendarAlt } from 'react-icons/fa';


const categories = ['exercise','eating','work','relax','family','social'];

function formatLocal(d) {
  if (!d) return '';
  const pad = n => n.toString().padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EventModal() {
  const dispatch = useDispatch();
  const { isOpen, event } = useSelector(s => s.modal);

  const [title, setTitle]       = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [start, setStart]       = useState('');
  const [end, setEnd]           = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setCategory(event.category || categories[0]);
      setStart(formatLocal(new Date(event.start)));
      setEnd(formatLocal(new Date(event.end)));
    }
  }, [event]);

  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...event,
      title,
      category,
      start: new Date(start),
      end:   new Date(end),
    };
    if (event && event._id) dispatch(updateEvent(payload));
    else dispatch(createEvent(payload));
    dispatch(closeModal());
  };

  const portalTarget = document.getElementById('modal-root') || document.body;

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">
            <FaPlus className="icon-plus" />
            {event && event._id ? 'Edit Event' : 'Create New Event'}
          </div>
          <button className="modal-close" onClick={() => dispatch(closeModal())}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Title</label>
            <div className="input-group">
              <FaTag className="input-icon"/>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Event title"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <div className="input-group">
              <FaTag className="input-icon"/>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <div className="input-group">
              <FaCalendarAlt className="input-icon"/>
              <input
                type="datetime-local"
                value={start}
                onChange={e => setStart(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>End Time</label>
            <div className="input-group">
              <FaCalendarAlt className="input-icon"/>
              <input
                type="datetime-local"
                value={end}
                onChange={e => setEnd(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-create">
              {event && event._id ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    portalTarget
  );
}
