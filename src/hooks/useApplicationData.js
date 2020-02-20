import { useReducer, useEffect } from "react"
import axios from "axios"

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = function(state, {type, value}) {
  switch (type) {
    case SET_DAY:
      return {...state, day: value}
    case SET_APPLICATION_DATA:
      return {
        ...state, 
        days: value[0].data, 
        appointments: value[1].data,
        interviewers: value[2].data
      }
    case SET_INTERVIEW:
      return {...state, appointments: value}
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${type}`);
  }
}

// useState({
//   day: "Monday", 
//   days: [], 
//   appointments: {},
//   interviewers: null
// })

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: null
  })

  const setDay = day => dispatch({ type: SET_DAY, day })

  useEffect(() => {
    const daysProm = axios.get("./api/days");
    const appsProm = axios.get("./api/appointments");
    const intsProm = axios.get("./api/interviewers");

    Promise.all([daysProm, appsProm, intsProm])
      .then((appData) => {
        dispatch({ type: SET_APPLICATION_DATA, value: appData})
      })
      .catch((err) => {
        console.log(err)
      });
  }, [])

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
      .then((res) => {
        console.log(appointments)
        dispatch({ type: SET_INTERVIEW, value: appointments})
      })
      .catch((err) => {
        console.error(err);
        throw err
      });
  }

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.delete(`./api/appointments/${id}`, appointment)
      .then(() => {
        console.log(appointments)
        dispatch({ type: SET_INTERVIEW, value: appointments})
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}