import axiosHttp from 'axios'

export const commonApi = axiosHttp.create({
  baseURL: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_PREFIX + process.env.VUE_APP_API_VERSION,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

