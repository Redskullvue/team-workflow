<template>
  <div class="w-full h-full overflow-hidden">
    <!-- Sidebar Headaer -->
    <h2 class="font-bold border-b-2 border-gray-200 p-5">
      TaskFlow <span class="text-blue-500 text-sm">Dashboard</span>
    </h2>

    <div class="w-full h-[50%]">
      <div class="flex justify-center gap-y-4 flex-col mt-5 p-5">
        <NuxtLink
          v-for="sideBarButton in sideBarButtons"
          :key="sideBarButton.link"
          :to="sideBarButton?.link"
          class="flex items-center gap-x-2 cursor-pointer rounded-xl transition-all duration-300 p-1"
          :class="
            route.path === sideBarButton.link
              ? 'text-blue-500 font-bold bg-blue-200 hover:bg-blue-300'
              : 'text-gray-500 hover:bg-gray-100'
          "
        >
          <span class="mt-2">
            <Icon :name="sideBarButton.icon" size="20px" />
          </span>
          {{ sideBarButton.title }}
        </NuxtLink>
      </div>
    </div>
    <div
      class="w-full h-[39%] max-h[39%] border-t-2 border-gray-200 p-5 flex flex-col gap-y-4 xl:flex xl:justify-end"
    >
      <NuxtLink
        to="/dashboard/notifications"
        class="flex items-center gap-x-2 cursor-pointer rounded-xl text-gray-500 hover:bg-gray-100 p-1 transition-colors duration-300"
      >
        <span class="mt-1">
          <Icon name="ic:outline-notifications" size="20px" />
        </span>
        Notifications
      </NuxtLink>

      <NuxtLink
        to="/dashboard/settings"
        class="flex items-center gap-x-2 cursor-pointer rounded-xl text-gray-500 hover:bg-gray-100 p-1 transition-colors duration-300 mb-2"
      >
        <span class="mt-1">
          <Icon name="ic:outline-settings" size="20px" />
        </span>
        Settings
      </NuxtLink>
      <UserProfile class="mb-2" />
      <AppNewTaskButton />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const sideBarButtons = [
  { title: "Dashboard", icon: "ic:outline-dashboard", link: "/dashboard/main" },
  { title: "My Tasks", icon: "ic:outline-checklist", link: "/dashboard/tasks" },
  {
    title: "Team",
    icon: "ic:baseline-supervisor-account",
    link: "/dashboard/team",
  },
  {
    title: "Analytics",
    icon: "ic:outline-analytics",
    link: "/dashboard/analytics",
  },
];
</script>
