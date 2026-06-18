<template>
  <div class="w-full rounded-xl border border-gray-200 bg-white p-4">
    <div class="w-full flex items-center justify-between mb-6">
      <div class="text-gray-600 text-sm">{{ title }}</div>
      <div
        :class="iconContainerClass"
        class="rounded-xl w-9 h-9 flex items-center justify-center"
      >
        <Icon :name="icon" :size="iconSize" :class="iconClasses" />
      </div>
    </div>

    <div class="font-bold text-xl" v-if="!isLoading">
      {{ value }}
    </div>
    <div v-else class="h-7 w-16 bg-gray-200 rounded animate-pulse" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  icon: string;
  value: string | number;
  iconClasses?: string;
  iconSize?: string;
  iconContainerClass?: string;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  iconClasses: "",
  iconSize: "20px",
  iconContainerClass: "",
  isLoading: false,
});
</script>
