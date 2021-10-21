<template>
  <div align="center" class="my-5">
    <a href="#"><img src="../assets/not-found.jpg" @click="goLogin"/></a>
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