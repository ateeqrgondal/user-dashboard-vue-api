import {axios} from './api'
import resposta from './resposta'

export default {
  getUser() {
    return axios.get('profile').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getUserChat(id) {
    return axios.get('user-chat/'+id).then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getChatHead(id) {
    return axios.get('chat-head/'+id).then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getChatHeads() {
    return axios.get('chat-heads').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  sendMessage(data) {
    return axios.post('user-message', data).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  
}
