import {axios} from './api'
import resposta from './resposta'

export default {
  getInsurances() {
    return axios.get('insurances-list').then(response => {
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
  linkInsurance(id){
    return axios.post('link-insurance', {
      insuranceId: id
    }).then(response => {
      // console.log(response)
      return resposta.prepareThen(response)
    })
  },
  unlinkInsurance(id){
    return axios.post('remove-insurance', {
      insuranceId: id
    }).then(response => {
      // console.log(response)
      return resposta.prepareThen(response)
    })
  }
  
}
