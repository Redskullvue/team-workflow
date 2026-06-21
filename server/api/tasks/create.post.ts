import { requireAuth } from "~~/server/utils/checkAuth";
import type { TaskCreateResponse } from "~~/shared/types/tasks";
export default defineEventHandler(
  async (event): Promise<TaskCreateResponse> => {
    await requireAuth(event);
    return {
      success: true,
    };
  },
);
