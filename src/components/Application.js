import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    //received the individual appointment
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    //place the individual appointment into
    //the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {
      interview
    })
    .then(() => {
      setState({
        ...state,
        appointments
      })
    });

  }

  //change the local state to cancel an interview
  function cancelInterview(id) {
    //let the individual appointment
    //have a null interview
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    //place the individual appointment into
    //the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // const days = spotsAvailDay(state, appointments);

    //return the updated appointment
    //back to api database
    //and update the local appointments object
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments
        // days
      });
    });
  
  }

  // use effect to axios request data from API
  // and receive response from API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then(all => {
      setState(prev => ({
        ...prev, 
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  //get interviewers for a day
  const interviewers = getInterviewersForDay(state, state.day);

  //Convert Object of objects into Array of objects and
  //Turn appointment array into appointment components array for each weekday
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        id={appointment.id}
        time={appointment.time}
        interview={interview} 
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
