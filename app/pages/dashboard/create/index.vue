<template>
  <div class="w-full p-4 overflow-y-scroll">
    <!-- Header return button -->
    <div class="w-full">
      <NuxtLink
        to="/dashboard/main"
        class="text-sm flex items-center gap-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-6 max-w-max"
      >
        <span class="mt-1.5">
          <Icon name="ic:baseline-arrow-back" size="15px" />
        </span>
        <span>Back to Dashboard</span>
      </NuxtLink>
    </div>

    <!-- Main Page Header -->
    <header>
      <h1 class="font-bold text-2xl">Create New Task</h1>
      <small class="text-gray-600 mt-1"
        >Fill in the details to add a task to your workflow.
      </small>
    </header>

    <!-- Form -->
    <div class="w-full flex items-center justify-center">
      <form
        @submit.prevent="createTaskSubmit"
        class="w-full grid grid-cols-1 lg:grid-cols-3 gap-3"
      >
        <AppInput
          id="task-title"
          label="Title"
          v-model="taskTitle"
          :required="true"
          icon="ic:twotone-format-align-left"
          type="text"
          class="col-span-3"
          placeholder="What can be done ?"
          :error="errors.title"
        />
        <AppInput
          id="task-description"
          label="Description"
          v-model="taskDescription"
          icon="ic:twotone-format-align-left"
          type="text"
          :use-text-area="true"
          class="col-span-3"
          placeholder="Add more context about this task"
        />
        <div
          class="col-span-3 w-full flex items-center justify-center gap-3 flex-col lg:flex-row"
        >
          <AppInput
            id="task-due-date"
            label="Due Date"
            v-model="dueDateValue"
            icon="ic:outline-calendar-today"
            type="date"
          />

          <AppSelectInput
            id="priority-selector"
            label="Priority"
            v-model="priorityValue"
            :options="priorityOptions"
            :required="true"
            icon="ic:baseline-local-offer"
            :error="errors.priority"
          />
        </div>

        <AppSelectInput
          id="status-selector"
          label="Status"
          v-model="statusValue"
          :required="true"
          :options="statusOptions"
          icon="ic:baseline-outlined-flag"
          class="col-span-3 lg:col-span-1"
          :error="errors.status"
        />
        <AppSelectInput
          id="assigne-selector"
          label="Assigne"
          v-model="assigneValue"
          :options="options"
          icon="ic:round-person"
          class="col-span-3 lg:col-span-1"
        />
        <AppSelectInput
          id="project-selector"
          label="Project"
          v-model="projectValue"
          :options="options"
          icon="ic:round-work"
          class="col-span-3 lg:col-span-1"
        />
        <div class="col-span-3 flex items-center justify-end w-full gap-x-3">
          <button
            @click="clearForm"
            type="button"
            class="border border-gray-300 rounded-xl px-3 py-2 mt-3 cursor-pointer transition-colors duration-300 hover:bg-gray-200"
          >
            Cancel
          </button>
          <SubmitButton type="submit" label="Create" class="max-w-40" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "#shared/types/tasks";
definePageMeta({
  layout: "dashboard",
});
const taskStore = useTaskStore();
const taskTitle = ref("");
const taskDescription = ref("");
const assigneValue = ref("");
const statusValue = ref<Task["status"]>("todo");
const projectValue = ref("");
const dueDateValue = ref("");
const priorityValue = ref<Task["priority"]>("low");
const errors = ref({ title: "", status: "", priority: "" });
const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];
const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In-Progress" },
  { value: "done", label: "Done" },
];
const options = [
  { value: "Hello", label: "Hello" },
  { value: "GoodBye", label: "Bye" },
];

const createTaskSubmit = async () => {
  errors.value = { title: "", status: "", priority: "" };
  let hasError = false;

  if (!taskTitle.value.trim()) {
    errors.value.title = "Title Is Required";
    hasError = true;
  }
  if (!priorityValue.value) {
    errors.value.priority = "Priority Is Required";
    hasError = true;
  }

  if (!statusValue.value) {
    errors.value.status = "Status Is Required";
    hasError = true;
  }

  if (hasError) return;
  await taskStore.createTask(
    taskTitle.value,
    taskDescription.value,
    dueDateValue.value,
    priorityValue.value,
    statusValue.value,
    assigneValue.value,
  );
  clearForm();
  await navigateTo("/dashboard/main");
};

const clearForm = () => {
  taskTitle.value = "";
  taskDescription.value = "";
  assigneValue.value = "";
  statusValue.value = "todo";
  priorityValue.value = "low";
  projectValue.value = "";
  dueDateValue.value = "";
};
</script>
