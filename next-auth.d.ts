import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      plan?: "FREE" | "PRO";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    plan?: "FREE" | "PRO";
  }
}

