import appointmentApi from '../../../api/appointment'
export default {
  getStats: function ({ commit }) {
    appointmentApi.getStats().then(stats => {
      commit('setStats', stats)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getAppointment: function ({ commit }, id) {
    appointmentApi.getAppointment(id).then(appointment => {
      commit('setAppointment', appointment)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getAppointmentPage: function ({ commit }, id) {
    appointmentApi.getAppointmentPage(id).then(appointment => {
      commit('setAppointmentPage', appointment)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getPending: function ({ commit }, page) {
    return appointmentApi.getPending(page).then(appointments => {
      commit('setPending', appointments.data, )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  getMorePending: function ({ commit }, page) {
    return appointmentApi.getPending(page).then(appointments => {
      commit('setMorePending', appointments.data, true )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  searchAppointments: function ({ commit }, data) {
  return appointmentApi.searchAppointments(data).then(appointments => {
    commit('setSearched', appointments.data)
    return appointments.lastPage
  }).catch(errors => {
    console.log(errors)
  })
  },
  getVerified: function ({ commit }, page) {
    return appointmentApi.getVerified(page).then(appointments => {
      commit('setVerified', appointments.data, )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  getMoreVerified: function ({ commit }, page) {
    return appointmentApi.getVerified(page).then(appointments => {
      commit('setMoreVerified', appointments.data, true )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  searchVerifiedAppointments: function ({ commit }, data) {
    return appointmentApi.searchAppointments(data).then(appointments => {
      commit('setVerifiedSearched', appointments.data)
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  getCompleted: function ({ commit }, page) {
    return appointmentApi.getCompleted(   page).then(appointments => {
      commit('setCompleted', appointments.data, )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  getMoreCompleted: function ({ commit }, page) {
    return appointmentApi.getCompleted(page).then(appointments => {
      commit('setMoreCompleted', appointments.data, true )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  searchCompletedAppointments: function ({ commit }, data) {
    return appointmentApi.searchAppointments(data).then(appointments => {
      commit('setCompletedSearched', appointments.data)
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  getRejected: function ({ commit }, page) {
    return appointmentApi.getRejected(page).then(appointments => {
      commit('setRejected', appointments.data, )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  getMoreRejected: function ({ commit }, page) {
    return appointmentApi.getRejected(page).then(appointments => {
      commit('setMoreRejected', appointments.data, true )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  searchRejectedAppointments: function ({ commit }, data) {
    return appointmentApi.searchAppointments(data).then(appointments => {
      commit('setRejectedSearched', appointments.data)
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  
  getCancelled: function ({ commit }, page) {
    return appointmentApi.getCancelled(page).then(appointments => {
      commit('setCancelled', appointments.data, )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  getMoreCancelled: function ({ commit }, page) {
    return appointmentApi.getCancelled(page).then(appointments => {
      commit('setMoreCancelled', appointments.data, true )
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  searchCancelledAppointments: function ({ commit }, data) {
    return appointmentApi.searchAppointments(data).then(appointments => {
      commit('setCancelledSearched', appointments.data)
      return appointments.lastPage
    }).catch(errors => {
      console.log(errors)
    })
  },
  getAppointmentData: function ({ commit }, data) {
    return appointmentApi.getAppointmentData(data).then(appointment => {
      commit('setAppointmentData', appointment)
    }).catch(errors => {
      console.log(errors)
    })
  }
  
  
}
