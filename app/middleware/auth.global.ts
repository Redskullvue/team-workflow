export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const publicRoutes = ["/auth/login", "/auth/signup"];

  if (publicRoutes.includes(to.path)) return;

  if (!authStore.isAuthenticated) {
    return navigateTo("/auth/login");
  }
});
