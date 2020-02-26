
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, {type, value}) {
  switch (type) {
  case SET_DAY:
    return {...state, day: value};
  case SET_APPLICATION_DATA:
    return {
      ...state,
      days: value[0].data,
      appointments: value[1].data,
      interviewers: value[2].data
    };
  case SET_INTERVIEW:
    return {...state, appointments: value.appointments, days: value.days};
  default:
    throw new Error(`Tried to reduce with unsupported action type: ${type}`);
  }
};