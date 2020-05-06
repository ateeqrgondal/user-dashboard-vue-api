import {axios} from './api'
import resposta from './resposta'

export default {
  getStats() {
    return axios.get('appointments-stats').then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getAppointment(id) {
    return axios.get('appointment/'+ id).then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getAppointmentPage(id) {
    return axios.get('appointment-page/'+ id).then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  getPending(page) {
    return axios.get('pending-appointments?page=' + page).then(response => {
      return resposta.prepareThenPaginate(response);
    })
  },
  sendMessage(data) {
    return axios.post('message', data).then(response => {
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
  acceptAppointment(id) {
    return axios.post('action-accept', {
      id: id,
    }).then(response => {
      return response.data
    }).catch(error => {
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  cancelAppointment(id, note) {
    return axios.post('action-cancel', {
      id: id,
			note: note.rejectNote,
			type: note.type
    }).then(response => {
      return response.data
    }).catch(error => {
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  completeAppointment(id, note) {
    return axios.post('action-complete', {
      id: id,
			note: note.note,
			type: note.type
    }).then(response => {
      return response.data
    }).catch(error => {
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  referAppointment(id, note) {
    return axios.post('action-refer', {
      id: id,
			note: note.referNote,
			type: note.type,
      doctorId: note.doctorId
    }).then(response => {
      return response.data
    }).catch(error => {
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  searchAppointments(data) {
    return axios.get('search-appointments',  {
      params: {
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
      }
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  getVerified(page) {
    return axios.get('verified-appointments?page=' + page).then(response => {
      return resposta.prepareThenPaginate(response);
    })
  },
  getCompleted(page) {
    return axios.get('completed-appointments?page=' + page).then(response => {
      return resposta.prepareThenPaginate(response);
    })
  },
  getRejected(page) {
    return axios.get('rejected-appointments?page=' + page).then(response => {
      return resposta.prepareThenPaginate(response);
    })
  },
  getCancelled(page) {
    return axios.get('cancelled-appointments?page=' + page).then(response => {
      return resposta.prepareThenPaginate(response);
    })
  },
  appointmentDefaultNote(note) {
    return axios.post('appointment-note', {
      note: note,
    }).then(response => {
      return response.data
    }).catch(error => {
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  appointmentDefaultLength(length) {
    return axios.post('appointment-length', {
      length: length,
    }).then(response => {
      return response.data
    }).catch(error => {
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  getAppointmentData (data) {
    return axios.post('appointment-data', {
      slot: data.slot,
      doctor: data.doctor
    }).then(response => {
      return resposta.prepareThen(response).data;
    })
  },
  createAppointment(data) {
    return axios.post('create-appointment', {
      slotId: data.slotId,
      doctorId: data.doctorId,
      date: data.date,
      reason: data.reason,
      familyMemberId: data.familyMemberId,
      clinicId: data.clinicId,
    }).then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
      return Promise.reject(resposta.prepareCatch(error))
    })
  },
  
}
