import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const specialization = {
  namespaced: true,
  state: {
    specializations: [],
  },
  getters,
  mutations,
  actions
}
