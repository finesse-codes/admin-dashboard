<template>
  <div class="max-w-[1200px] mx-auto">
    <div class="w-full">
      <p class="font-semibold bg-blue-200 uppercase p-3 rounded-sm mb-5">Create Job Posting</p>

      <form @submit.prevent="createJobPosting" class="w-full">
        <!-- Title -->
        <div class="my-3">
          <label for="title" class="w-full font-bold">Job Title</label>
          <Input
            id="title"
            v-model="formData.title"
            placeholder="Enter job title"
            required
          />
        </div>



        <!-- Description -->
        <div class="my-3 flex flex-col gap-3">
          <label for="description" class="w-full font-bold">Job Description</label>
          <textarea
            id="description" class="w-full p-2 text-sm"
            v-model="formData.description"
            placeholder="Enter job description"
            required
          />
        </div>

        <div class="flex gap-3">
                  <!-- Category -->
        <div class="my-3 flex-col gap-3">
          <label for="category" class="w-full font-bold">Category</label>
          <select v-model="formData.category" id="category" class="p-2 block rounded-md" required>
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <!-- Location -->
        <div class="my-3">
          <label for="location" class="w-full font-bold">Location</label>
          <Input
            id="location"
            v-model="formData.location"
            placeholder="Enter location"
            required
          />
        </div>

        <!-- Closing Date -->
        <div class="my-3">
          <label for="closing-date" class="w-full font-bold">Closing Date</label>
          <Input
            id="closing-date"
            v-model="formData.closing_date"
            type="date"
            required
          />
        </div>
        </div>


        <!-- Dynamic Sections -->
        <DynamicSection
          title="Skills Required"
          v-model:items="formData.skills"
          placeholder="skill"
        />
        <DynamicSection
          title="Benefits"
          v-model:items="formData.benefits"
          placeholder="benefit"
        />
        <DynamicSection
          title="Duties"
          v-model:items="formData.duties"
          placeholder="duty"
        />

        <div class="mt-5">
          <Button type="submit" class="bg-green-500">Create Job</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const router = useRouter();

const { create, update } = useStrapi();

const categories = [
  "engineering",
  "design",
  "construction",
  "administration",
  "sales",
  "IT",
];

const formData = ref({
  title: '',
  description: '',
  location: '',
  closing_date: '',
  category: '',
  skills: [''],
  benefits: [''],
  duties: [''],
});
const cleanFormData = () => {
  formData.value.skills = formData.value.skills.filter((item) => item.trim() !== '');
  formData.value.benefits = formData.value.benefits.filter((item) => item.trim() !== '');
  formData.value.duties = formData.value.duties.filter((item) => item.trim() !== '');
};
// Submit job posting
const createJobPosting = async () => {
  try {
    cleanFormData();

    // Validate form fields
    if (!formData.value.title || !formData.value.description || !formData.value.location || !formData.value.closing_date || !formData.value.category) {
      alert("Please fill out all the required fields.");
      return; // Prevent submission if any of the required fields are empty
    }

    // Validate dynamic lists (skills, benefits, and duties) to ensure they are non-empty
    if (formData.value.skills.length === 0 || formData.value.skills.some(item => item.trim() === '')) {
      alert("Please add at least one skill.");
      return;
    }

    if (formData.value.benefits.length === 0 || formData.value.benefits.some(item => item.trim() === '')) {
      alert("Please add at least one benefit.");
      return;
    }

    if (formData.value.duties.length === 0 || formData.value.duties.some(item => item.trim() === '')) {
      alert("Please add at least one duty.");
      return;
    }
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
    // Call your API here, e.g., await create('job-postings', payload);
    const response = await create('job-postings', payload);
    if(response?.data.id){
      router.push(`/jobs/${response.data.id}`);
    } else {
      throw new Error('Response does not contain an ID');
    }

  } catch (error) {
    console.error('Error creating job posting:', error);
  }
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
</script>

<style scoped>
ul {
  padding-left: 20px;
}
</style>
