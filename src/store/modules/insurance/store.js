import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const insurance = {
  namespaced: true,
  state: {
    insurances: [],
  },
  getters,
  mutations,
  actions
}
