import locationsApi from '../../../api/location'

export default {
  getLocations: function ({ commit }) {
    locationsApi.getLocations().then(locations => {
      commit('setLocations', locations)
    }).catch(errors => {
      console.log(errors)
    })
  },
}
