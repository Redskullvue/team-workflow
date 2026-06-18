import type { Task, TasksResponse } from "#shared/types/tasks";
import { requireAuth } from "~~/server/utils/checkAuth";

export default defineEventHandler(async (event): Promise<TasksResponse> => {
  await requireAuth(event);

  const tasks: Task[] = [
    {
      id: "1",
      status: "todo",
      title: "Create A Dashboard Page",
      priority: "high",
      description: "Create the main dashboard page using nuxt4 TYPED",
      createdAt: new Date().toISOString(),
      assignedTo: "",
    },
    {
      id: "2",
      status: "in-progress",
      title: "Create SideBar",
      priority: "medium",
      description: "Create the dashboard SideBar",
      createdAt: new Date().toISOString(),
      assignedTo: "",
    },
    {
      id: "3",
      status: "done",
      title: "Create An Auth system",
      priority: "low",
      description: "Create the  login / signup pages and assign token to user",
      createdAt: new Date().toISOString(),
      assignedTo: "",
    },
  ];

  return {
    success: true,
    tasks: tasks,
  };
});
