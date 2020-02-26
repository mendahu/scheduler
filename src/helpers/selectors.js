//Returns an array of appointments given a string name for a day
const getAppointmentsForDay = function(state, day) {

  const dayObject = state.days.find(e => e.name === day);

  let appArray;
  if (dayObject) {
    appArray = dayObject.appointments;
  } else {
    return [];
  }

  const resArray = [];
  appArray.forEach(app => {
    resArray.push(state.appointments[app]);
  });
  return resArray;

};

//Returns an interview object
const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview["interviewer"]]
  };
};

//Returns the list of interviewers who are working on a given day
const getInterviewersForDay = function(state, day) {
  const dayObject = state.days.find(e => e.name === day);

  let intArray;
  if (dayObject) {
    intArray = dayObject.interviewers;
  } else {
    return [];
  }
  const resArray = [];
  intArray.forEach(app => {
    resArray.push(state.interviewers[app]);
  });
  return resArray;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };