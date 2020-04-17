
export function getAppointmentsForDay(state, day) {
    const filteredDays = state.days.filter(dayObj => dayObj.name === day)
   if(filteredDays.length === 0 || filteredDays === undefined) return []
   const filteredAppointments = filteredDays[0].appointments.map(id =>  state.appointments[id])
   return filteredAppointments
}
