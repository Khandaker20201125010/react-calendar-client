import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../Redux/store/modalSlice';
import { createEvent, updateEvent, deleteEvent } from '../../Redux/store/eventsSlice';
import { FaTimes, FaPlus, FaTag, FaCalendarAlt, FaTrash } from 'react-icons/fa';

const categories = ['exercise', 'eating', 'work', 'relax', 'family', 'social'];

function formatLocal(d) {
  if (!d) return '';
  const pad = n => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EventModal() {
  const dispatch = useDispatch();
  const { isOpen, event } = useSelector(s => s.modal);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setCategory(event.category || categories[0]);
      setStart(formatLocal(new Date(event.start)));
      setEnd(formatLocal(new Date(event.end)));
    }
  }, [event]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...event,
      title,
      category,
      start: new Date(start),
      end: new Date(end),
    };
    if (event && event._id) dispatch(updateEvent(payload));
    else dispatch(createEvent(payload));
    dispatch(closeModal());
  };

  const handleDelete = () => {
    if (event && event._id) {
      dispatch(deleteEvent(event._id));
      dispatch(closeModal());
    }
  };

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
              <FaTag className="input-icon" />
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <div className="input-group">
              <FaTag className="input-icon" />
              <select value={category} onChange={e => setCategory(e.target.value)} required>
                {categories.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <div className="input-group">
              <FaCalendarAlt className="input-icon" />
              <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>End Time</label>
            <div className="input-group">
              <FaCalendarAlt className="input-icon" />
              <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} required />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition" onClick={() => dispatch(closeModal())}>Cancel</button>
            {event && event._id && (
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                <FaTrash className="text-xl" />
                Delete
              </button>
            )}
            <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              {event && event._id ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}
