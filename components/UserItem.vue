<template>
    <div class="p-2 m-2 border rounded flex items-center justify-start">
    <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold text-white cursor-pointer bg-neutral transition-all ease-in hover:scale-[105%]" v-if="props.name">{{ props.name[0] }}</div>
    <div class="p-2">
        <p class="text-sm text-black font-bold leading-1 m-0">{{props.name}}</p>
        <p class=" text-sm -mt-1">{{ props.role}}</p>
    </div>
</div>
</template>

<script setup lang="ts">
const props = defineProps({
    name: String,
    role: String
});


</script>

<style scoped>

</style>