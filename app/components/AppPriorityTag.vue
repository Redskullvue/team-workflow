<template>
  <span class="rounded-xl text-xs px-2 py-1" :class="config.class">
    {{ config.label }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  priority: "high" | "medium" | "low";
}
const props = defineProps<Props>();

const statusConfig = {
  high: { label: "High", class: "bg-red-100 text-red-600" },
  medium: {
    label: "Medium",
    class: "bg-yellow-100 text-yellow-600",
  },
  low: { label: "Low", class: "bg-green-100 text-green-600" },
};

const config = computed(() => statusConfig[props.priority]);
</script>
