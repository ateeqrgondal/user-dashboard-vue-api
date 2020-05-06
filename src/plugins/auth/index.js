import router from '../../router'
import axios from 'axios'

export default function (Vue) {
  Vue.auth = {
    setSession (authResult) {
      let expiresAt = JSON.stringify(
        authResult.expires_at * 1000 + new Date().getTime()
      )
      localStorage.setItem('token', authResult.access_token)
      localStorage.setItem('expires_at', expiresAt)
      axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    },
    handleAuthentication (route) {
      let params = route.query
      if (params && params.access_token && params.expires_at && params.doctor && params.slot) {
        this.setSession(params)
        router.push('/create_appointment?doctor='+params.doctor+'&slot='+params.slot)
      } else
        if (params && params.access_token && params.expires_at) {
        this.setSession(params)
        router.push('/')
      } else {
        location.href = process.env.VUE_APP_DOCTOR_CLINIC_LANDING_PAGE
      }
    },
    getToken () {
      let token = localStorage.getItem('token')
      let expiresAt = localStorage.getItem('expires_at')
      if (!token || !expiresAt) {
        return null
      }
      if (new Date().getTime() > JSON.parse(expiresAt)) {
        this.logout()
      } else {
        return token
      }
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('expires_at')
      location.href = process.env.VUE_APP_DOCTOR_CLINIC_LANDING_PAGE
    },
    isAuthenticated () {
      return !!this.getToken()
    }
  }
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: () => {
        return Vue.auth
      }
    }
  })
}
