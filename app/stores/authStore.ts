import { defineStore } from "pinia";

interface User {
  id: string;
  username: string;
  email: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const user = ref<User | null>(null);
  const token = useCookie<string | null>("auth_token");
  const isAuthenticated = computed<boolean>(() => {
    return token.value === "mock_12312xSADSCSniaospdasdxsaaawerwq9r0wq";
  });

  const logIn = async (username: string, password: string): Promise<void> => {
    try {
      const response = await $fetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: { username: username, password: password },
      });
      if (response.success) {
        token.value = response.token;
      }
    } catch (error: unknown) {
      const msg =
        (error as any)?.data?.message || "Login failed. Please try again.";
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
