import {axios} from './api'
import {commonApi} from './common-api'
import resposta from './resposta'

export default {
  getUser() {
    commonApi.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return commonApi.get('profile').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getUserById(id) {
    return axios.get('user/'+id).then(response => {
      return resposta.prepareThen(response).data;
    })
  },
}
