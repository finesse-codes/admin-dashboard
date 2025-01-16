<template>
      <header class="flex justify-between items-center p-4 bg-neutral-200 mt-6 sm:mt-0">
        <div class="grow">      
        <p v-if="props.greeting">{{ props.greeting }}</p>
        <h1>{{props.title}}</h1>
      </div>
      <ProductNew />
    </header>
</template>

<script setup lang="ts">
const props = defineProps({
  greeting: {
    type: String, // The type of the prop
    required: false, // Not required, making it optional
    default: null // Optional default value (can be null, undefined, or any fallback)
  },
  title: {
    type: String, // Required by default if you don't set required: false
    required: true
  },
})

</script>

<style scoped>

</style>