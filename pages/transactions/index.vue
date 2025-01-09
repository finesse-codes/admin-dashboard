<template>
    <div>
        <PageHeader title="Transactions" greeting="All your transactions" />
        <DataTable :data="data"  :columns="columns" heading="my table"/>
    </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import { columns } from './columns';
const data = ref<any>([]);
function generateRandomData(numObjects: any){
    const statuses = ['pending', 'processing', 'completed'];
    const emails = ['example@gmail.com', 'm@example.com', 'test@example.com', 'user@hotmail.com'];
    const randomData: any = [];

    for (let i=0; i < numObjects; i++){
        randomData.push({
            id: i,
            date: new Date().toISOString(),
            amount: Math.floor(Math.random() * 1000),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            email: emails[Math.floor(Math.random() * emails.length)]
        });
        
    }
    return data.value = randomData;
}
onMounted(() => {
    generateRandomData(10);
});
</script>

<style scoped>

</style>