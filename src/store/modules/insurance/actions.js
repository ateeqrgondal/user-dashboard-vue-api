import insuranceApi from '../../../api/insurance'

export default {
  getInsurances: function ({ commit }) {
    insuranceApi.getInsurances().then(insurance => {
      commit('setInsurances', insurance)
    }).catch(errors => {
      console.log(errors)
    })
  },
}
