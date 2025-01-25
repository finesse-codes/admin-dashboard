<template>
  <div class="w-full mt-10">
    <h3 class="font-semibold text-xl">{{ title }}</h3>
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex justify-between items-center gap-2"
      >
        <textarea
          class="w-full p-2 rounded-sm my-2"
          :value="item"
          @input="updateItem(index, $event.target.value)"
          placeholder="Enter {{ placeholder }}"
        />
        
        <Icon
          size="24"
          name="material-symbols:delete-outline-sharp"
          @click.prevent="removeItem(index)"
        />
      </li>
    </ul>
    <Button @click.prevent="addItem" type="button">Add {{ placeholder }}</Button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  items: string[];
  placeholder: string;
}>();

const emit = defineEmits<{
  (event: 'update:items', value: string[]): void;
}>();

const updateItem = (index: number, value: string) => {
  const updatedItems = [...props.items];
  updatedItems[index] = value;
  emit('update:items', updatedItems);
};

const addItem = () => {
  emit('update:items', [...props.items, '']);
};

const removeItem = (index: number) => {
  const updatedItems = [...props.items];
  updatedItems.splice(index, 1);
  emit('update:items', updatedItems);
};
</script>
