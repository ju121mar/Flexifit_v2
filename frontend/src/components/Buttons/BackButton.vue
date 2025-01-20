<script setup>
const emits = defineEmits(["click"]);
</script>

<template>
  <button class="simplebackbutton" @click="$emit('click')">
    ← Zurück
  </button>
</template>

<style scoped>
.simplebackbutton {
  text-decoration: none;
  color: #6a2c91;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 20px;
  margin-left: 220px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  text-align: center;
  margin-right: 70px;
  padding: 10px 15px;
}

.simplebackbutton:hover {
  background-color: #4e216c;
  color: #ffffff;
}
</style>
