<script setup xmlns="http://www.w3.org/1999/html">

import StartPicture from "@/components/StartPicture.vue";
import HeaderComponent from "@/components/Header.vue";
import Kurse from "@/components/Kurse.vue";
import InfosStartseite from "@/components/InfosStartseite.vue";
</script>

<template>
  <StartPicture/>
  <section class="course-section">
  <h2>Anstehende Kurse</h2>
  </section>
  <Kurse/>
<InfosStartseite/>
</template>

<style scoped>
.course-section {
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
  margin: 20px 0;
}
.course-section h2 {
  color: #7030a0;
  margin-bottom: 20px;
}
</style>