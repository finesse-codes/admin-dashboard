<template>
    <div>
      <PageHeader title="Messages" />
      <div class="grid max-w-[1400px] mx-auto gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div class="h-[87vh] overflow-y-scroll">
        <h2 class="text-xl font-bold mt-6 ml-4">Contact Form Messages</h2>
        <div class="space-y-4 bg-white p-6 m-2 rounded-md shadow-sm hover:scale-[102%] transition-all duration-100 cursor-pointer " v-if="messages" @click="selectMessage(message.id)" v-for="message in messages" :key="message.id"  >
          <div class="flex items-center justify-between">
            <div class="">
              <p class="font-bold">{{ message.name }}<span class="font-light ml-5">{{ message.email }}</span></p>
              <p class="text-sm text-gray-500">{{ message.subject }}</p>
            </div>
            <div class="flex gap-4">
              <p class="text-sm text-gray-500">{{ timeAgo(message.createdAt)}}</p>
              <Icon class="text-gray-500 hover:text-black hover:scale-105 transition-all duration-100" @click="onDelete(message.id)" size="20" name="material-symbols:delete-outline-sharp" />
            </div>
          </div>
          <div>
            <p class="text-sm">{{ message.content  }}</p>
        </div>
          <h2></h2>
        </div>
      </div>
      <div class="h-[87vh] overflow-y-scroll">
        <p if="selectedMessage" class="text-xl font-bold mt-6 ml-4">View Message</p>
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
                

              
              <p>{{ formatTimestamp(selectedMessageData.createdAt)}}</p>
              <Icon name="material-symbols:delete-outline-sharp" @click="onDelete(selectedMessageData.id)" size="20" class="text-gray-500 hover:text-black hover:scale-105 transition-all duration-100 cursor-pointer" />

            </div>

            <p> {{ selectedMessageData.content}}</p>
          </div>
      </div>
    </div>
    </div>
</div>
  </template>
  
  <script lang="ts" setup>
  const selectedMessage = ref<number | null>(null);
  // Define the type of a message
interface Message {
  id: number;
  company: string;
  content: string;
  name: string;
  subject: string;
  email: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}
  const messagesPerPage = 10; // Number of messages per page
  const currentPage = ref(1); // Current page
  const messages = ref<Message[]>([])
  const { find, delete: _delete } = useStrapi()
  const response = await find('messages?sort[0]=createdAt:desc')
  messages.value = response.data
  
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
// Assume messages are already ordered by createdAt in descending order
const setLatestMessage = () => {
  if (messages.value.length > 0) {
    selectedMessage.value = messages.value[0].id; // Set to the first message's ID
  }
};

// Call the function to initialize the selected message
setLatestMessage();
// Computed property to get the selected message
const selectedMessageData = computed(() =>
  messages.value.find((msg) => msg.id === selectedMessage.value) || null
);

// Function to update the selected message
const selectMessage = (id: number) => {
  selectedMessage.value = id;
};

// delete message
const onDelete = async (id: number) => {
  await _delete('messages', id)
  messages.value = messages.value.filter((message: Message) => message.id !== id)
  setLatestMessage();
}
  </script>
  
  <style>
  
  </style>

