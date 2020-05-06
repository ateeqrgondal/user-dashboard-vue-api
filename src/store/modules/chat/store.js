import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const chat = {
  namespaced: true,
  state: {
    userChat: [],
    chatHeads: [],
  },
  getters,
  mutations,
  actions
}
