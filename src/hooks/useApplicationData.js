import { useState, useEffect } from "react"
import axios from "axios"

export default function useApplicationData() {

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
        console.log("blah blah then")
        setState({...state, appointments});
      })
      .catch((err) => {
        console.log("blah blah catch")
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
        console.log("flar flar then")
        setState({...state, appointments});
      })
      .catch((err) => {
        console.log("flar flar catch")
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