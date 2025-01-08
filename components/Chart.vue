<template>
    <div>
      <highchart :options="chartOptions" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, computed } from "vue";
  
  // Accept props for dynamic configuration
  defineProps({
    data: Array, // Y-values for the series
    categories: Array, // X-axis categories
  });
  let data = ref([]);
    let categories = ref([]);
  const chartOptions = computed(() => ({
    chart: {
      type: 'spline',
      animation: { enabled: false },
    },
    title: { text: '' },
    legend: { enabled: false },
    xAxis: {
      gridLineColor: 'transparent',
      categories, // Use the prop directly
      accessibility: { description: 'Time data' },
    },
    yAxis: {
      gridLineColor: 'transparent',
      title: { text: '' },
      labels: { format: '{value}' },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      formatter: function () {
        return this.y; // Only display the y-value
      },
    },
    plotOptions: {
      spline: {
        marker: { enabled: false, radius: 4, lineColor: '#666666', lineWidth: 1 },
        dataLabels: { enabled: false },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        marker: { name: '', enabled: false },
        linewidth: '3px',
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, 'rgba(252, 176, 69, 1)'],
            [0.33, 'rgba(253,29,29,1)'],
            [0.63, 'rgba(131,58,180,1)'],
            [1, 'rgba(29,217,83,1)'],
          ],
        },
        data, // Use the prop directly
      },
    ],
  }));

  console.log('data: ', data.value, 'categories: ', categories.value);
  </script>
  