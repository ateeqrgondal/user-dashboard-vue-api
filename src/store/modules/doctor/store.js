import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const doctor = {
  namespaced: true,
  state: {
    doctors: [],
    locations: [],
    linkedInsurances: [],
    linkedSpecializations: [],
    treatments: [],
    qualifications: [],
    experiences: [],
    personalDetails: [],
    schedule: [],
    doctorsList: [],
    paymentOptions: [],
    publicProfile: [],
    reviews: [],
    
    /**
    *
    * User States
    * */
    
    userDoctorsList: [],
    userFavoriteDoctors: []
  
  },
  getters,
  mutations,
  actions
}
