<template>
    <div>
        <header class="flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer w-full">
            <Logo/>
            <p class="font-bold">Dashboard</p>
        </header>
        <div class="px-4 grow">
            <div class="grid gap-2">
                <NuxtLink :to="item.page" v-for="(item, index) in items" :key="index" class="flex items-center gap-2 px-2 py-1 transition rounded cursor-pointer hover:bg-neutral-100">
                    <Icon :name="item.icon" size="20"/>
                    {{ item.title }}

                </NuxtLink>
                <Button @click="onLogout" class="w-full" > <Icon name="basil:logout-outline"/> Logout</Button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const router = useRouter();
const { logout } = useStrapiAuth()
const onLogout = () => {
    // log out of strapi
    logout()
    // log out of user store
    userStore.logout();
    router.push('/auth');
}
const items = ref([
    {
        title: "overview",
        icon: 'ri:dashboard-line',
        page: '/'
    },
    {
        title: 'transactions',
        icon: 'bx:bxs-credit-card',
        page: '/transactions'
    },
    {
        title: 'account',
        icon: 'mdi:account-circle-outline',
        page: '/account'

    },
    {
        title: 'messages',
        icon: 'ant-design:contacts-filled',
        page: '/messages'

    },
    {
        title: 'settings',
        icon:  'bx:bxs-cog',
        page: '/settings'
    },
    {
        title: 'jobs',
        icon:  'ix:work-case-filled',
        page: '/jobs'
    },

])


</script>

<style scoped>

</style>