import chatApi from '../../../api/chat'

export default {
  get: function ({ commit }) {
    chatApi.getUser().then(user => {
      commit('set', user)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getUserChat: function ({ commit }, id) {
    chatApi.getUserChat(id).then(user => {
      commit('setUserChat', user)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getChatHead: function ({ commit }, id) {
    chatApi.getChatHead(id).then(user => {
      commit('setUserChat', user)
    }).catch(errors => {
      console.log(errors)
    })
  },
  getChatHeads: function ({ commit }) {
    chatApi.getChatHeads().then(user => {
      commit('setChatHeads', user)
    }).catch(errors => {
      console.log(errors)
    })
  },
}
