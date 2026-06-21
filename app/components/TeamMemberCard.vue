<template>
  <div class="w-full flex items-center gap-x-2">
    <!-- Avatar -->
    <div>
      <div
        class="rounded-full w-8 h-8 flex items-center justify-center text-white text-sm"
        :style="`background-color : ${randomColor}`"
      >
        <p>{{ initials }}</p>
      </div>
    </div>
    <div class="flex flex-col">
      <p class="font-bold text-sm">{{ member.name }}</p>
      <p class="text-gray-600 text-xs">
        {{ member.tasksCount }} <span>Tasks Remaining</span>
      </p>
    </div>
    <!-- Userinfo -->
  </div>
</template>

<script setup lang="ts">
import type { TeamMember } from "#shared/types/team";
interface Props {
  member: TeamMember;
}

const colors = ["blue", "darkgreen", "red", "purple"];

const randomColor = colors[Math.floor(Math.random() * colors.length)];

const props = defineProps<Props>();

const initials = computed(() => {
  if (!props.member.name) {
    return "";
  }
  return props.member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});
</script>
