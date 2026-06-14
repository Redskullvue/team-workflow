import type { User, MeResponse } from "#shared/types/auth";

export default defineEventHandler(async (event): Promise<MeResponse> => {
  const config = useRuntimeConfig();
  const authHeader = getHeader(event, "Authorization");
  if (!authHeader) {
    throw createError({
      statusCode: 400,
      message: "Authorization token needed",
    });
  }
  if (authHeader !== config.mockToken) {
    throw createError({
      statusCode: 401,
      message: "UnAuthorized , Token Invalid or Expired",
    });
  }

  return {
    success: true,
    user: {
      id: "1",
      name: "Alex Morgan",
      username: "alexmorgan021",
      email: "alexmorgan@gmail.com",
      avatarImage: "",
    },
  };
});
