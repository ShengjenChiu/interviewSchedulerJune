//returns an array of appointments for one day
function getAppointmentsForDay(state, day) {
  const resultsArr = [];
  const daysObj = state.days;
  const appointmentsObj = state.appointments;

  for (let i = 0; i < daysObj.length; i++) {
    if (daysObj[i].name === day) {
      let daysAppo = daysObj[i].appointments;

      for (let j = 0; j < daysAppo.length; j++) {

        if (appointmentsObj[daysAppo[j]]) {
          resultsArr.push(appointmentsObj[daysAppo[j]]);
        }
      }
    }
  }
  return resultsArr;
}

module.exports = {
  getAppointmentsForDay
};