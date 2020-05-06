import userApi from '../../../api/user'

export default {
  get: function ({ commit }) {
    userApi.getUser().then(user => {
      commit('set', user)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getUser: function ({ commit }, id) {
    userApi.getUserById(id).then(user => {
      commit('setSpecificUser', user)
    }).catch(errors => {
      console.log(errors)
    })
  },
}
