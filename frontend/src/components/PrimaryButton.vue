<script setup>
const props = defineProps({buttontext: String});
</script>

<template>
  <button class="primarybutton">{{ props.buttontext }}</button>
</template>

<style scoped>
.primarybutton {
  color: #ffffff; /* Weiße Schrift */
  background-color: #7030a0; /* Lila Hintergrund */
  border: 2px solid #7030a0; /* Lila Umrandung */
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease; /* Weicher Übergang */
  font-size: 22px;
}

.primarybutton:hover {
  background-color: #ffffff; /* Weißer Hintergrund */
  color: #7030a0; /* Lila Schrift */
  border: 2px solid #7030a0; /* Lila Umrandung */
}
</style>