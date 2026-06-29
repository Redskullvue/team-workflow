<template>
  <div class="w-full min-h-screen p-3 overflow-y-scroll">
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

    <!-- Progress & Recent tasks section -->
    <div class="w-full grid grid-cols-5 gap-8 my-10">
      <div
        class="col-span-5 lg:col-span-3 bg-white rounded-xl border border-gray-200 p-3 h-full flex flex-col items-center gap-y-4"
      >
        <div class="w-full p-4 flex items-center justify-between">
          <h2 class="font-bold">Recent Tasks</h2>
          <NuxtLink
            to="/dashboard/tasks"
            class="text-blue-500 font-bold text-sm cursor-pointer"
            >View All</NuxtLink
          >
        </div>
        <template v-if="taskStore.recentTasks.length > 0">
          <TaskCard
            v-for="task in taskStore.recentTasks"
            :key="task.id"
            :task="task"
          />
        </template>
        <h2 class="text-gray-600 font-semibold" v-else>
          Congragulations You Have No Tasks To Do !
          <NuxtLink to="/dashboard/create" class="text-blue-400"
            >Create one</NuxtLink
          >
        </h2>
      </div>
      <div
        class="col-span-5 lg:col-span-2 flex items-center justify-center flex-col h-full gap-y-3"
      >
        <div
          class="lg:w-10/12 w-full bg-white rounded-xl p-4 h-1/2 border border-gray-200 min-h-60"
        >
          <h2 class="font-bold my-3">Task Progress</h2>
          <DashboardProgressBar
            label="To Do"
            :percentage="taskStore.tasksPercentages.todo"
            color-class="bg-blue-300"
          />
          <DashboardProgressBar
            label="In Progress"
            :percentage="taskStore.tasksPercentages.inProgress"
            color-class="bg-orange-300"
          />
          <DashboardProgressBar
            label="Completed"
            :percentage="taskStore.tasksPercentages.done"
            color-class="bg-green-300"
          />
        </div>
        <div
          class="lg:w-10/12 w-full bg-white rounded-xl px-4 py-3 min-h-75 border border-gray-200 flex flex-col gap-3"
        >
          <h2 class="font-bold my-3">Team members</h2>
          <template v-if="!teamPending">
            <TeamMemberCard
              v-for="member in teamStore.teamMembers"
              class="my-1"
              :key="member.id"
              :member="member"
            />
          </template>
          <p v-else>Loading ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const authStore = useAuthStore();
const taskStore = useTaskStore();
const teamStore = useTeamStore();
// const teamMembers = ref([]);

// The Data is not used for SEO purposes but for better performance useAsyncData is my best choice to retrive data on server
// and show the user (Free loading State and refresh button are perks)
const { pending, refresh } = await useAsyncData("tasks", () =>
  taskStore.getTasks(),
);

const { pending: teamPending } = await useAsyncData("team", () =>
  teamStore.getTeamMembers(),
);
</script>
