import 'next-auth/jwt';
import { User } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user?: User
  }

  interface User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    avatarUrl?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string;
  }
}
