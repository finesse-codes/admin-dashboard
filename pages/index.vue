<template>
  <div class="grid gap-8 ">
    <header class="flex justify-between items-center p-4 bg-neutral-100">
      <div class="grow">      
        <p>Hi, Cheryl. Welcome back.</p>
        <h1>Dashboard</h1>
      </div>
      <div class="w-[120px] h-[36px] bg-neutral-200">

      </div>
    </header>
    <main class="grid gap-4">
      <div class="flex items-center gap-4" @click="setCategory" >

          <Tabs default-value="Today"  class="max-w-full w-full">
            <TabsList class="max-w-[400px]">
              <TabsTrigger v-for="item, index in list" :key="index" :value="item.title" >
                {{ item.title }}
              </TabsTrigger>
            </TabsList>
            <TabsContent v-for="item, index in list" :key="index" :value="item.title">
              <div class="border p-4 rounded-sm drop-shadow-sm">
                <highchart :options = "options"  />
              </div>
              

            </TabsContent>

          </Tabs>
      </div>
      <section>
        <div class="w-full h-[360px] bg-neutral-200">chart</div>
        
      </section>
    </main>
    <footer>
      <div class="flex items-center gap-4">
        <div v-for="(item, index) in 3" :key="index" class="w-full h-[200px] bg-neutral-200"></div> 
      </div>
      </footer>
  </div>
</template>

<script lang="ts" setup>
const loading = ref(false);

const list = [
  { title: 'Today' },
  { title: 'Week' },
  { title: 'Month' },
  { title: 'Year' }
];

let currentCategory = ref('today');
let data = ref([]);

const getDaysInMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  return Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => `${i + 1}`);
};

let categories = {
  today: Array.from({ length: 24 }, (_, i) => `${i}:00`),
  week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  month: getDaysInMonth(),
  year: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

function generateRandomData(number) {
  let values = [];
  for (let i = 0; i < number; i++) {
    values.push(Math.floor(Math.random() * 100));
  }
  console.log(values);
  data.value = values; // Update the reactive data
  return values;
}

const setCategory = (e) => {
  if (!e.target || !e.target.innerText) return;
  let v = e.target.innerText.toLowerCase();
  currentCategory.value = v;

  const getDaysInCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  switch (v) {
    case 'today':
      generateRandomData(24);
      break;
    case 'week':
      generateRandomData(7);
      break;
    case 'month':
      generateRandomData(getDaysInCurrentMonth());
      break;
    case 'year':
      generateRandomData(12);
      break;
    default:
      generateRandomData(24);
  }
};

const options = computed(() => ({
  chart: {
    type: 'spline',
    animation: { enabled: false }
  },
  title: { text: '' },
  legend: { enabled: false },
  xAxis: {
    gridLineColor: 'transparent',
    categories: categories[currentCategory.value],
    accessibility: { description: 'Time data' }
  },
  yAxis: {
    gridLineColor: 'transparent',
    title: { text: '' },
    labels: { format: '{value}' }
  },
  tooltip: {
    crosshairs: true,
    shared: true,
    formatter: function () {
      return this.y; // Only display the y-value
    }},
  plotOptions: {
    spline: {
      marker: { enabled: false, radius: 4, lineColor: '#666666', lineWidth: 1 },
      dataLabels: { enabled: false },
      enableMouseTracking: true
    }
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
          [1, 'rgba(29,217,83,1)']
        ]
      },
      data: data.value
    }
  ]
}));

onMounted(() => {
  generateRandomData(24);
});

</script>
