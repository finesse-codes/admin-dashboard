<template>
    <div class="max-w-[1200px] mx-auto">
    <div class="flex flex-col md:flex-row gap-2" v-if="job">
        <div class="md:w-1/2 w-full " :class="editForm ? '' : 'hidden'">
          <p class="font-semibold bg-green-200 uppercase p-3 rounded-sm">edit job posting</p>

      <h1 class="mb-5 text-2xl"><span class="font-medium text-xl">{{ job.title }}</span></h1>
      <form @submit.prevent="updateJobDetails" class="w-full">
              <!-- Title -->
      <div>
        <label for="title" class="w-full font-bold">Job Title</label>
        <input
        class="w-full p-2 rounded-sm my-2"
          id="title"
          type="text"
          v-model="formData.title"
          placeholder="Enter job title"
        />
      </div>
      <!-- Category -->
       <div>
        <label for="category" class="w-full font-bold">Category</label>
        <select id="category" v-model="formData.category" class="w-full rounded-sm my-2">
            <option v-for="(category, index) in categories" :key="index"  class="w-full"
            :value="category">{{ category }}</option>
        </select>
       </div>
      <!-- Description -->
      <div>
        <label for="description" class="w-full font-bold">Job Description</label>
        <textarea
          id="description"
          class="w-full p-2 rounded-sm my-2 h-36"
          v-model="formData.description"
          placeholder="Enter job description"
        ></textarea>
      </div>
      <!-- Location -->
      <div class="my-2">
        <label for="location" class="font-bold mr-3">Location</label>
        <input
          id="location"
          type="text"
          class="rounded-sm p-2"
          v-model="formData.location"
          placeholder="Enter location"
        />
      </div>
      <!-- Closing Date -->
      <div class="my-2">
        <label for="closing-date" class="font-bold mr-2">Closing Date</label>
        <input
          id="closing-date"
          type="date"
          class="rounded-sm p-2"
          v-model="formData.closing_date"
        />
      </div>
        <!-- Skills Section -->
        <div class="w-full mt-20"> 
          <h3 class="font-semibold text-xl">Skills Required</h3>
          <ul>
            <li v-for="(skill, index) in formData.skills" :key="index" class="flex  justify-between items-center gap-2">
              <textarea
              class="w-full p-2 rounded-sm my-2"
                type="text"
                v-model="formData.skills[index]"
                placeholder="Enter skill"
                @keydown.enter.prevent="addSkillAfter(index)"
              />
              <Icon size="24" name="material-symbols:delete-outline-sharp" @click="removeSkill(index)" class="text-gray-600 hover:bg-white cursor-pointer" />
            </li>
          </ul>
          <Button @click="newSkill">Add Skill</Button>
        </div>
  
        <!-- Benefits Section -->
        <div class="mt-10">
          <h3 class="font-semibold text-xl">Benefits</h3>
          <ul>
            <li v-for="(benefit, index) in formData.benefits" :key="index" class="flex justify-between items-center gap-2">
                <textarea
              class="w-full p-2 rounded-sm my-2"
                type="text"
                v-model="formData.benefits[index]"
                placeholder="Enter benefit"
                @keydown.enter.prevent="addBenefitAfter(index)"
              />
              <Icon name="material-symbols:delete-outline-sharp" size="24" class="text-gray-600 hover:bg-white cursor-pointer" @click="removeBenefit(index)">Remove</Icon>
            </li>
          </ul>
          <Button @click="newBenefit">Add Benefit</Button>
        </div>
  
        <!-- Duties Section -->
        <div class="mt-10">
          <h3 class="font-semibold text-xl">Duties</h3>
          <ul>
            <li v-for="(duty, index) in formData.duties" :key="index" class="flex justify-between items-center gap-2">
            <textarea
              class="w-full p-2 rounded-sm my-2"
                type="text"
                v-model="formData.duties[index]"
                placeholder="Enter duties"
                @keydown.enter.prevent="addDutyAfter(index)"
              />
              <Icon name="material-symbols:delete-outline-sharp" size="24" class="text-gray-600 hover:bg-white cursor-pointer" @click="removeDuty(index)"/>
            </li>
          </ul>
          
        </div>
        <div class="w-full flex justify-between">
            <Button @click="newDuty">Add Duty</Button>
            <Button type="submit"  class="bg-green-500 mt-6 w-[200px]">Save</Button>
        </div>
        
      </form>
    </div>
    <div class="" :class="editForm ? 'md:w-1/2 w-full' : 'md:w-2/3 mx-auto'">
      <div class="w-full mx-2 bg-white rounded-sm">
        <div class="flex justify-between items-center p-3 bg-blue-200 rounded-t-sm">
          <p class="uppercase  font-semibold">preview</p>
          <div class="flex gap-3"> 
          <Icon v-if="editForm" name="ic:sharp-save" size="20" class="text-gray-600 cursor-pointer hover:text-gray-900 " @click="updateJobDetails"/>
          <Icon name="tabler:edit" size="20" class="text-gray-600 hover:text-gray-900 cursor-pointer hover:bg-white p-2" @click="editForm = true"/>
        </div>
          </div>
        <div class="w-full p-3">
          <h2 class="text-xl font-semibold">{{ formData.title }}</h2>
          <div class="flex justify-between mt-2">
          <p class="text-gray-600"><strong>Location: </strong>{{ formData.location }}</p>
          <p class="text-gray-600"><strong>Closes: </strong>{{ formData.closing_date }}</p>
          <p class="text-gray-600"><strong>Category: </strong>{{ formData.category }}</p>
          </div>
          <div>
            <h3 class="font-semibold mt-5">Description</h3>
            <p>{{ formData.description }}</p>
          </div>
          <div>
            <h3 class="font-semibold mt-5">Skills and Attributes</h3>
            <ul class="list-disc">
              <li class="text-gray-600" v-for="(skill, index) in formData.skills" :key="index">{{ skill }}</li>
            </ul>
        </div>
        <div>
            <h3 class="font-semibold mt-5">Job Role/Duties</h3>
            <ul class="list-disc">
              <li class="text-gray-600" v-for="(duty, index) in formData.duties" :key="index">{{ duty }}</li>
            </ul>
        </div>
        <div>
            <h3 class="font-semibold mt-5">Benefits</h3>
            <ul class="list-disc">
              <li class="text-gray-600" v-for="(benefit, index) in formData.benefits" :key="index">{{ benefit }}</li>
            </ul>
        </div>

        </div>

      </div>
</div>
</div>


</div>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Button } from '@/components/ui/button';
  const { findOne, update, find } = useStrapi();
  const route = useRoute();
  const job = ref(null);
  const categories = [
      "engineering",
      "design",
      "construction",
      "administration",
      "sales",
      "IT"
  ]
  const editForm = ref(false);
  // Form data
  const formData = ref({
    title: '',
    description: '',
    location: '',
    closing_date: '',
    category: '',
    skills: [],
    benefits: [],
    duties: [],
  });
  const newDuty = () => formData.value.duties.push('');
  const newBenefit = () => formData.value.benefits.push('');
  const newSkill = () => formData.value.skills.push('');
  
  // Add/remove operations for dynamic lists
  const addSkillAfter = (index) => formData.value.skills.splice(index + 1, 0, '');
  const removeSkill = (index) => formData.value.skills.splice(index, 1);
  
  const addBenefitAfter = (index) => formData.value.benefits.splice(index + 1, 0, '');
  const removeBenefit = (index) => formData.value.benefits.splice(index, 1);
  
  const addDutyAfter = (index) => formData.value.duties.splice(index + 1, 0, '');
  const removeDuty = (index) => formData.value.duties.splice(index, 1);
  
  // Fetch job details from Strapi
  const jobId = route.params.id; // Replace with dynamic ID if needed
  const fetchJobDetails = async () => {
    try {
      const response = await findOne(`job-postings/${jobId}`, );
      job.value = response.data;
  
      // Populate formData with fetched data
      const jobData = response.data;
      formData.value.title = jobData.title;
      formData.value.description = jobData.description;
      formData.value.location = jobData.location;
      formData.value.closing_date = jobData.closing_date;
      formData.value.category = jobData.category;
      formData.value.skills = strapiToList(response.data.skills);
      formData.value.benefits = strapiToList(response.data.benefits);
      formData.value.duties = strapiToList(response.data.duties);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  
  // Update job details in Strapi
  const updateJobDetails = async () => {
    try {
      const payload = {
        title: formData.value.title,
        description: formData.value.description,
        location: formData.value.location,
        closing_date: formData.value.closing_date,
        category: formData.value.category,
        skills: listToStrapi(formData.value.skills),
        benefits: listToStrapi(formData.value.benefits),
        duties: listToStrapi(formData.value.duties),
      };
  
      await update('job-postings', jobId, payload);

    } catch (error) {
      console.error('Error updating job details:', error);
    }
  };
  
  // Convert Strapi rich text list to a simple array
  const strapiToList = (richText) => {
    if (!richText || !Array.isArray(richText) || !richText[0]?.children) return [];
    return richText[0].children.map((item) => item.children[0].text);
  };
  
  // Convert array to Strapi rich text format
  const listToStrapi = (list) => {
    return [
      {
        type: 'list',
        format: 'unordered',
        children: list.map((text) => ({
          type: 'list-item',
          children: [{ type: 'text', text }],
        })),
      },
    ];
  };
  
  // Fetch data on mount
  onMounted(() => {
    fetchJobDetails();


  });
  </script>
  
  <style scoped>
  ul {
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  button {
    margin-left: 10px;
  }
  </style>
  