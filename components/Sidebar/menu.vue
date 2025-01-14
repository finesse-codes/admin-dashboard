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
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
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
        title: 'contacts',
        icon: 'ant-design:contacts-filled',
        page: '/contacts'

    },
    {
        title: 'settings',
        icon:  'bx:bxs-cog',
        page: '/settings'
    },

])


</script>

<style scoped>

</style>