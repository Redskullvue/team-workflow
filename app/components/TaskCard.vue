<template>
  <div
    class="w-full p-4 border-t border-gray-300 flex items-center justify-between flex-col gap-y-3 lg:flex-row gap-x-3 transition-colors duration-300 hover:bg-gray-100 cursor-pointer"
  >
    <!-- ICON -->
    <div
      class="mx-2 font-bold"
      :class="task.status === 'done' ? 'text-green-500' : 'text-gray-600'"
    >
      <Icon name="ic:outline-circle" size="15px" />
    </div>
    <!-- Title & SubTitle -->
    <div class="w-full">
      <p
        class="font-semibold"
        :class="task.status === 'done' ? ' line-through text-gray-600' : ''"
      >
        {{ task.title.substring(0.3) }}
        <span v-if="task.title.length >= 30">...</span>
      </p>
      <small v-if="task.description" class="text-gray-600 font-semibold"
        >{{ task.description.substring(0, 30) }}
        <span v-if="task.description.length >= 30">...</span></small
      >
    </div>
    <!-- Tags -->
    <div class="w-full flex items-center lg:justify-center gap-x-1">
      <AppStatusTag :status="task.status" />
      <AppPriorityTag :priority="task.priority" />
    </div>
    <!-- Date -->
    <div class="w-full text-center">
      {{ formatDate(task.createdAt) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "#shared/types/tasks";
const { formatDate } = useFormatDates();
interface Props {
  task: Task;
}
const props = defineProps<Props>();
</script>
