import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import axios from "axios"
import Appointment from "./Appointment/index"

import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Petty Officer Juno",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 6,
    time: "5pm",
    interview: {
      student: "Admiral Fitzwallace",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {}
  })

  const setDay = day => setState(prev => ({...prev, day }));
  const setDays = days => setState(prev => ({...prev, days }));

  useEffect(() => {
    axios.get("./api/days")
      .then((res) => {
        setDays(res.data);
      })
  }, [])


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
        {appointments.map((app) => 
          <Appointment
            key={app.id}
            {...app}
          />)}
        <Appointment key="last" time="6pm" />
      </section>

      
    </main>

    

    
  );
}


