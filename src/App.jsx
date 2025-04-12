import { useDispatch } from 'react-redux';
import './App.css'
import CalendarComponent from './Components/CalendarComponent/CalendarComponent'
import EventModal from './Components/EventModal/EventModal'
import { useEffect } from 'react';
import { fetchEvents } from './Redux/store/eventsSlice';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents()); // ✅ Load events when app starts
  }, [dispatch]);


  return (
    <>
      <EventModal />
      <CalendarComponent />
    </>
  )
}

export default App
