export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  refreshToken?: string | null;
};
