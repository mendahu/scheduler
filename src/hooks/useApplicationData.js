import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_INTERVIEW, SET_APPLICATION_DATA } from "reducers/application";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: null
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    const daysProm = axios.get("/api/days");
    const appsProm = axios.get("/api/appointments");
    const intsProm = axios.get("/api/interviewers");

    Promise.all([daysProm, appsProm, intsProm])
      .then((appData) => {
        dispatch({ type: SET_APPLICATION_DATA, value: appData});
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getDayIndexbByAppId = function(id) {
    const days = [...state.days];

    for (const day of days) {
      if (day.appointments.find(element => element === id)) return day.id - 1;
    }
    return undefined;
  };

  const updateSpots = function(appId, appointments) {

    const dayNum = getDayIndexbByAppId(appId);
    if (dayNum === undefined) return {...state.days};

    const daysToCheck = state.days[dayNum].appointments;

    let newSpots = 0;
    daysToCheck.forEach((el, index) => {
      if (appointments[el].interview === null) newSpots++;
    });

    const day = {
      ...state.days[dayNum],
      spots: newSpots
    };

    return state.days.map((item, index) => (index !== dayNum) ? item : {...item, ...day});
  };

  const bookInterview = function(id, interview) {
      
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(id, appointments);

    return axios.put(`./api/appointments/${id}`, appointment)
      .then((res) => {
        dispatch({ type: SET_INTERVIEW, value: {appointments, days}});
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(id, appointments);

    return axios.delete(`./api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: {appointments, days}});
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}