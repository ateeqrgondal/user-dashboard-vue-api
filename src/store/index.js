import Vue from 'vue'
import Vuex from 'vuex'
import {doctor} from './modules/doctor/store'
import {user} from './modules/user/store'
import {common} from './modules/common/store'
import {patient} from './modules/patient/store'
import {insurance} from './modules/insurance/store'
import {location} from './modules/location/store'
import {specialization} from './modules/specialization/store'
import {appointment} from './modules/appointment/store'
import {chat} from './modules/chat/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    doctor, chat, user, common, patient, insurance, location, specialization, appointment
  },
})
