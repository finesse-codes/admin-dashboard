import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  // Check if the user is logged in
  if (!userStore.user && to.path !== '/auth') {
    return navigateTo('/auth'); // Redirect to login page
  }
});