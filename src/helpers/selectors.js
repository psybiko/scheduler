
export function getAppointmentsForDay(state, day) {
    const results = [];
    const filteredDays = state.days.filter(dayObj => dayObj.name === day);
   if(filteredDays.length) {

     const filteredAppointments = filteredDays[0].appointments
     .map(id =>  results.push(state.appointments[id]))
   }
   return results;
}

export function getInterview(state, interview) {
  if (!interview) return null
  let { student } = interview
  const interviewObj = {
    student,
    interviewer: {
      ...state.interviewers[interview.interviewer]
    }
  }
  return interviewObj
}



export function getInterviewersByDay(state, day) {
  const results = [];
  const filteredDays = state.days.filter(dayObj => dayObj.name === day);

  if(filteredDays.length) {
    filteredDays[0].interviewers.forEach(id => results.push(state.interviewers[id]));
  }

  return results;
}
