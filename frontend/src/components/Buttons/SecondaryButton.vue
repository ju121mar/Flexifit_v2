<script setup>
const props = defineProps({buttontext: String});
</script>

<template>
  <button class="secondarybutton">{{ props.buttontext }}</button>
</template>

<style scoped>
.secondarybutton {
  color: #7030a0;
  background-color: #ffffff;
  border: 2px solid #7030a0;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 22px;
}

.secondarybutton:hover {
  background-color: #7030a0;
  color: #fff;
}
</style>