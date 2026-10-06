import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient(); // ডোমেন অটোমেটিক ডিটেক্ট করবে

export const { useSession, signIn, signUp, signOut } = authClient;