export function getAppointmentsForDay(state, day) {

  const dayObject = state.days.find(e => e.name === day)

  let appArray;
  if (dayObject) {
    appArray = dayObject.appointments
  } else {
    return []
  }

  const resArray = [];
  appArray.forEach(app => {
    resArray.push(state.appointments[app]);
  })
  return resArray;

}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview["interviewer"]]
  }
}

export function getInterviewersForDay(state, day) {
  const dayObject = state.days.find(e => e.name === day)

  let intArray;
  if (dayObject) {
    intArray = dayObject.interviewers
  } else {
    return []
  }

  console.log(intArray)

  const resArray = [];
  intArray.forEach(app => {
    resArray.push(state.interviewers[app]);
  })
  console.log(resArray)
  return resArray;
}