<template>
  <div class="w-full h-full flex items-center justify-center p-5 lg:p-10">
    <AuthFormWrapper>
      <h2 class="font-bold text-lg text-white mb-5">Log In</h2>
      <form class="w-full" @submit.prevent="login">
        <AppInput
          v-model="username"
          label="Username"
          type="text"
          id="username"
          :required="true"
          :error="errors.username"
          placeholder="Enter your username"
        />
        <AppInput
          v-model="password"
          label="Password"
          type="password"
          id="password"
          :required="true"
          :error="errors.password"
          placeholder="Enter your password"
        />
        <SubmitButton label="Log In" type="submit" :loading="isLoading" />
      </form>
      <small class="text-red-500" v-if="errors.generalLoginError">{{
        errors.generalLoginError
      }}</small>
      <p class="mt-4 text-white">
        Don't have an account ?
        <NuxtLink class="text-blue-900" to="/auth/signup">Sign up</NuxtLink>
      </p>
    </AuthFormWrapper>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "guest",
});
interface Errors {
  username: string;
  password: string;
  generalLoginError: string;
}

const authStore = useAuthStore();
const username = ref<string>("");
const password = ref<string>("");
const isLoading = ref<boolean>(false);
const errors = ref<Errors>({
  username: "",
  password: "",
  generalLoginError: "",
});

const login = async (): Promise<void> => {
  // Reset Error values on each try
  errors.value.username = "";
  errors.value.password = "";
  errors.value.generalLoginError = "";
  // Check and validate the presence of any input in the inputs
  let hasError = false;
  if (!username.value.trim()) {
    errors.value.username = "Username is required";
    hasError = true;
  }
  if (!password.value.trim()) {
    errors.value.password = "Password is Required";
    hasError = true;
  }

  if (hasError) return;
  // Send request to server
  // Call isLoading on the request
  isLoading.value = true;

  try {
    await authStore.logIn(username.value, password.value);
    await navigateTo("/dashboard/main");
  } catch (error: unknown) {
    errors.value.generalLoginError = (error as any)?.message;
  } finally {
    isLoading.value = false;
  }
};
</script>
