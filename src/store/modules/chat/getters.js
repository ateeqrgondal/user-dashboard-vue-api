import _ from 'lodash'
export default {
  get: state => {
    return state.user
  },
  getUser: state => {
    return state.specificUser
  },
  getUserChat: state => {
    return state.userChat
  },
  getChatHeads: state => {
    return state.chatHeads
  },

}

