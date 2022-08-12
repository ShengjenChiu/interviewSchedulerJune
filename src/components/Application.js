import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  // use effect to axios request data from API
  // and receive response from API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")
    ])
    .then(all => {
      setState(prev => ({
        ...prev, 
        days: all[0].data,
        appointments: all[1].data
      }));
    });
  }, []);

  //Convert Object of objects into Array of objects and
  //Turn appointment array into appointment components array for each weekday
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsArr = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id} 
        {...appointment}
      />
    );  
  }); 

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
