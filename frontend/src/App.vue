<script setup xmlns="http://www.w3.org/1999/html">
import Header from './components/Header.vue';
import Footer from "@/components/Footer.vue";
// import '@/components/style.css'
</script>

<template>
  <div class=" app-container"><Header/>
<main class="content">
  <RouterView/></main>
  <Footer/>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
