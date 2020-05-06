export default {
  set (state, doctors) {
    state.doctors = doctors
  },
  setLocations (state, locations) {
    state.locations = locations
  },
  setInsurances (state, insurances) {
    state.linkedInsurances = insurances
  },
  setSpecializations(state, specs) {
    state.linkedSpecializations= specs
  },
  setTreatments(state, treatments) {
    state.treatments= treatments
  },
  setQualifications(state, qualifications) {
    state.qualifications= qualifications
  },
  setPaymentOptions(state, paymentOptions) {
    state.paymentOptions = paymentOptions
  },
  setExperiences(state, exps) {
    state.experiences= exps
  },
  setPersonalDetails(state, details) {
    state.personalDetails= details
  },
  setSchedule(state, schedule) {
    state.schedule= schedule
  },
  setDoctorsList(state, doctorsList) {
    state.doctorsList = doctorsList
  },
  setPublicProfile(state, profile) {
    state.publicProfile = profile
  },
  setReviews(state, reviews) {
    state.reviews = reviews
  },

/**
* User functinons
*
* */
  
  setUserDoctorsList(state, list) {
    state.userDoctorsList = list
  },
  setUserFavoriteDoctors(state, list) {
    state.userFavoriteDoctors = list
  },
  
}
