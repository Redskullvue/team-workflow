export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = body?.username?.trim();
  const password = body?.password?.trim();
  if (!username || !password) {
    throw createError({
      status: 400,
      message: "Username & Password Are Required",
    });
  }

  if (username !== "user1" || password !== "09102232378") {
    throw createError({
      statusCode: 401,
      message: "Username or password are incorrect . Try again !",
    });
  } else {
    return {
      success: true,
      token: "mock_12312xSADSCSniaospdasdxsaaawerwq9r0wq",
    };
  }
});
