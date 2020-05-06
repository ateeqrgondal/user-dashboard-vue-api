<template>
  <div id="app" :class="{'is-loading' : user == '' }">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'app',
  methods: {
    getUser (){
      this.$store.dispatch('user/get')
    }
  },
  computed : {
    user () {
      return this.$store.getters[ 'user/get' ]
    }
  },
  mounted () {
    if (!this.$auth.isAuthenticated() && (window.location.pathname !== '/passport/callback')) {
      this.$auth.logout ()
    }
    this.getUser()
    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (this.$auth.isAuthenticated()) {
          next()
        } else {
          this.$auth.logout()
        }
      }
    })
  },
}
</script>
<style>

  .is-loading {
    pointer-events: none;
  }
</style>

