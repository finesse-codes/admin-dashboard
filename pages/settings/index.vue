
    
    <template>
      <div v-if="user">
      <PageHeader title="Settings" />
    <div class="md:flex gap-5 items-center justify-center mt-10 ">

        <div class="md:w-1/2 w-full  flex flex-col gap-3">

        <div class="space-y-6 my-3 bg-white p-5 rounded-md ">
            <div class="flex gap-5  items-end justify-between ">
        
                <div class="flex flex-col gap-1 w-full">
                    <h2 class="font-bold text-xl text-left mb-3">Main Contact Info</h2>
                    <div class="bg-stone-100 rounded-sm p-4 flex justify-between w-full">
                        <div>                    
                            <p><span class="font-semibold my-2">Admin Email:</span> {{ email}}</p>
                    <p><span class="font-semibold my-2">Main Phone:</span> n/a</p>

                </div>
                <div class="flex gap-1">
                        <Icon name="tabler:edit" size="20" class="text-gray-600 "/>
                        <Icon name="material-symbols-light:delete" size="20" class="text-gray-600 "/>
                    </div>

                </div>

               
            </div>

        </div>
        <div class="flex justify-between pt-6">
            <h2 class="font-bold text-xl text-left">Addresses </h2>
            
        </div>


            <div class="flex gap-3 justify-between items-center bg-stone-100 rounded-sm p-3" v-if="addresses" v-for="(address, index) in addresses" :key="index">
                <div class="flex flex-col gap-1">
                    <p class="font-semibold">{{address.name}} </p>
                    <p>{{ address.street_address }}</p>
                    <p>{{ address.Suburb }}</p>
                    <p>{{address.State}}</p>
                    <p><span class="font-semibold">Phone: </span>{{address.Phone}}</p>
                </div>
                <div class="flex gap-1">
                    <Icon name="tabler:edit" size="20" class="text-gray-600 "/>
                    <Icon name="material-symbols-light:delete" size="20" class="text-gray-600 "/>
                </div>
            </div>
            <Button class=" w-[200px] mx-auto">Add another address</Button>

        </div>
        </div>
        <div class="xl:w-1/2 w-full space-y-6 my-3 bg-white p-5 rounded-md" @submit="onSubmit">
            <div class="space-y-6 my-3 bg-white p-5 rounded-md " >
            <h2 class="font-bold text-xl text-center">Your details</h2>
            <p><span class="font-semibold">Name:</span> {{ user.username }}</p>
            <p><span class="font-semibold">Email: </span>{{ user.email }}</p>


            <Button type="" class="mr-3">
            Edit
            </Button>
            <Button type="">
            Change Password
            </Button>
        </div>
            <h2 class="font-bold text-xl text-center">Current Users</h2>
            <DataTable :data="data"  :columns="columns" heading="Current Users"/>

            <Button type="submit">
            Add a new user
            </Button>
        </div>
        </div>
        <div class="md:flex gap-5 items-start justify-center mt-10 ">
        <form class="md:w-1/2 w-full space-y-6 my-3 bg-white p-5 rounded-md" @submit="onSubmit">
            <h2 class="font-bold text-xl text-center">Your details</h2>
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
        <form class="md:w-1/2 w-full space-y-6 my-3 bg-white p-5 rounded-md" @submit="onSubmit">
            <h2 class="font-bold text-xl text-center">Your details</h2>
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
</div>
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
import { columns } from './columns';

interface Address {
    id: number
    street_address: string
    street_address2: string | null
    Suburb: string
    postCode: number
    name: string
    phone: string | null
}
interface Home {
    id: number
    email: string
    Address: Address[]
}
const addresses = ref([])
const home: Ref<Home | null>= ref(null)
    const email = ref('')
const { findOne } = useStrapi()

onMounted  (async () => {
    try {
        const response = await findOne('home', {
            populate: {
                Address: '*'
            }
        })
        console.log('response', response.data.Address)
        email.value = response.data.email
        addresses.value = response.data.Address
   } catch (error) {
        console.error('error fetching HOme content', error)
    }

})

const data = ref<any>([
    {
        name: 'John Doe',
        email: 'john@udec.com',
        role: 'Admin'
    },
    {
        name: 'jane Doe',
        email: 'jane@udec.com',
        role: 'Admin'
    },
    {
        name: 'Dulcie Swift',
        email: 'swift@udec.com',
        role: 'superadmin'
    },
    {
        name: 'Sally Hansen',
        email: 'sally@udec.com',
        role: 'superadmin'
    }

]);

const userStore = useUserStore()
const user = userStore.user



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
        role: 'Admin',
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
