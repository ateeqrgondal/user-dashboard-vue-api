export default function (Vue) {
  Vue.loader = {
    show () {
      $('.loader').show()
    },
    hide () {
      $('.loader').fadeOut('slow')
    }
  }
  Object.defineProperties(Vue.prototype, {
    $loader: {
      get: () => {
        return Vue.loader
      }
    }
  })
}
