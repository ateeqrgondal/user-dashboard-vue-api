import patientApi from '../../../api/patient'
import doctorApi from "../../../api/doctor";

export default {
  getFamilyMembers: function ({ commit }) {
    patientApi.getFamilyMembers().then(user => {
      commit('setFamilyMembers', user)
    }).catch(errors => {
      console.log(errors)
    })
  },
  addFamilyMember: function ({ commit } , data) {
    return patientApi.addFamilyMember(data).then(family => {
      return family
    }).catch(errors => {
      return errors
    })
  },
  addPersonalDetails: function ({ commit } , data) {
    return patientApi.addPersonalDetails(data).then(per => {
      return per
    }).catch(errors => {
      return errors
    })
  },
  getPersonalDetails: function ({ commit }) {
    patientApi.getPersonalDetails().then(personalDetails=> {
      commit('setPersonalDetails', personalDetails)
    }).catch(errors => {
      console.log(errors)
    })
  },
  
}
