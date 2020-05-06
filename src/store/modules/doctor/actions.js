import doctorApi from '../../../api/doctor'

export default {
  get: function ({ commit }) {
    doctorApi.getDoctors().then(doctors => {
      commit('set', doctors)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getLocations: function ({ commit }) {
    doctorApi.getLocations().then(locations => {
      commit('setLocations', locations)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getDoctorsList: function ({ commit }) {
    doctorApi.getDoctors().then(list => {
      commit('setDoctorsList', list)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getInsurances: function ({ commit }) {
    doctorApi.getInsurances().then(insurances => {
      commit('setInsurances', insurances)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getSpecializations: function ({ commit }) {
    doctorApi.getSpecializations().then(specs => {
      commit('setSpecializations', specs)
    }).catch(errors => {
      console.log(errors)
    })
  },
  addTreatment: function ({ commit } , data) {
    return doctorApi.addTreatment(data).then(treatment => {
      return treatment
    }).catch(errors => {
      return errors
    })
  },
  addQualification: function ({ commit } , data) {
    return doctorApi.addQualification(data).then(qualification => {
      return qualification
    }).catch(errors => {
      return errors
    })
  },
  addPaymentOption: function ({ commit } , data) {
    return doctorApi.addPaymentOption(data).then(paymentOption => {
      return paymentOption
    }).catch(errors => {
      return errors
    })
  },
  addSchedule: function ({ commit } , data) {
    return doctorApi.addSchedule(data).then(schedule=> {
      return schedule
    }).catch(errors => {
      return errors
    })
  },
  uploadDp: function ({ commit } , data) {
    return doctorApi.uploadDp(data).then(dp => {
      return dp
    }).catch(errors => {
      return errors
    })
  },
  addExperience: function ({ commit } , data) {
    return doctorApi.addExperience(data).then(exp => {
      return exp
    }).catch(errors => {
      return errors
    })
  },
  addPersonalDetails: function ({ commit } , data) {
    return doctorApi.addPersonalDetails(data).then(per => {
      return per
    }).catch(errors => {
      return errors
    })
  },
  updateSlotStatus: function ({ commit } , data) {
    return doctorApi.updateSlotStatus(data).then(per => {
      return per
    }).catch(errors => {
      return errors
    })
  },
  getTreatments: function ({ commit }) {
    doctorApi.getTreatments().then(treatments => {
      commit('setTreatments', treatments)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getQualifications: function ({ commit }) {
    doctorApi.getQualifications().then(qualifications=> {
      commit('setQualifications', qualifications)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getPaymentOptions: function ({ commit }) {
    doctorApi.getPaymentOptions().then(paymentOptions=> {
      commit('setPaymentOptions', paymentOptions)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getExperiences: function ({ commit }) {
    doctorApi.getExperiences().then(exps=> {
      commit('setExperiences', exps)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getPersonalDetails: function ({ commit }) {
    doctorApi.getPersonalDetails().then(personalDetails=> {
      commit('setPersonalDetails', personalDetails)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getSchedule: function ({ commit }) {
    doctorApi.getSchedule().then(schedule=> {
      commit('setSchedule', schedule)
    }).catch(errors => {
      console.log(errors)
    })
  },
  deleteTreatment: function ({ commit } , data) {
    return doctorApi.removeTreatment(data).then(treatment => {
      return treatment
    }).catch(errors => {
      return errors
    })
  },
  deleteQualification: function ({ commit } , data) {
    return doctorApi.removeQualifiaction(data).then(treatment => {
      return treatment
    }).catch(errors => {
      return errors
    })
  },
  deleteExperience: function ({ commit } , data) {
    return doctorApi.removeExperience(data).then(exp => {
      return exp
    }).catch(errors => {
      return errors
    })
  },
  getReviews: function ({ commit }) {
    doctorApi.getReviews().then(reviews=> {
      commit('setReviews', reviews)
    }).catch(errors => {
      console.log(errors)
    })
  },
  
  
  /***
   * User Functions
   * */

  getUserDoctorsList: function ({ commit }) {
    doctorApi.getUserDoctorsList().then(list => {
      commit('setUserDoctorsList', list )
    }).catch(errors => {
      return errors
    })
  },
  getUserFavoriteDoctors: function ({ commit }) {
    doctorApi.getUserFavoriteDoctors().then(list => {
      commit('setUserFavoriteDoctors', list )
    }).catch(errors => {
      return errors
    })
  },
  getPublicProfile: function ({ commit }, id) {
    doctorApi.getPublicProfile(id).then(profile => {
      commit('setPublicProfile', profile )
    }).catch(errors => {
      return errors
    })
  },
  
  
}
