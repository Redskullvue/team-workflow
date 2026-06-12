<template>
  <button
    :type="type"
    :disabled="loading"
    class="w-full rounded-lg bg-blue-700 text-white mt-4 p-2 cursor-pointer hover:bg-blue-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="buttonClass"
  >
    <span v-if="loading">Loading ... </span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: "submit" | "button" | "reset";
  loading?: boolean;
  label?: string;
  buttonClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "submit",
  loading: false,
  label: "Submit",
  buttonClass: "",
});
</script>
