import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const token = useCookie("auth_token");
  const isAuthenticated = computed(() => {
    return token.value === "mock_12312xSADSCSniaospdasdxsaaawerwq9r0wq";
  });

  const logIn = async (username, password) => {
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { username: username, password: password },
      });
      if (response.success) {
        token.value = response.token;
      }
    } catch (error) {
      const msg = error?.data?.message || "Login failed. Please try again.";
      throw new Error(msg);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    logIn,
  };
});
