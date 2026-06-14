<template>
  <div class="w-full flex items-center gap-x-2">
    <!-- Avatar -->
    <div>
      <div
        class="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center text-white text-sm"
      >
        <p>{{ initials }}</p>
      </div>
    </div>
    <div class="flex flex-col">
      <p class="font-bold text-sm" v-if="user">{{ user.name }}</p>
      <p class="text-gray-600 text-xs" v-if="user">{{ user.email }}</p>
    </div>
    <!-- Userinfo -->
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const initials = computed(() => {
  if (!authStore.user?.name) {
    return "";
  }
  return authStore.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});
</script>
