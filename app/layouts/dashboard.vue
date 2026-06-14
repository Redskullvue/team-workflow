<template>
  <div class="w-full h-screen max-h-screen bg-white flex">
    <aside class="lg:w-1/6 bg-white border-r border-gray-200 h-screen p-3">
      <dashboard-side-bar />
    </aside>
    <slot />
  </div>
</template>

<script setup>
import DashboardSideBar from "~/components/DashboardSideBar.vue";
</script>
