import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const location = {
  namespaced: true,
  state: {
    locations: [],
  },
  getters,
  mutations,
  actions
}
