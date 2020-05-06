import {axios} from './api'
import resposta from './resposta'

export default {
  getDoctors () {
    return axios.get('doctors').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getLocations () {
    return axios.get('locations').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getInsurances() {
    return axios.get('insurances').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getSpecializations() {
    return axios.get('specializations').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  storeDoctor (data) {
    return axios.post('doctors', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      specialization: data.specialization,
      qualification: data.qualification,
    }).then(response => {
			return response.data
    }).catch(error => {
      console.log(error)
			return Promise.reject(resposta.prepareCatch(error))
		})
  },
  deleteDoctor(id){
    return axios.post('delete-doctor', {
      data: id
    }).then(response => {
			return response.data
		})
  },
  addTreatment(data) {
    return axios.post('add-treatment', {
      title: data.title,
      description: data.description,
      price: data.price,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  addQualification(data) {
    return axios.post('add-qualification', {
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      institute: data.institute,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  addPaymentOption(data) {
    return axios.post('payment-option', {
      name: data.name,
      description: data.description,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  addExperience(data) {
    return axios.post('add-experience', {
      hospitalName: data.hospitalName,
      startDate: data.startDate,
      endDate: data.endDate,
      city: data.city,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  addSchedule(data) {
    return axios.post('add-schedule', {
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  uploadDp(data) {
    return axios.post('profile-image', data).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
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
  getTreatments() {
    return axios.get('treatments').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getPersonalDetails() {
    return axios.get('profile-details').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getQualifications() {
    return axios.get('qualifications').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getPaymentOptions() {
    return axios.get('payment-options').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getExperiences() {
    return axios.get('experiences').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getSchedule() {
    return axios.get('schedule').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  removeTreatment(id) {
    return axios.post('remove-treatment', {
      id: id,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  removeQualifiaction(id) {
    return axios.post('remove-qualification', {
      id: id,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  removeExperience(id) {
    return axios.post('remove-experience', {
      id: id,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  updateSlotStatus(id) {
    return axios.post('update-slot', {
      id: id,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  paymentOption(id,action) {
    return axios.post('payment-option-action', {
      id: id,
      action: action
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  getPublicProfile(id) {
    return axios.get('doctor-profile/'+id).then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getReviews() {
    return axios.get('reviews').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  
  
  /**
   * User functions
   * ***/


  getUserDoctorsList () {
    return axios.get('user-doctors').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  favoriteUnfavoriteDoctor(id) {
    return axios.post('favorite', {
      id: id,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  getUserFavoriteDoctors() {
    return axios.get('favorite-doctors').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  searchDoctors (data) {
    return axios.get('search', {params: {  speciality: data.speciality, city: data.city, insurance: data.insurance}}).then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  
}
