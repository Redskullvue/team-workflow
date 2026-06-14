export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      await authStore.logout();
    }
  }
});
