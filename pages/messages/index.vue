<template>
    <div>
      <PageHeader title="Messages" />
      <div class="grid max-w-[1400px] mx-auto gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div class="">
        <h2 class="text-xl font-bold mt-6 ml-4">Contact Form Messages</h2>
        <div class="space-y-4 bg-white p-6 m-2 rounded-md shadow-sm " @click="selectMessage(message.id)" v-for="message in paginatedMessages" :key="message.id"  >
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold">{{ message.name }}<span class="font-light ml-5">{{ message.email }}</span></p>
              <p class="text-sm text-gray-500">{{ message.subject }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">{{ message.timeAgo}}</p>
            </div>
          </div>
          <div>
            <p class="text-sm">{{ message.message }}</p>
        </div>
          <h2></h2>
        </div>
      </div>
      <div class="">
        <p if="selectedMessage" class="text-xl font-bold mt-6 ml-4">Selected Message</p>
        <div class="space-y-4 bg-white p-6 m-2 rounded-md shadow-sm h-[90%] " v-if="selectedMessage" >
          <div v-if="selectedMessageData">
            <div class="flex justify-between border-b mb-5">
                <div class="p-2 m-2 rounded flex items-center justify-start">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-white cursor-pointer bg-neutral transition-all ease-in hover:scale-[105%]" 
                  v-if="selectedMessageData.name">{{ selectedMessageData.name[0] }}</div>
                    <div class="p-2">
                        <p class="text-md text-black font-bold leading-1 m-0">{{selectedMessageData.name}}</p>
                        <p class=" text-sm -mt-1">{{ selectedMessageData.subject}}</p>
                        <p class=" text-sm -mt-1">Reply to: {{ selectedMessageData.email}}</p>
                    </div>
                  </div>
                

              
              <p>{{ selectedMessageData.formattedTimestamp }}</p>

            </div>

            <p> {{ selectedMessageData.message }}</p>
          </div>
      </div>
    </div>
    </div>
</div>
  </template>
  
  <script lang="ts" setup>
  const selectedMessage = ref<number | null>(null);
  const messagesPerPage = 10; // Number of messages per page
  const currentPage = ref(1); // Current page

  const messages = ref([
    {
      id: 1,
      name: 'John Doe',
      subject: 'Hello',
      email: 'john@example.com',
      message: 'Hello, I am interested in your services.',
      timestamp: "2024-10-15T11:42:00.000Z"
    },
    {
      id: 2,
      name: 'Robert Black',
      subject: 'Hi there',
      email: 'rblack@gmail.com',
      message: 'Just wanted to say hi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timestamp: "2024-11-03T06:21:00.000Z"
    },
    {
      id: 3,
      name: 'Indira Shaw',
      subject: 'Lorem ipsum',
      email: 'ishaw@email.com',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.',
      timestamp: "2024-12-09T14:09:00.000Z"
    },
    {
      id: 4,
      name: 'Sandra Dee',
      subject: 'Question about your services',
      email: 'sandradee@hotmail.com',
      message: 'I am wondering if blah blah blah.',
      timestamp: "2024-12-29T19:58:00.000Z"
    },
    {
      id: 5,
      name: 'John Doe',
      subject: 'Hello',
      email: 'john@example.com',
      message: 'Hello, I am interested in your services.',
      timestamp: "2024-10-15T11:42:00.000Z"
    },
    {
      id: 6,
      name: 'Robert Black',
      subject: 'Hi there',
      email: 'rblack@gmail.com',
      message: 'Just wanted to say hi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timestamp: "2024-11-03T06:21:00.000Z"
    },
    {
      id: 7,
      name: 'Indira Shaw',
      subject: 'Lorem ipsum',
      email: 'ishaw@email.com',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.',
      timestamp: "2024-12-09T14:09:00.000Z"
    },
    {
      id: 8,
      name: 'Sandra Dee',
      subject: 'Question about your services',
      email: 'sandradee@hotmail.com',
      message: 'I am wondering if blah blah blah.',
      timestamp: "2024-12-29T19:58:00.000Z"
    },
    {
      id: 9,
      name: 'John Doe',
      subject: 'Hello',
      email: 'john@example.com',
      message: 'Hello, I am interested in your services.',
      timestamp: "2024-10-15T11:42:00.000Z"
    },
    {
      id: 10,
      name: 'Robert Black',
      subject: 'Hi there',
      email: 'rblack@gmail.com',
      message: 'Just wanted to say hi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timestamp: "2024-11-03T06:21:00.000Z"
    },
    {
      id: 11,
      name: 'Indira Shaw',
      subject: 'Lorem ipsum',
      email: 'ishaw@email.com',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.',
      timestamp: "2024-12-09T14:09:00.000Z"
    },
    {
      id: 12,
      name: 'Sandra Dee',
      subject: 'Question about your services',
      email: 'sandradee@hotmail.com',
      message: 'I am wondering if blah blah blah.',
      timestamp: "2024-12-29T19:58:00.000Z"
    }
  ])
  const timeAgo = (timestamp: string | Date): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };


  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};
const formattedMessages = messages.value.map((message) => ({
  ...message,
  timeAgo: timeAgo(message.timestamp),
}));
  // Function to format the timestamp
  const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

// Sort messages by most recent timestamp
const sortedMessages = formattedMessages
  .slice() // Clone the array to avoid mutating the original
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  .map((message) => ({
    ...message,
    timeAgo: timeAgo(message.timestamp),
  }));

// Computed property to get the selected message
const selectedMessageData = computed(() => {
  const message = messages.value.find((msg) => msg.id === selectedMessage.value);
  return message
    ? {
        ...message,
        formattedTimestamp: formatTimestamp(message.timestamp),
      }
    : null;
});
// Function to update the selected message
const selectMessage = (id: number) => {
  selectedMessage.value = id;
};

// Paginated messages based on currentPage
const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * messagesPerPage;
  const end = start + messagesPerPage;
  return messages.value.slice(start, end);
});

// Total pages
const totalPages = computed(() => Math.ceil(messages.value.length / messagesPerPage));

// Navigate to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Navigate to the previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
  </script>
  
  <style>
  
  </style>