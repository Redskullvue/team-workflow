interface User {
  name: string;
  username: string;
  email: string;
  avatarImage: string;
}
interface SignupBody {
  username: string;
  password: string;
  email: string;
}
interface SignupResponse {
  success: boolean;
  token: string;
  user: User;
}

export default defineEventHandler(async (event): Promise<SignupResponse> => {
  const config = useRuntimeConfig();
  const body = await readBody<SignupBody>(event);
  const username = body?.username?.trim();
  const password = body?.password?.trim();
  const email = body?.email?.trim();

  if (!username || !password || !email) {
    throw createError({
      statusCode: 400,
      message: "Bad Request : Username , Password and Email are required",
    });
  }

  return {
    success: true,
    token: config.mockToken,
    user: {
      name: "Alex Morgan",
      username: "alexmorgan021",
      email: "alexmorgan@gmail.com",
      avatarImage: "",
    },
  };
});
