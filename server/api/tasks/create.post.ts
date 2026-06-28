import { requireAuth } from "~~/server/utils/checkAuth";
import type { TaskCreateResponse, TaskCreateBody } from "~~/shared/types/tasks";
import { allTasks } from "~~/server/utils/allTasks";
export default defineEventHandler(
  async (event): Promise<TaskCreateResponse> => {
    await requireAuth(event);
    const body = await readBody<TaskCreateBody>(event);

    if (!body.title || !body.priority || !body.status) {
      throw createError({
        statusCode: 400,
        message: "Invalid Request , Fill the Required Fields",
      });
    }
    const task: TaskCreateBody = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      createdAt: new Date().toISOString(),
      assignedTo: "",
      priority: body.priority,
      status: body.status,
    };
    allTasks.push(task);
    return {
      success: true,
      tasks: allTasks,
    };
  },
);
