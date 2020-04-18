import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

  const setDay = day => setState(state => ({ ...state, day }));

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
        console.log(state.interviewers)
    })
  }, [])


  const appointments = getAppointmentsForDay(state, state.day).map(appointment => {
// something is wrong with my show component. might be the way i passed props

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview='kc'

      />
    );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {appointments}
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
