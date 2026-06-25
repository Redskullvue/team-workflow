<template>
  <div class="w-full h-full flex items-center justify-center p-5 lg:p-10">
    <AuthFormWrapper>
      <h2 class="font-bold text-lg text-white mb-5">Sign Up</h2>
      <form @submit.prevent="signup" class="w-full">
        <AppInput
          id="username"
          type="text"
          placeholder="Enter your username"
          v-model="username"
          label="Username"
          :required="true"
          :error="errors.username"
        />

        <AuthInput
          id="email"
          type="email"
          placeholder="Enter your Email"
          label="Email"
          v-model="email"
          :required="true"
          :error="errors.email"
        />

        <AuthInput
          id="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          v-model="password"
          :required="true"
          :error="errors.password"
        />

        <SubmitButton label="Sign Up" type="submit" :loading="isLoading" />
      </form>
      <small class="text-red-500" v-if="errors.generalLoginError">{{
        errors.generalLoginError
      }}</small>
      <p class="mt-4 text-white">
        Already have an account ?
        <NuxtLink class="text-blue-900" to="/auth/login">Login</NuxtLink>
      </p>
    </AuthFormWrapper>
  </div>
</template>

<script setup lang="ts">
interface Errors {
  username: string;
  password: string;
  email: string;
  generalLoginError: string;
}

definePageMeta({
  layout: "auth",
  middleware: "guest",
});
const authStore = useAuthStore();
const username = ref<string>("");
const password = ref<string>("");
const email = ref<string>("");
const isLoading = ref<boolean>(false);
const errors = ref<Errors>({
  username: "",
  password: "",
  email: "",
  generalLoginError: "",
});

const signup = async () => {
  // Reset Error values on each try
  errors.value.username = "";
  errors.value.password = "";
  errors.value.generalLoginError = "";
  let hasError = false;
  if (!username.value.trim()) {
    errors.value.username = "Username Is Required";
    hasError = true;
  }

  if (!password.value.trim()) {
    errors.value.password = "Password Is Required";
    hasError = true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    errors.value.email = "Email is required";
    hasError = true;
  } else if (!emailRegex.test(email.value)) {
    errors.value.email = "Please enter a valid email";
    hasError = true;
  }

  if (hasError) return;

  isLoading.value = true;

  try {
    await authStore.signup(username.value, password.value, email.value);
    await navigateTo("/dashboard/main");
  } catch (error: unknown) {
    errors.value.generalLoginError = (error as any)?.message;
  } finally {
    isLoading.value = false;
  }
};
</script>
