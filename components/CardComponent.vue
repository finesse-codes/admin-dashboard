<template>

  <Card class="bg-white">
    <CardHeader class="px-4 pt-4 pb-2">
      <div class="flex items-center justify-between">
        <p>{{ card.title }}</p>
        <Badge class="bg-green-400">{{  '+' + card.progression + '%' }}</Badge>
      </div>
    </CardHeader>
    <CardContent class="flex items-center justify-end px-4 pt-0 pb-2 border-b">
      <div class="text-[48px] front-[800]">
        <span class="text-neutral-300">{{ card.prefix }}</span>
        <span>{{ card.amount }}</span><span>{{ card.suffix }}</span>
      </div>
    </CardContent>
    <CardFooter class="flex items-center justify-between gap-2 px-2 py-2">
      <div class="w-10 h-10 bg-neutral-100 rounded-md flex justify-center items-center">
        <Icon :name="card.icon" class="text-[#4A5568]" size="20" />
      </div>
      <p class="text-xs grow">{{ card.description }}</p>
      <Button variant="outline">{{ card.label }}</Button>
      </CardFooter>
  </Card>

  </template>
  
  <script setup lang="ts">
  import { Badge } from '@/components/ui/badge';
  const props = defineProps({
    card: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  </style>
  