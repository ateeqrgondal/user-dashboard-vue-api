import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const user = {
  namespaced: true,
  state: {
    user: [],
    specificUser: [],
  },
  getters,
  mutations,
  actions
}
