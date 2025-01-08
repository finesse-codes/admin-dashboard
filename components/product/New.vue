

<template>
  <AlertDialog :open="open" >
    <AlertDialogTrigger >
        <Button @click="open=true">Add New Product</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Create a new product</AlertDialogTitle>
        <AlertDialogDescription>
          <Input placeholder="Product Name" />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="open=false">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="createNewProduct">Create</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>


<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
const { loading, open } = useHelpers();
const createNewProduct = async () => {
  try {
   loading.value = true;
   // all the business logic
  } catch (error) {
    
  } finally {
    loading.value = false;
    open.value = false;
  }
}
</script>