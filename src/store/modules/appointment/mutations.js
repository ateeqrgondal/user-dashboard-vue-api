export default {
  setStats(state, stats) {
    state.stats= stats
  },
  setAppointment(state, appointment) {
    state.appointment= appointment
  },
  setAppointmentPage(state, appointment) {
    state.appointmentPage = appointment
  },
  setPending(state, pending) {
      state.pendingAppointments = pending
  },
  setMorePending(state, pending) {
      let statePending = state.pendingAppointments
      state.pendingAppointments = statePending.concat(pending)
  },
  setSearched(state, pending) {
    state.pendingAppointments = pending
  },
  setVerified(state, pending) {
    state.verifiedAppointments= pending
  },
  setMoreVerified(state, pending) {
    let stateVerified = state.verifiedAppointments
    state.verifiedAppointments= stateVerified.concat(pending)
  },
  setVerifiedSearched(state, verified) {
    state.verifiedAppointments = verified
  },
  setCompleted(state, pending) {
    state.completedAppointments= pending
  },
  setMoreCompleted(state, pending) {
    let stateCompleted = state.completedAppointments
    state.completedAppointments= stateCompleted.concat(pending)
  },
  setCompletedSearched(state, completed) {
    state.completedAppointments = completed
  },
  setRejected(state, rejected) {
    state.rejectedAppointments= rejected
  },
  setMoreRejected(state, rejected) {
    let stateRejected = state.rejectedAppointments
    state.rejectedAppointments= stateRejected.concat(rejected)
  },
  setCancelledSearched(state, cancelled) {
    state.cancelledAppointments= cancelled
  },
  setCancelled(state, cancelled) {
    state.cancelledAppointments= cancelled
  },
  setMoreCancelled(state, cancelled) {
    let stateCancelled = state.cancelledAppointments
    state.cancelledAppointments= stateCancelled.concat(cancelled)
  },
  setAppointmentData(state, appointment) {
    state.appointmentData= appointment
  },
  
  
  
}
