export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  if (!username.trim() || !password.trim()) {
    throw createError({
      status: 400,
      message: "Email & Password Are Required",
    });
  }

  return {
    success: true,
    token: "12312xSADSCSniaospdasdxsaaawerwq9r0wq",
  };
});
