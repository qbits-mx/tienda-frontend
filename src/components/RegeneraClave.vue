<template>
  <div v-if="!isMobile()">
    <RegeneraClaveWeb />
  </div>
  <div v-else>
    <RegeneraClavePhone />
  </div>
</template>

<script>
  import RegeneraClaveWeb from './RegeneraClaveWeb';
  import RegeneraClavePhone from './RegeneraClavePhone';
  
  export default {
    methods: {
      isMobile() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      }
    },
    components: {
      RegeneraClaveWeb, RegeneraClavePhone
    }
  }
</script>