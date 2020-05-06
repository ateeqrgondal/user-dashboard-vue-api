import {axios} from './api'
import resposta from './resposta'

export default {
  getLocations() {
    return axios.get('locations-list').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  addPatient (data) {
    return axios.post('add-patient', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: data.age,
      status: data.status,
      gender: data.gender,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  linkLocation(id){
    return axios.post('link-location', {
      locationId: id
    }).then(response => {
      // console.log(response)
      return resposta.prepareThen(response)
    })
  },
  unlinkLocation(id){
    return axios.post('remove-location', {
      locationId: id
    }).then(response => {
      // console.log(response)
      return resposta.prepareThen(response)
    })
  }
  
}
