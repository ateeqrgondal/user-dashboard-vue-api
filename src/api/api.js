import axiosHttp from 'axios'

export const axios = axiosHttp.create({
  baseURL: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_PREFIX + process.env.VUE_APP_API_VERSION + process.env.VUE_APP_PORTAL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

