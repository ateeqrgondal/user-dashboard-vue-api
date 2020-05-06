export default {
  getStats: state => {
    return state.stats
  },
  getAppointment: state => {
    return state.appointment
  },
  getAppointmentPage: state => {
    return state.appointmentPage
  },
  getPending: state => {
    return state.pendingAppointments
  },
  getVerified: state => {
    return state.verifiedAppointments
  },
  getCompleted: state => {
    return state.completedAppointments
  },
  getRejected: state => {
    return state.rejectedAppointments
  },
  getCancelled: state => {
    return state.cancelledAppointments
  },
  getAppointmentData: state => {
    return state.appointmentData
  }
}

