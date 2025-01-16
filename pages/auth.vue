<template>
    <h1 class="my-8 text-center">NuxtAdmin</h1>
    <div class="flex flex-col items-center justify-center h-[80vh]">

        <form class="xl:w-1/3 md:w-2/3 w-full space-y-6" @submit="onSubmit">
            <h2 class="font-bold text-xl text-center">Login</h2>
            <FormField v-slot="{ componentField }" name="email">
            <FormItem v-auto-animate>
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input type="email" placeholder="email" v-bind="componentField" />
                </FormControl>
                <FormDescription>
                This is your email address.
                </FormDescription>
                <FormMessage />
            </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
            <FormItem v-auto-animate>
                <FormLabel>Password</FormLabel>
                <FormControl>
                <Input type="password" placeholder="********" v-bind="componentField" />
                </FormControl>
                <FormDescription>
                This is your public display name.
                </FormDescription>
                <FormMessage />
            </FormItem>
            </FormField>
            <Button type="submit">
            Submit
            </Button>
        </form>
        </div>
  <Toaster />

</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
definePageMeta({
    layout: 'login'
})

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})
const validEmail = 'admin@example.com'
const validPassword = 'password'
const onSubmit = handleSubmit((values) => {
    if (values.email !== validEmail || values.password !== validPassword) {
        return toast({
            title: 'Login',
            description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, 'Invalid email or password')),
        })
    } else {
        userStore.setUser({
        email: values.email,
        role: 'superadmin',
        name: 'Sally Hansen'
    })
    toast({
        title: 'Login',
        description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, 'You have successfully logged in!')),
    })
    return navigateTo('/')
    
    }


})
</script>