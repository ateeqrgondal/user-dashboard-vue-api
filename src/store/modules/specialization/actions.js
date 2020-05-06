import specializationApi from '../../../api/specialization'

export default {
  getSpecializations: function ({ commit }) {
    specializationApi.getSpecializations().then(spec => {
      commit('setSpecializations', spec)
    }).catch(errors => {
      console.log(errors)
    })
  },
}
