import {axios} from './api'
import resposta from './resposta'

export default {
  addFamilyMember(data) {
    return axios.post('family', {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      relation: data.status,
      gender: data.gender,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  getFamilyMembers() {
    return axios.get('family').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  addPersonalDetails(data) {
    return axios.post('update-profile', {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      phone: data.phoneNo,
      address1: data.addressLine1,
      address2: data.addressLine2,
      about: data.about,
      postCode: data.postCode,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  getPersonalDetails() {
    return axios.get('profile-details').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  
  
  
}
