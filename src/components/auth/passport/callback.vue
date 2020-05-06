<script src="../../../main.js"> </script>
<template>
  <div>
    <h1>Say hello</h1>
  </div>
</template>

<script>
export default {
  name: 'passport-callback',
  mounted () {
    this.$auth.handleAuthentication(this.$route)
  }
}
</script>
