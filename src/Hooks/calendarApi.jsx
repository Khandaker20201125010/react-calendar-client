import axios from "axios";

const calendarApi = axios.create({
    baseURL: 'http://localhost:5000' 
  });
  
  export default calendarApi;