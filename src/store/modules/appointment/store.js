import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const appointment = {
  namespaced: true,
  state: {
    stats: [],
    pendingAppointments: [],
    verifiedAppointments: [],
    completedAppointments: [],
    rejectedAppointments: [],
    cancelledAppointments: [],
    appointment: [],
    appointmentPage: [],
    appointmentData: [],
  },
  getters,
  mutations,
  actions
}
