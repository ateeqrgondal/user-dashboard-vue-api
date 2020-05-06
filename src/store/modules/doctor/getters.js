import _ from 'lodash'
export default {
  get: state => {
    return state.doctors
  },
  getLocations: state => {
    return state.locations
  },
  getLinkedInsurances: state => {
    return state.linkedInsurances
  },
  getSpecializations: state => {
    return state.linkedSpecializations
  },
  getTreatments: state => {
    return state.treatments
  },
  getQualifications: state => {
    return state.qualifications
  },
  getPaymentOptions: state => {
    return state.paymentOptions
  },
  getExperiences: state => {
    return state.experiences
  },
  getPersonalDetails: state => {
    return state.personalDetails
  },
  getSchedule: state => {
    return state.schedule
  },
  getDoctorsList: state => {
    return state.doctorsList
  },
  getPublicProfile: state => {
    return state.publicProfile
  },
  getReviews: state => {
    return state.reviews
  },

/**
 * User functions
 * **/

  getUserDoctorsList: state => {
    return state.userDoctorsList
  },
  getUserFavoriteDoctors: state => {
    return state.userFavoriteDoctors
  },
}
