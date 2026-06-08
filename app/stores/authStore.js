import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const token = useCookie("auth_token");
  const isAuthenticated = computed(() => !!token.value);

  const logIn = async (username, password) => {
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { username: username, password: password },
      });
      if (response.success) {
        token.value = response.token;
      } else {
        throw new Error("Something went wrong with the request");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    logIn,
  };
});
