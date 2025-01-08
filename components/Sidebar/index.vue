<template>
    <div >
        <header class="flex lg:hidden justify-between fixed w-full p-4 ">

            <Logo />

            <Icon class="z-50 cursor-pointer  text-gray-950" size="30" name="iconamoon:menu-burger-horizontal"  @click="open=!open"/> 
</header>
            <div v-if="open" class="fixed top-0 left-0 z-50 w-full h-full bg-white">
                
                <Icon class="z-50 absolute cursor-pointer right-4 top-4" size="30" name="line-md:close" @click="open=false"/> 
                <SidebarMenu />
            </div>
            </div>
        
        <div class="hidden lg:flex w-[250px] flex-col sticky top-0 justify-between h-screen border-r">
            <SidebarMenu />
            <div>
                <UserItem />
            </div>
        </div>





</template>

<script setup lang="ts">
const open = ref(false);

</script>

<style scoped>

</style>