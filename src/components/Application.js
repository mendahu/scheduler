import React from "react";
import DayList from "./DayList";
import useApplicationData from "../hooks/useApplicationData";
import Appointment from "./Appointment/index";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
} from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map((app) => {
    const interview = getInterview(state, app.interview);

    return (<Appointment
      key={app.id}
      id={app.id}
      time={app.time}
      interviewers={interviewers}
      interview={interview}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />);
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
        {appointments}
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}