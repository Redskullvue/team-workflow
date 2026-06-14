import { defineStore } from "pinia";
import type { User, LoginResponse, SignupResponse } from "../../types/auth";

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
        user.value = response.user;
      }
    } catch (error: unknown) {
      const msg =
        (error as any)?.data?.message || "Login failed. Please try again.";
      throw new Error(msg);
    }
  };

  const signup = async (
    username: string,
    password: string,
    email: string,
  ): Promise<void> => {
    try {
      const response = await $fetch<SignupResponse>("/api/auth/signup", {
        method: "POST",
        body: { username: username, password: password, email: email },
      });
      if (response.success) {
        token.value = response.token;
        user.value = response.user;
      }
    } catch (error: unknown) {
      const msg =
        (error as any)?.data?.message || "Signing up failed . Please try again";
      throw new Error(msg);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    logIn,
    signup,
  };
});
