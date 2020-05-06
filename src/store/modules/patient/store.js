import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const patient = {
  namespaced: true,
  state: {
    familyMembers: [],
    personalDetails: []
  },
  getters,
  mutations,
  actions
}
