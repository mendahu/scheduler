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