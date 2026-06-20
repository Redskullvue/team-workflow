<template>
  <span class="rounded-xl text-xs px-2 py-1" :class="config.class">
    {{ config.label }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  status: "todo" | "in-progress" | "done";
}
const props = defineProps<Props>();

const statusConfig = {
  todo: { label: "Todo", class: "bg-blue-100 text-blue-600" },
  "in-progress": {
    label: "In Progress",
    class: "bg-orange-100 text-orange-600",
  },
  done: { label: "Done", class: "bg-green-100 text-green-600" },
};

const config = computed(() => statusConfig[props.status]);
</script>
