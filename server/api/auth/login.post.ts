interface LoginResponse {
  success: boolean;
  token: string;
}

interface LoginBody {
  username?: string;
  password?: string;
}

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
    };
  }
});
