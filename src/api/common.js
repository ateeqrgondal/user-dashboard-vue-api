import {axios} from './api'
import resposta from './resposta'

export default {
  getUser() {
    return axios.get('profile').then(response => {
      return resposta.prepareThen(response).data;
    })
  },

  getPatients() {
    return axios.get('patients').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
}
