import commonApi from '../../../api/common'

export default {
  getPatients: function ({ commit }) {
    commonApi.getPatients().then(user => {
      commit('setPatients', user)
    }).catch(errors => {
      console.log(errors)
    })
  },
}
