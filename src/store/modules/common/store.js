import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const common = {
  namespaced: true,
  state: {
    user: [],
    patients: []
  },
  getters,
  mutations,
  actions
}
