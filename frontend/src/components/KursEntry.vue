<script setup>
import {useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  trainer: {
    type: String,
    required: true
  },
  uhrzeit: {
    type: String,
    required: true
  },
  wochentag: {
    type: String,
    required: true
  },
  dauer: {
    type: String,
    required: true
  },
  teilnehmer: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>

</template>

<style scoped>

</style>