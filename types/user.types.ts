export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  roles: string[];
};
