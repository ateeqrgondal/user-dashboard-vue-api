import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Auth from './plugins/auth/index'
import Notify from './plugins/notify/notify'
import Loader from './plugins/loader/loader'
import VeeValidate from 'vee-validate'
import _ from 'lodash'
import VueResource from 'vue-resource'
import InfiniteLoading from 'vue-infinite-loading'
import moment from 'vue-moment'
import * as VueGoogleMaps from 'vue2-google-maps'
import Geocoder from '@pderas/vue2-geocoder'
import StarRating from 'vue-star-rating'
import { ModelSelect } from 'vue-search-select'


Vue.config.productionTip = false
Vue.use(Auth)
Vue.use(Notify)
Vue.use(Loader)
Vue.use(VeeValidate)
Vue.use(_)
Vue.set(Vue.prototype, '_', _);
Vue.use(moment)
Vue.prototype.moment = moment

Window.vue = Vue
Vue.use(VueResource)
Vue.component(InfiniteLoading)
Vue.component('star-rating', StarRating);
Vue.component('ModelSelect', ModelSelect);

let GoogleMapsApiKey = 'AIzaSyAfusk8G3sDemUY0sPLX566QGYMEFbM64M'
Vue.use(Geocoder, {
  defaultCountryCode: null,
  defaultLanguage:    null,
  defaultMode:        'address', // or 'lat-lng'
  googleMapsApiKey:   GoogleMapsApiKey
});

Vue.use(VueGoogleMaps, {
  load: {
    key: GoogleMapsApiKey,
    libraries: 'places',
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
