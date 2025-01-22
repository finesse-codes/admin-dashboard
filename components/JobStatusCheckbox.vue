<template>
    <div>
      <input type="checkbox" v-model="isActive" @change="toggleActive" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref } from 'vue';
  
  const props = defineProps<{
    jobId: number;
    initialStatus: boolean;
  }>();
  
const emit = defineEmits(['update']);
const isActive = ref(props.initialStatus);
const toggleActive = () => {
    console.log( 'updating', props.jobId, isActive.value);
    emit('update')
}
  </script>
  