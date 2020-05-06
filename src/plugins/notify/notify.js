export default function (Vue) {
  Vue.notify = {
    notification (title, message, type = 'secondary', position = 'right') {
      $.notify({
                 icon: 'flaticon-alarm-1',
                 title: title,
                 message: message,
               },{
                 type: type,
                 placement: {
                   from: "bottom",
                   align: position
                 },
                 time: 1000,
               });
    }
  }
  Object.defineProperties(Vue.prototype, {
    $notify: {
      get: () => {
        return Vue.notify
      }
    }
  })
}
