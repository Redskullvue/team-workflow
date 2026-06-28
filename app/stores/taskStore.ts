import { defineStore } from "pinia";
import type {
  TasksResponse,
  Task,
  TaskCreateResponse,
} from "#shared/types/tasks";

export const useTaskStore = defineStore("taskStore", () => {
  const authStore = useAuthStore();
  const tasks = ref<Task[]>([]);

  const taskCounts = computed(() => ({
    todo: tasks.value.filter((task) => task.status === "todo").length,
    inProgress: tasks.value.filter((task) => task.status === "in-progress")
      .length,
    done: tasks.value.filter((task) => task.status === "done").length,
  }));

  const taskPriorityCount = computed(() => ({
    high: tasks.value.filter((task) => task.priority === "high").length,
    medium: tasks.value.filter((task) => task.priority === "medium").length,
    low: tasks.value.filter((task) => task.priority === "low").length,
  }));

  const tasksPercentages = computed(() => {
    let total = tasks.value.length;
    if (total === 0) return { todo: 0, inProgress: 0, done: 0 };

    return {
      todo: Math.round((taskCounts.value.todo / total) * 100),
      inProgress: Math.round((taskCounts.value.inProgress / total) * 100),
      done: Math.round((taskCounts.value.done / total) * 100),
    };
  });

  const recentTasks = computed(() => {
    return [...tasks.value]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 6);
  });

  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await $fetch<TasksResponse>("/api/tasks/getTasks", {
        method: "GET",
        headers: {
          Authorization: `${authStore.token}`,
        },
      });

      if (response.success) {
        tasks.value = response.tasks;
      }

      return response.tasks;
    } catch (error: unknown) {
      const msg =
        (error as any)?.data?.message ||
        "Failed To Retrive Tasks Please Try again";
      throw new Error(msg);
    }
  };

  const createTask = async (
    title: string,
    description: string,
    priority: Task["priority"],
    status: Task["status"],
    assigne?: string,
    finishedAt?: string,
  ): Promise<void> => {
    try {
      const response = await $fetch<TaskCreateResponse>("/api/tasks/create", {
        method: "POST",
        body: {
          title,
          description,
          finishedAt,
          priority,
          status,
          assigne,
        },
        headers: {
          Authorization: `${authStore.token}`,
        },
      });
      if (response.success) {
        tasks.value = response.tasks;
      }
    } catch (error: unknown) {
      const msg =
        (error as any)?.data?.message ||
        "Couldn't Create the Task Please Try Again Later";
      throw new Error(msg);
    }
  };

  return {
    tasks,
    taskPriorityCount,
    taskCounts,
    tasksPercentages,
    recentTasks,
    getTasks,
    createTask,
  };
});
