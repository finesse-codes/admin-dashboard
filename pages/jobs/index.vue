<template>
    <div>
    <PageHeader title="Jobs" />
    <DataTable :data="data"  :columns="columns" heading="Current Jobs"/>
</div>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import { columns } from './columns';
const data = ref<any>([]);
const { find } = useStrapi()
const fetchJobs = async () => {
  try {
    const response = await find('job-postings', {
      populate: '*', // Include all relationships if needed
      sort: { closing_date: 'desc' }, // Optional: sort by closing_date
    });
    data.value = response.data; // Assign the jobs to your data ref
  } catch (error) {
    console.error('Error fetching jobs from Strapi:', error);
  }
};


onMounted(() => {
    fetchJobs(); // Fetch jobs on component mount
});
</script>

<style scoped>

</style>
    
