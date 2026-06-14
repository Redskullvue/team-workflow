export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarImage: string;
}

export interface LoginBody {
  username?: string;
  password?: string;
}

export interface SignupBody {
  username?: string;
  password?: string;
  email?: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface MeResponse {
  success: boolean;
  user: User;
}
export interface SignupResponse {
  success: boolean;
  token: string;
  user: User;
}
