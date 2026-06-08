<template>
  <button
    type="submit"
    :disabled="loading"
    class="w-full rounded-lg bg-blue-700 text-white mt-4 p-2 cursor-pointer hover:bg-blue-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="buttonClass"
  >
    <span v-show="loading">Loading ... </span>
    <p v-show="!loading">{{ label }}</p>
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: "submit" }, //submit , button , reset
  loading: { type: Boolean, default: false },
  label: { type: String, default: "Submit" },
  buttonClass: { type: String, default: "" },
});
</script>
