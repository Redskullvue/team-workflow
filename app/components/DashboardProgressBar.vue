<template>
  <div class="w-full my-2">
    <div
      class="text-sm text-gray-600 mb-3 w-full flex items-center justify-between"
    >
      <span>{{ label }}</span>
      <span>{{ percentage }}%</span>
    </div>
    <div class="h-2 w-full rounded-xl bg-gray-400">
      <div
        class="rounded-xl h-2"
        :class="colorClass"
        :style="{ width: percentage ? `${percentage}%` : '1%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  percentage: number | string;
  colorClass?: string;
}
const props = defineProps<Props>();
</script>
