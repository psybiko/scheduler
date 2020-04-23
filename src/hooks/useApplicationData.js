import { useState, useEffect } from "react";
import axios from 'axios';


export default function useApplicationData(

) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
    const setDay = day => setState(state => ({ ...state, day }));

    const remainingSpots = (day, appointments) =>
    day.appointments.length -
    day.appointments.reduce(
      (spots, id) => (appointments[id].interview ? spots + 1 : spots),
      0
    );
  

    useEffect(()=>{
      Promise.all([
        axios.get('http://localhost:3000/api/days'),
        axios.get('http://localhost:3000/api/appointments'),
        axios.get('http://localhost:3000/api/interviewers')
      ])
      .then((all) =>{
        setState(prev => ({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
    }, [])
  
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = state.days.map((day) => {
        if (day.appointments[id]) {
          return { ...day, spots: remainingSpots(day, appointments) };
        }
        return day;
      });
    
      return axios.put(`http://localhost:3000/api/appointments/${id}`, {interview}) 
        .then(
         setState({...state, appointments, days})
        )
    };
  
    function cancelInterview (id) {
      const appointment = {
        ...state.appointments[id],
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = state.days.map((day) => {
        if (day.appointments[id]) {
          return { ...day, spots: remainingSpots(day, appointments) };
        }
        return day;
      });
      
  
      return axios.delete(`http://localhost:3000/api/appointments/${id}`)
      .then(
        setState({...state, appointments,days})
    )
  };

  return {state, setDay, bookInterview, cancelInterview}

}