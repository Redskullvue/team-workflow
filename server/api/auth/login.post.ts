import type { User, LoginResponse, LoginBody } from "#shared/types/auth";
export default defineEventHandler(async (event): Promise<LoginResponse> => {
  const config = useRuntimeConfig();
  const body = await readBody<LoginBody>(event);
  const username = body?.username?.trim();
  const password = body?.password?.trim();
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: "Username & Password Are Required",
    });
  }

  if (username !== config.username || password !== config.password) {
    throw createError({
      statusCode: 401,
      message: "Username or password are incorrect . Try again !",
    });
  } else {
    return {
      success: true,
      token: config.mockToken,
      user: {
        id: "1",
        name: "Alex Morgan",
        username: "alexmorgan021",
        email: "alexmorgan@gmail.com",
        avatarImage: "",
      },
    };
  }
});
