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

//build and return an interview object
function getInterview(state, interview) {
  const interviewersObj = state.interviewers;
  let interviewerId = 0;

  if (!interview) {
    return null;
  } else {
    interviewerId = interview.interviewer;
  }

  return {
    student: interview.student,
    interviewer: interviewersObj[interviewerId]
  };

}

//returns an array of Interviewers for that day
function getInterviewersForDay(state, day) {
  const resultsArr = [];
  const daysObj = state.days;
  const interviewersObj = state.interviewers;

  for (let i = 0; i < daysObj.length; i++) {
    if (daysObj[i].name === day) {
      let daysInterviewers = daysObj[i].interviewers;

      for (let j = 0; j < daysInterviewers.length; j++) {

        if (interviewersObj[daysInterviewers[j]]) {
          resultsArr.push(interviewersObj[daysInterviewers[j]]);
        }
      }
    }
  }

  return resultsArr;
}

module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
};