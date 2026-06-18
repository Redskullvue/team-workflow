<template>
  <div
    class="w-full h-screen max-h-screen bg-gray-50 flex flex-col lg:flex-row"
  >
    <!-- Header only on mobile version -->
    <header
      class="w-full p-3 lg:hidden border-b-2 border-gray-200 shadow-sm shadow-gray-300 flex items-center justify-between"
    >
      <h2 class="font-bold p-3">
        TaskFlow <span class="text-blue-500 text-sm">Dashboard</span>
      </h2>
      <button @click="toggle">
        <Icon
          name="ic:baseline-format-list-bulleted"
          size="22px"
          class="mt-2 text-blue-500"
        />
      </button>
    </header>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-20 lg:hidden"
      @click="close"
    />
    <aside
      class="xl:w-1/6 lg:w-1/5 bg-white border-r border-gray-200 h-screen p-3 lg:block lg:translate-x-0 w-64 z-30 transition-transform duration-300 lg:static fixed"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <dashboard-side-bar />
    </aside>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { isOpen, toggle, close } = useSidebar();
</script>
