import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import axios from "axios"
import Appointment from "./Appointment/index"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors"

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: null
  })

  const setDay = day => setState(prev => ({...prev, day }));

  useEffect(() => {
    const daysProm = axios.get("./api/days");
    const appsProm = axios.get("./api/appointments");
    const intsProm = axios.get("./api/interviewers");

    Promise.all([daysProm, appsProm, intsProm])
      .then((all) => {
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      })
      .catch((err) => {
        console.log(err)
      });
  }, [])

  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

  const bookInterview = function(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    
    return axios.put(`./api/appointments/${id}`, appointment)
    .then(() => {
        setState({...state, appointments});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const schedule = appointments.map((app) => {
    const interview = getInterview(state, app.interview);
    console.log("some interview", interview, "some app", app)
    return (<Appointment
      key={app.id}
      id={app.id}
      time={app.time}
      interviewers={interviewers}
      interview={interview}
      bookInterview={bookInterview}
    />)
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
        {schedule}
        <Appointment key="last" time="6pm" />
      </section>

      
    </main>

    

    
  );
}


