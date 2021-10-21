<template>
  <div>
    <a href="#"><img src="../assets/forbidden.webp" @click="goLogin"/></a>
  </div>
</template>

<script>
  import router from '../router'
  export default {
      methods: {
        goLogin: function() {
          router.push('/ui/login').catch(()=>{});
        }
      }
  }
</script>