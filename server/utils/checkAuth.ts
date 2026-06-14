import type { H3Event } from "h3";
export async function requireAuth(event: H3Event): Promise<boolean> {
  const config = useRuntimeConfig();
  const authHeader = getHeader(event, "Authorization");

  if (!authHeader || authHeader !== config.mockToken) {
    throw createError({
      statusCode: 401,
      message: "Token missing or Expired",
    });
  }

  return true;
}
