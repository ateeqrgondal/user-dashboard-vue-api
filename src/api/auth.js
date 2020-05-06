import {axios} from './api'
import resposta from './resposta'
import httpaxios from 'axios'

export default {
  signUp (data) {
    let params = {
			firstName: data.firstName,
			lastName: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      isPracticeOwner: data.isPracticeOwner,
      isClinicManager: data.isClinicManager,
      isDoctor: data.isDoctor,
      isDoctorWorkingSomePractice: data.isDoctorWorkingSomePractice,
      noOfDoctors: data.noOfDoctors,
    }
    return axios.post('register', params).then(response => {
      return response.data
    }).catch(error => {
			return Promise.reject(resposta.prepareCatch(error))
    })
  },
		login (credentials) {
		let params = {
			client_id: process.env.VUE_APP_CLIENT_ID,
			client_secret: process.env.VUE_APP_CLIENT_SECRET,
			grant_type: 'password',
			username: credentials.email,
			password: credentials.password
		}
		return httpaxios.post(process.env.VUE_APP_API_URL + 'oauth/token', params).then(response => {
			let data = response.data
			let token = data.access_token
			let expiresAt = data.expires_in
			return Promise.resolve({token: token, expiresAt: expiresAt})
		}).catch(error => {
			return Promise.reject(resposta.prepareCatch(error))
		})
	},
	checkRole (accessToken) {
		axios.defaults.headers['Authorization'] = 'Bearer ' + accessToken
		return axios.post('type').then(response => {
			return Promise.resolve({code: 200, data: response.data.data})
		}).catch(error => {
			return Promise.reject(resposta.prepareCatch(error))
		})
	}
}
