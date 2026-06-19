<template>
  <div class="w-full min-h-screen p-3">
    <div class="w-full p-4 flex items-center justify-between mb-10">
      <div class="w-full">
        <h1 class="font-bold text-lg mb-2">
          👋 Welcome , {{ authStore.user?.name || "User" }}
        </h1>
        <small class="text-gray-600"
          >You have
          <span class="text-black font-bold"
            >{{ taskStore.tasks.length }} Tasks Left</span
          >
          and
          <span class="text-black font-bold"
            >{{ taskStore.taskCounts.todo }} Tasks to do</span
          >
          today.
        </small>
      </div>
      <div class="lg:min-w-42.5 hidden lg:flex gap-x-3 items-center">
        <AppNewTaskButton />
        <button
          @click="() => refresh()"
          class="bg-blue-500 text-white rounded-xl w-15 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-blue-600"
        >
          <Icon name="ic:baseline-refresh" size="20px" />
        </button>
      </div>
    </div>

    <!-- Statistic Boxes -->
    <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardStatisticBox
        title="Total Tasks"
        :value="taskStore.tasks.length"
        icon="ic:baseline-check-circle-outline"
        icon-container-class="bg-blue-200 text-blue-600"
        :is-loading="pending"
      />
      <DashboardStatisticBox
        title="In Progress"
        :value="taskStore.taskCounts.inProgress"
        icon="ic:outline-access-alarms"
        icon-container-class="bg-orange-200 text-orange-600"
        :is-loading="pending"
      />
      <DashboardStatisticBox
        title="High Priority"
        :value="taskStore.taskPriorityCount.high"
        icon="ic:outline-notification-important"
        icon-container-class="bg-red-200 text-red-600"
        :is-loading="pending"
      />
      <DashboardStatisticBox
        title="Completed"
        :value="taskStore.taskCounts.done"
        icon="ic:baseline-done-all"
        icon-container-class="bg-green-200 text-green-600"
        :is-loading="pending"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const authStore = useAuthStore();
const taskStore = useTaskStore();

// The Data is not used for SEO purposes but for better performance useAsyncData is my best choice to retrive data on server
// and show the user (Free loading State and refresh button are perks)
const { pending, refresh } = await useAsyncData("tasks", () =>
  taskStore.getTasks(),
);
</script>
