<template>
  <div>
    <h1>Buchungsseite</h1>
    <p>Kurs-ID: {{ $route.params.id }}</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log("Buchungsseite für Kurs-ID:", $route.params.id);
});
</script>
