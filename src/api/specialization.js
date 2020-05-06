import {axios} from './api'
import resposta from './resposta'

export default {
  getSpecializations() {
    return axios.get('specializations-list').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  linkSpecialization(id){
    return axios.post('link-specialization', {
      specializationId: id
    }).then(response => {
      // console.log(response)
      return resposta.prepareThen(response)
    })
  },
  unlinkSpecialization(id){
    return axios.post('remove-specialization', {
      specializationId: id
    }).then(response => {
      return resposta.prepareThen(response)
    })
  }
  
}
