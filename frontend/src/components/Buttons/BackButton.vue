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
  color: #7030a0;
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
  line-height: 1.5;
}

.simplebackbutton:hover {
  background-color: #7030a0;
  color: #ffffff;
}
</style>
