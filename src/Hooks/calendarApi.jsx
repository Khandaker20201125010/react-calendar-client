import axios from "axios";

const calendarApi = axios.create({
    baseURL: 'https://react-calender-server.vercel.app' 
  });
  
  export default calendarApi;