<script setup xmlns="http://www.w3.org/1999/html">

import StartPicture from "@/components/StartPicture.vue";
import HeaderComponent from "@/components/Header.vue";
import Kurse from "@/components/Kurse.vue";
import InfosStartseite from "@/components/InfosStartseite.vue";
import HIIT from "@/assets/pictures/HIIT.jpg";
import Pilates from "@/assets/pictures/Pilates.jpg";
import Yoga from "@/assets/pictures/Yoga.jpg";
</script>

<template>
  <StartPicture/>
  <section class="course-section">
  <h1>Anstehende Kurse</h1>
  </section>
  <Kurse/>
<InfosStartseite/>
<div class="images-container">
      <img :src="HIIT" alt="HIIT Training">
      <img :src="Pilates" alt="Pilates Kurs">
      <img :src="Yoga" alt="Yoga Kurs">
    </div>
</template>

<style scoped>
.images-container {
  display: none;
}

.course-section {
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
  margin: 20px 0;
}
.course-section h2 {
  color: #7030a0;
}

h1{
  color: #7030a0;
}
</style>