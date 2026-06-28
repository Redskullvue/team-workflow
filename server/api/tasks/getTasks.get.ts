import type { TasksResponse } from "#shared/types/tasks";
import { requireAuth } from "~~/server/utils/checkAuth";
import { allTasks } from "~~/server/utils/allTasks";
export default defineEventHandler(async (event): Promise<TasksResponse> => {
  await requireAuth(event);

  return {
    success: true,
    tasks: allTasks,
  };
});
