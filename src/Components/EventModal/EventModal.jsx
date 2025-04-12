import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../Redux/store/modalSlice';
import { createEvent, updateEvent } from '../../Redux/store/eventsSlice';
import { FaTimes, FaTag, FaCalendarAlt, FaPlus } from 'react-icons/fa';

const categories = ['exercise', 'eating', 'work', 'relax', 'family', 'social'];

export default function EventModal() {
  const dispatch = useDispatch();
  const { isOpen, event } = useSelector(state => state.modal);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setCategory(event.category || categories[0]);
      setStart(
        event.start
          ? new Date(event.start).toISOString().slice(0, 16)
          : ''
      );
      setEnd(
        event.end
          ? new Date(event.end).toISOString().slice(0, 16)
          : ''
      );
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
      end: new Date(end),
    };
    if (event && event._id) dispatch(updateEvent(payload));
    else dispatch(createEvent(payload));
    dispatch(closeModal());
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <FaPlus className="icon-plus" />
            {event && event._id ? 'Edit Event' : 'Create New Event'}
          </div>
          <button
            className="modal-close"
            onClick={() => dispatch(closeModal())}
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title */}
          <div className="form-group">
            <label>Title</label>
            <div className="input-group">
              <FaTag className="input-icon" />
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Event title"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <div className="input-group">
              <FaTag className="input-icon" />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Start */}
          <div className="form-group">
            <label>Start Time</label>
            <div className="input-group">
              <FaCalendarAlt className="input-icon" />
              <input
                type="datetime-local"
                value={start}
                onChange={e => setStart(e.target.value)}
                required
              />
            </div>
          </div>

          {/* End */}
          <div className="form-group">
            <label>End Time</label>
            <div className="input-group">
              <FaCalendarAlt className="input-icon" />
              <input
                type="datetime-local"
                value={end}
                onChange={e => setEnd(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Actions */}
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
    document.getElementById('modal-root') || document.body
  );
}
